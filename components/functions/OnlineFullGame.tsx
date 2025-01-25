import {Square} from "@/components/functions/Square";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {useEffect, useState} from "react";
import {socketUrl} from "@/global";
import {InGameOnlineState} from "@/types/onlineInfos";
import {FormatToObject} from "@/helpers/socketMessageHandler";
import {toast} from "sonner";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos";
import {RemoveConnectionService} from "@/services/connectionInfosManager";

interface OnlineFullGameProps {
    roomId: string
}

export const OnlineFullGame = ({roomId}: OnlineFullGameProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const dispatch = useDispatch()
    const playerInfos = getStorePlayerInfo()

    if(!inGameInfo || !playerInfos)
        return "No game info found"

    // Connection
    useEffect(() => {
        // Conectar ao WebSocket ao carregar o componente
        const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
        setSocket(ws)

        ws.onmessage = (event) => {
            const message = event.data
            const inObject = FormatToObject(message)
            if(!inObject)
                return toast.error("Can't receive state")
            console.log(inObject)
            dispatch(setFullInGameState(inObject))
            // setResponse((prev) => [...prev, message])
        }

        ws.onclose = async () => {

            console.log("Connection closed")
            const res = RemoveConnectionService(playerInfos?.playerIndex ?? 1, roomId)
        }

        return () => {
            ws.close()
        }
    }, [])

    // TODO -> ao carregar, já desconecta da room
    const handleSquareClick = (squareIndex: number) => {
        // bloquear o player
        const playerInfo = getStorePlayerInfo()
        const playerName = playerInfo?.playerIndex == 1 ? `isPLayer1Turn` : "isPlayer2Turn"
        if(!inGameInfo[playerName])
            return toast.info("Opponent time")

        console.log("Click no quadrado")

        if (!socket || socket.readyState !== WebSocket.OPEN)
            return toast.error("You are not connected to the room")
        // if (socket && socket.readyState === WebSocket.OPEN) {
            const sendMessage: InGameOnlineState =  {
                roomId,
                isPLayer1Turn: false,
                isPlayer2Turn: true,
                player2Wins: false,
                state: [1, 0, 1, 0, 0, 0, 0, 2, 0],
                player1Wins: false,
                isFinished: false
            }

            const stringConverted = JSON.stringify(sendMessage)

            socket.send(stringConverted)
        // }
    }


    return (
        <div className={"grid grid-cols-3 w-fit mx-auto "}>
            {/*/TODO -> criar um componente para cuidar de tudo do jogo (placar, nomes...) e outro interno para o jogo em si*/}
            {inGameInfo.state.map((state, i) => {
                return (
                    <Square
                        value={state}
                        index={i}
                        onClick={handleSquareClick}
                        key={i}/>
                )
            })}
        </div>
    )
}
