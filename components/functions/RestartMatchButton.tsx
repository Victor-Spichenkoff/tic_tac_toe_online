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

interface RestartMatchButtonProps {
    playerIndex: 1 | 2
}
export const RestartMatchButton = ({playerIndex}: RestartMatchButtonProps) => {
    const socket = useSelector((state: RootState) => state.socketState.value)
    const inGameState = useSelector((state: RootState) => state.inGameState.value)
    const router = useRouter()
    const dispatch = useDispatch()

    const [message, setMessage] = useState("")

    if(!inGameState)
        return null


    useEffect(() => {
        let newMessage = "Match Finished"

        if (inGameState.isDrawn)
            newMessage = "It's Drawn!"
        else if (inGameState.player1Wins && playerIndex === 1 || inGameState.player2Wins && playerIndex == 2)
            newMessage = "You Lose"
        else if (inGameState.player1Wins && playerIndex === 2 || inGameState.player2Wins && playerIndex == 1)
            newMessage = "You Won"


        setMessage(newMessage)
    }, [])

    const handleRestartButton = async () => {
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
        if(res.isError || !res.response?.inGameState || !res.response?.roomState)
            return toast.error(res.errorMessage ?? "Internal Error!")

        dispatch(setFullInGameState(res.response.inGameState))
        dispatch(setFullRoomState(res.response.roomState))
    }

    const handleReturnHomeButton = () => router.push("/")

    return (
        <div className={"z-40 fixed top-0 left-0 h-screen w-screen bg-black/50 flex  flex-col justify-center items-center text-4xl gap-y-6"}>
            <div className={`
            
                ${message.includes("Won") && "text-darkCircle"}
            `}>{message}</div>
            <div className={"flex gap-4"}>
            <Button label={"Again"} onClick={handleRestartButton} className={"px-4 py-2"}/>
            <Button label={"Home"} onClick={handleReturnHomeButton} className={"px-4 py-2"}/>

            </div>
        </div>
    )
}
