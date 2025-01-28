"use client"

import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {Header} from "@/components/template/Header"
import {useCallback, useEffect, useState, useTransition} from "react"
import { RemoveConnectionService} from "@/services/connectionInfosManager"
import {useParams, useRouter} from "next/navigation"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {OnlineFullGame} from "@/components/functions/OnlineFullGame"
import {socketUrl} from "@/global"
import {useWebSocketConnection} from "@/hook/useWebSocketConnection"
import {RejoinWarning} from "@/components/functions/RejoinWarning"
import {usePlayerInfo} from "@/hook/usePlayerInfo";

export default function OnlineGamePage() {
    const params = useParams()
    const dispatch = useDispatch()
    const roomId = typeof params.roomId == "object" ? params.roomId[0] : params.roomId// se não sai string[]

    const roomInfo = useSelector((state: RootState) => state.roomState.value)
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerInfos = usePlayerInfo()
    // const playerInfos = useSelector((state: RootState) => state.playerInfo.value)
    const [isGameLoaded, setIsGameLoaded] = useState(false)
    const [isLoading, startTransition] = useTransition()


    const { socket } = useWebSocketConnection(socketUrl, roomId ?? "undefined", playerInfos?.playerIndex ?? 1, inGameInfo)


    useEffect(() => {
        if (inGameInfo && roomInfo)
            setIsGameLoaded(true)

    }, [inGameInfo, roomInfo])


    //só assim para não quebrar a conexão
    useCallback(() => {
        return (async() => {
            console.log("Really closing connection")
            await RemoveConnectionService(playerInfos?.playerIndex ?? 1, roomInfo?.roomId ?? "-1")
        })
    }, [])


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
