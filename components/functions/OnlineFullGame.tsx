"use client"

import {Square} from "@/components/functions/Square"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {useEffect, useState} from "react"
import {socketUrl} from "@/global"
import {FormatToObject} from "@/helpers/socketMessageHandler"
import {toast} from "sonner"
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore"
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos"
import {RemoveConnectionService} from "@/services/connectionInfosManager"
import {GameAction} from "@/types/RequestBody";
import {InGameOnlineState} from "@/types/onlineInfos";

interface OnlineFullGameProps {
    roomId: string
    inGameState: InGameOnlineState
}


// export const OnlineFullGame = ({roomId, inGameState: inGameInfo}: OnlineFullGameProps) => {
export const OnlineFullGame = ({roomId}: OnlineFullGameProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const dispatch = useDispatch()
    const playerInfos = getStorePlayerInfo()

    if (!inGameInfo || !playerInfos)
        return "No game info found"

    // Connection
        useEffect(() => {
        if (!roomId || !inGameInfo) return
        if(typeof window == "undefined") return console.log("Nem carregou, não conectando...")

        // Conectar ao WebSocket ao carregar o componente
        const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
        setSocket(ws)

        ws.onmessage = (event) => {
            try {
                const message = event.data
                const inObject = FormatToObject(message)
                console.log("Recebido: ", inObject)
                if (!inObject)
                    return toast.error("Can't receive state")

                dispatch(setFullInGameState(inObject))

            } catch (error) {
                console.log("Erro ao receber infos: ")
                console.log(error)
            }
        }

        ws.onclose = async () => {
            console.log("Connection closed")
            await RemoveConnectionService(playerInfos?.playerIndex ?? 1, roomId)
        }

        return () => {
            if(typeof window === "undefined") return console.log("Nem carregou, fechando componente")
            console.log("Component return, gonna close")
            ws.close()
        }
    }, [])
    //

    // TODO -> ao carregar, já desconecta da room
    const handleSquareClick = (squareIndex: number) => {
        // bloquear o player
        const playerInfo = getStorePlayerInfo()
        const playerName = playerInfo?.playerIndex == 1 ? `isPLayer1Turn` : "isPlayer2Turn"
        if (!inGameInfo[playerName])
            return toast.info("Opponent time")

        console.log("Click no quadrado")

        if (!playerInfo?.playerIndex)
            return toast.error("No player info!")


        if (!socket || socket.readyState !== WebSocket.OPEN)
            return toast.error("You are not connected to the room")

        const sendMessage: GameAction = {
            playerIndex: playerInfo?.playerIndex,
            choosePosition: squareIndex,
        }
        const stringConverted = JSON.stringify(sendMessage)

        socket.send(stringConverted)
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
