import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {Button} from "@/components/template/Button"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {toast} from "sonner"
import {GameAction} from "@/types/RequestBody"
import {GetAllGameInfo} from "@/services/connectionInfosManager";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {setFullRoomState} from "@/libs/stores/RoomState";
import {InGameOfflineBot} from "@/types/offilineMatch";
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore";

interface RestartMatchButtonProps {
    playerIndex: 1 | 2
    offlineMode?: boolean
}

export const RestartMatchButton = ({playerIndex, offlineMode}: RestartMatchButtonProps) => {
    const socket = useSelector((state: RootState) => state.socketState.value)
    const inGameState = useSelector((state: RootState) => state.inGameState.value)
    const offlineState = useSelector((state: RootState) => state.botState.value)
    const router = useRouter()
    const dispatch = useDispatch()

    const [message, setMessage] = useState("")


    useEffect(() => {
        let newMessage = "Match Finished"
        //offline
        if (offlineMode) {
            if (!offlineState) return
            console.log(offlineState)
            if (offlineState.botWins)
                newMessage = "You Lose"
            else if (offlineState.playerWins)
                newMessage = "You Won"
            else
                newMessage = "It's Drawn!"
        // online
        } else {
            if (!inGameState) return

            if (inGameState.isDrawn)
                newMessage = "It's Drawn!"
            else if (inGameState.player1Wins && playerIndex === 1 || inGameState.player2Wins && playerIndex == 2)
                newMessage = "You Lose"
            else if (inGameState.player1Wins && playerIndex === 2 || inGameState.player2Wins && playerIndex == 1)
                newMessage = "You Won"

        }


        setMessage(newMessage)
    }, [])

    const handleOnlineRestartButton = async () => {
        if (!inGameState) return
        toast.info("Restarting...")

        if (!socket || socket.readyState !== WebSocket.OPEN)
            return toast.error("You are not connected to the room")

        const sendMessage: GameAction = {
            isResetOperation: true,
            choosePosition: -1,
            playerIndex: playerIndex,
        }

        const stringConverted = JSON.stringify(sendMessage)

        socket?.send(stringConverted)

        const res = await GetAllGameInfo(inGameState.roomId)
        //
        if (res.isError || !res.response?.inGameState || !res.response?.roomState)
            return toast.error(res.errorMessage ?? "Internal Error!")

        dispatch(setFullInGameState(res.response.inGameState))
        dispatch(setFullRoomState(res.response.roomState))
    }


    const handleOfflineRestartButton = async () => {
        if (!offlineState) return

        const isPlayerStart = offlineState.matchCount % 2 != 0

        const newState: InGameOfflineBot = {
            ...offlineState,
            state: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            isPlayerTurn: isPlayerStart,
            isBotTurn: !isPlayerStart,
            isFinished: false,
            botWins: false,
            playerWins: false
        }
        dispatch(setFullInGameBotState(newState))
    }

    const handleReturnHomeButton = () => router.push("/")

    return (
        <div
            className={"z-40 fixed top-0 left-0 h-screen w-screen bg-black/50 flex  flex-col justify-center items-center text-4xl gap-y-6"}>
            <div className={`
            
                ${message.includes("Won") && "text-darkCircle"}
                ${message.includes("Lose") && "text-cross"}
                ${message.includes("Draw") && "text-yellow-400"}
            `}>{message}</div>
            <div className={"flex gap-4"}>
                <Button label={"Again"}
                        onClick={offlineMode ? handleOfflineRestartButton : handleOnlineRestartButton}
                        className={"px-4 py-2"}
                />
                <Button label={"Home"} onClick={handleReturnHomeButton} className={"px-4 py-2"}/>

            </div>
        </div>
    )
}
