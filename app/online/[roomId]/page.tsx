"use client"

import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {Header} from "@/components/template/Header"
import {useCallback, useEffect, useState, useTransition} from "react"
import {RemoveConnectionService} from "@/services/connectionInfosManager"
import {useParams, useRouter} from "next/navigation"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {OnlineFullGame} from "@/components/functions/OnlineFullGame"
import {socketUrl} from "@/global"
import {useWebSocketConnection} from "@/hook/useWebSocketConnection"
import {RejoinWarning} from "@/components/functions/RejoinWarning"
import {usePlayerInfo} from "@/hook/usePlayerInfo";
import {Point} from "@/components/template/Point";
import {PlayerPoints} from "@/components/template/PlayerPoints";

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


    const {socket} = useWebSocketConnection(socketUrl, roomId ?? "undefined", playerInfos?.playerIndex ?? 1, inGameInfo)


    useEffect(() => {
        if (inGameInfo && roomInfo)
            setIsGameLoaded(true)

    }, [inGameInfo, roomInfo])


    //só assim para não quebrar a conexão
    useCallback(() => {
        return (async () => {
            console.log("Really closing connection")
            await RemoveConnectionService(playerInfos?.playerIndex ?? 1, roomInfo?.roomId ?? "-1")
        })
    }, [playerInfos?.playerIndex, roomInfo?.roomId])


    if (!isGameLoaded || !roomInfo || !inGameInfo || !roomId || !playerInfos?.playerIndex)
        return (
            <RejoinWarning
                roomId={roomId ?? "1"}
                startTransition={startTransition}
                isLoading={isLoading}
            />
        )


    return (
        <div className={"w-screen max-w-[1200px] px-4 mx-auto"}>
            <div className={"flex justify-center"}>

                <Header label={"GAME"}/>
            </div>
            <div className={"w-full flex flex-col justify-center items-center mt-5"}>
                {/*MEIO DA TELA; PC- JOGO + PLACARES*/}
                {/*celular*/}
                <div className={"lg:hidden"}>
                    <div className={"w-full flex flex-col justify-between items-center"}>
                        {/*PLAYERS*/}
                        <div className="flex w-full h-fit flex-row pb-4 lg:pb-0 ">
                            {playerInfos.playerIndex == 1 && (
                                <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex}/>
                            )}
                        </div>
                        {/*DRAW*/}
                        <div className="self-start min-h-[164px]">
                            <Point points={roomInfo.drawsCount} label={"Draw"} maxSize={10}/>
                        </div>
                        {/*JOGO*/}
                        <div className={"flex-1 mt-12"}>
                            <OnlineFullGame
                                roomId={roomId}
                            />
                        </div>

                    </div>
                </div>
                {/*Pcs*/}
                <div className={"hidden lg:block"}>
                    <div className={"w-full flex justify-between items-center "}>
                        {/*PLAYERS*/}
                        <div className="flex lg:block w-1/4 ">
                            {playerInfos.playerIndex == 1 && (
                                <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex}/>

                            )}
                        </div>
                        {/*JOGO*/}
                        <div className={"self-center"}>
                            <OnlineFullGame
                                roomId={roomId}
                            />
                        </div>
                        {/*DRAW*/}
                        <div className="w-1/4 self-start">
                            <Point points={roomInfo.drawsCount} label={"Draw"} maxSize={15}/>
                        </div>
                    </div>
                </div>


                <div className={"hidden lg:blockbg-emerald-500"}>
                    INFOS FINAIS
                </div>
                <div className={"hidden lg:block"}>

                    <ThemeToggleFooter useReturnHomeButton/>
                </div>
            </div>
        </div>
    )
}
