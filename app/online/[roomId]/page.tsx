"use client"

import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {Header} from "@/components/template/Header"
import {useEffect, useState, useTransition} from "react"
import {joinRoomService, RemoveConnectionService} from "@/services/connectionInfosManager"
import {useParams, useRouter} from "next/navigation"
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {Button} from "@/components/template/Button"
import {Loading} from "@/components/template/Loading"
import {OnlineFullGame} from "@/components/functions/OnlineFullGame"
import {toast} from "sonner"
import {setFullRoomState} from "@/libs/stores/RoomState"
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore"
import {socketUrl} from "@/global"
import {setSocket} from "@/libs/stores/SocketStore"
import {FormatToObject} from "@/helpers/socketMessageHandler"
import {useWebSocketConnection} from "@/hook/useWebSocketConnection";
import {RejoinWarning} from "@/components/functions/RejoinWarning";

export default function OnlineGamePage() {
    const params = useParams()
    const dispatch = useDispatch()
    const roomId = typeof params.roomId == "object" ? params.roomId[0] : params.roomId// se não sai string[]

    const roomInfo = useSelector((state: RootState) => state.roomState.value)
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerInfos = getStorePlayerInfo()
    // const playerInfos = useSelector((state: RootState) => state.playerInfo.value)
    const [isGameLoaded, setIsGameLoaded] = useState(false)
    const [isLoading, startTransition] = useTransition()


    const { socket } = useWebSocketConnection(socketUrl, roomId ?? "undefined", playerInfos?.playerIndex ?? 1, inGameInfo)

    useEffect(() => {
        if (inGameInfo && roomInfo)
            setIsGameLoaded(true)

    }, [inGameInfo, roomInfo])

    // useEffect(() => {
    //     if (!roomId || !inGameInfo) return
    //     if(typeof window == "undefined") return console.log("Nem carregou, não conectando...")
    //
    //     // Conectar ao WebSocket ao carregar o componente
    //     const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
    //     dispatch(setSocket(ws))
    //
    //     ws.onmessage = (event) => {
    //         try {
    //             const message = event.data
    //             const inObject = FormatToObject(message)
    //             console.log("Recebido: ", inObject)
    //             if (!inObject)
    //                 return toast.error("Can't receive state")
    //
    //             dispatch(setFullInGameState(inObject))
    //
    //         } catch (error) {
    //             console.log("Erro ao receber infos: ")
    //             console.log(error)
    //         }
    //     }
    //
    //     ws.onclose = async () => {
    //         console.log("Connection closed")
    //         await RemoveConnectionService(playerInfos?.playerIndex ?? 1, roomId)
    //     }
    //
    //     return () => {
    //         if(typeof window === "undefined") return console.log("Nem carregou, fechando componente")
    //         console.log("Component return, gonna close")
    //         ws.close()
    //     }
    // }, [])




    if (!isGameLoaded || !roomInfo || !inGameInfo || !roomId || !playerInfos?.playerIndex)
        return  (
            <RejoinWarning
            roomId={roomId ?? "1"}
            startTransition={startTransition}
            isLoading={isLoading}
            />
            )






    return (
        <div className={"flex flex-col justify-between items-center"}>
            <Header label={"room info"}/>
            <div>
                player{playerInfos?.playerIndex.toString()}
            </div>

            <div className={""}>
                <OnlineFullGame
                    roomId={roomId}
                />
            </div>
            <Header label={"IN game info"}/>
            <div>
                Vez de: {inGameInfo.isPLayer1Turn ? "player 1" : "player 2"}
            </div>
            <ThemeToggleFooter useReturnHomeButton/>
        </div>
    )
}
