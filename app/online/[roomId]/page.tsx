"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/libs/redux"
import { Header } from "@/components/template/Header"
import { useCallback, useEffect, useState, useTransition } from "react"
import { RemoveConnectionService } from "@/services/connectionInfosManager"
import { useParams } from "next/navigation"
import { ThemeToggleFooter } from "@/components/template/ThemeToggleFooter"
import { OnlineFullGame } from "@/components/functions/OnlineFullGame"
import { socketUrl } from "@/global"
import { useWebSocketConnection } from "@/hook/useWebSocketConnection"
import { RejoinWarning } from "@/components/functions/RejoinWarning"
import { usePlayerInfo } from "@/hook/usePlayerInfo";
import { Point } from "@/components/template/Point";
import { PlayerPoints } from "@/components/template/PlayerPoints";
import { TurnIndicator } from "@/components/template/TurnIndicator";
import {  setInGameStateToNull } from "@/libs/stores/inGameOnlineStore"
import { setRoomStateToNull } from "@/libs/stores/RoomState"
import { toast } from "sonner"
import { setFullPlayerInfos } from "@/libs/stores/PlayerInfos"
import {setSocket} from "@/libs/stores/SocketStore";
import {useRemoveConnection} from "@/hook/useRemoveConnection";
import {RestartMatchButton} from "@/components/functions/RestartMatchButton";
import {useCheckConnectionAndRedirect} from "@/hook/useCheckConnection";
import {useDisconnectAndRemoveOnClose} from "@/hook/useDisconnectAndRemoveOnClose";
import {MobileMenu} from "@/components/functions/MobileMenu";

export default function OnlineGamePage() {
    useCheckConnectionAndRedirect()
    const params = useParams()
    const roomId = typeof params.roomId == "object" ? params.roomId[0] : params.roomId// senão sai string[]

    const roomInfo = useSelector((state: RootState) => state.roomState.value)
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerInfos = usePlayerInfo()
    // const playerInfos = useSelector((state: RootState) => state.playerInfo.value)
    const [isGameLoaded, setIsGameLoaded] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [allowUnloadSocket, setAllowUnloadSocket] = useState(false)

    const { socket, orderReconnection } = useWebSocketConnection(socketUrl, roomId ?? "undefined", playerInfos?.playerIndex ?? 1, inGameInfo)
    // const {destroyConnection} = useRemoveConnection(roomId ?? "-1", playerInfos?.playerIndex ?? 1, )
    useDisconnectAndRemoveOnClose(roomId, playerInfos?.playerIndex)

    useEffect(() => {
        if (inGameInfo && roomInfo)
            setIsGameLoaded(true)


    }, [inGameInfo, roomInfo])


    //só assim para não quebrar a conexão
    // useCallback(() => {
    //     return async () => {
    //         console.log("Really closing connection")
    //         // await destroyConnection("[Use Callback return] Forced to remove game data!")
    //         // await destroyConnection("Forced to remove game data!")
    //     }
    // }, [playerInfos?.playerIndex, roomInfo?.roomId])


    if (!isGameLoaded || !roomInfo || !inGameInfo || !roomId || !playerInfos?.playerIndex)
        return (
            <RejoinWarning
                roomId={roomId ?? "1"}
                startTransition={startTransition}
                isLoading={isLoading}
                orderReconnection={orderReconnection}
            />
        )


    return (
        <div className={"w-screen max-w-[1200px] px-4 mx-auto"}>
            <MobileMenu />
            { inGameInfo.isFinished && <RestartMatchButton playerIndex={playerInfos.playerIndex ?? 1}/> }
            <div className={"flex justify-center"}>
                <Header label={"GAME"} />
            </div>
            <div className={"w-full flex flex-col justify-center items-center mt-5"}>
                {/*MEIO DA TELA; PC- JOGO + PLACARES*/}
                {/*celular*/}
                <div className={"lg:hidden px-4"}>
                    <div className={"w-full flex flex-col justify-between items-center"}>
                        {/*PLAYERS*/}
                        <div className="flex w-full h-fit flex-row pb-4 lg:pb-0 ">
                            {/*{playerInfos.playerIndex == 1 && (*/}
                                <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex} />
                            {/*)}*/}
                        </div>
                        {/*DRAW*/}
                        <div className="self-start min-h-[164px] flex w-full min-w-[170px] mt-5">
                            <div className={"flex-1 "}>
                                <Point points={roomInfo.drawsCount} label={"Draw"} maxSize={15} />
                            </div>
                            <TurnIndicator
                                isFinished={inGameInfo.isFinished}
                                isPLayer1Turn={inGameInfo.isPLayer1Turn}
                                playerIndex={playerInfos.playerIndex}
                            />
                        </div>
                        {/*JOGO*/}
                        <div className={"flex-1 mt-12 py-12"}>
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
                            {/*{playerInfos.playerIndex == 1 && (*/}
                                <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex} />
                            {/*)}*/}
                        </div>

                        {/*JOGO*/}
                        <div className={"self-center mx-12"}>
                            <OnlineFullGame
                                roomId={roomId}
                            />
                        </div>
                        {/*DRAW*/}
                        <div className="w-1/4 self-start flex flex-col h-[400px] min-w-[170px]">
                            <div className={"flex-1 "}>
                                <Point points={roomInfo.drawsCount} label={"Draw"} maxSize={15} />
                            </div>
                            {/* <TurnIndicator/> */}
                            <TurnIndicator
                                isFinished={inGameInfo.isFinished}
                                isPLayer1Turn={inGameInfo.isPLayer1Turn}
                                playerIndex={playerInfos.playerIndex}
                            />
                        </div>
                    </div>
                </div>


                <div className={"hidden lg:blockbg-emerald-500"}>
                    INFOS FINAIS
                </div>
                <div className={"hidden lg:block"}>

                    <ThemeToggleFooter
                        usePopReturnHomeButton
                        onReturnClick={() => setAllowUnloadSocket(true)}
                    />
                </div>
            </div>
        </div>
    )
}
