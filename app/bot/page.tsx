"use client"

import {useCheckConnectionAndRedirect} from "@/hook/useCheckConnection";
import {useParams} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {usePlayerInfo} from "@/hook/usePlayerInfo";
import {useCallback, useEffect, useState, useTransition} from "react";
import {useWebSocketConnection} from "@/hook/useWebSocketConnection";
import {socketUrl} from "@/global";
import {useDisconnectAndRemoveOnClose} from "@/hook/useDisconnectAndRemoveOnClose";
import {toast} from "sonner";
import {RejoinWarning} from "@/components/functions/RejoinWarning";
import {RestartMatchButton} from "@/components/functions/RestartMatchButton";
import {Header} from "@/components/template/Header";
import {PlayerPoints} from "@/components/template/PlayerPoints";
import {Point} from "@/components/template/Point";
import {TurnIndicator} from "@/components/template/TurnIndicator";
import {OnlineFullGame} from "@/components/functions/OnlineFullGame";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import {OfflineFullGame} from "@/components/functions/OfflineFullGame";
import {Loading} from "@/components/template/Loading";

export default function BotPage() {
    const gameState = useSelector((state: RootState) => state.botState.value)
    const playerInfos = usePlayerInfo()
    const [isLoading, setIsLoading] = useState(false)

    if (!gameState) return null

    return (
        <div className={"w-screen max-w-[1200px] px-4 mx-auto"}>
            {isLoading && (<Loading/>)}
            {gameState.isFinished && <RestartMatchButton playerIndex={1} offlineMode/>}
            <div className={"flex justify-center"}>
                <Header label={"OFFLINE"}/>
            </div>
            <div className={"w-full flex flex-col justify-center items-center mt-5"}>
                {/*MEIO DA TELA; PC- JOGO + PLACARES*/}
                {/*celular*/}
                <div className={"lg:hidden px-4"}>
                    <div className={"w-full flex flex-col justify-between items-center"}>
                        {/*PLAYERS*/}
                        <div className="flex w-full h-fit flex-row pb-4 lg:pb-0 ">
                            <div className={"w-full flex flex-row lg:flex-col h-[150px] lg:h-[500px] "}>
                                <div
                                    className={"flex w-full lg:w-fit lg:h-full flex-row lg:flex-col justify-between lg:justify-start lg:gap-y-4"}>
                                    <Point points={gameState.playerPoints} label={"Your Points"}/>
                                    <Point points={gameState.botPoints} label={"Opponent Points"}/>
                                </div>
                            </div>

                            {/*{playerInfos.playerIndex == 1 && (*/}
                            {/*    <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex} />*/}
                            {/*)}*/}
                        </div>
                        {/*DRAW*/}
                        <div className="self-start min-h-[164px] flex w-full">
                            <div className={"flex-1 "}>
                                <Point points={gameState.drawCount} label={"Draw"} maxSize={15}/>
                            </div>
                            <TurnIndicator
                                isFinished={gameState.isFinished}
                                isPLayer1Turn={gameState.isPlayerTurn}
                                playerIndex={1}
                            />
                        </div>
                        {/*JOGO*/}
                        <div className={"flex-1 mt-12 py-12"}>
                            <OfflineFullGame
                                setIsLoading={setIsLoading}
                                gameInfo={gameState}
                            />
                        </div>

                    </div>
                </div>
                {/*Pcs*/}
                <div className={"hidden lg:block"}>
                    <div className={"w-full flex justify-between items-center "}>
                        {/*PLAYERS*/}
                        <div className="flex lg:block w-1/4 ">
                            <div className={"w-full flex flex-row lg:flex-col h-[150px] lg:h-[500px] "}>
                                <div
                                    className={"flex w-full lg:w-fit lg:h-full flex-row lg:flex-col justify-between lg:justify-start lg:gap-y-4"}>
                                    <Point points={gameState.playerPoints} label={"Your Points"}/>
                                    <Point points={gameState.botPoints} label={"Opponent Points"}/>
                                </div>
                            </div>
                        </div>
                        {/*JOGO*/}
                        <div className={"self-center mx-12"}>
                            <OfflineFullGame
                                setIsLoading={setIsLoading}
                                gameInfo={gameState}/>
                        </div>
                        {/*DRAW*/}
                        <div className="w-1/4 self-start flex flex-col h-[400px]">
                            <div className={"flex-1 "}>

                                <Point points={gameState.drawCount} label={"Draw"} maxSize={15}/>
                            </div>
                            {/* <TurnIndicator/> */}
                            <TurnIndicator
                                isFinished={gameState.isFinished}
                                isPLayer1Turn={gameState.isPlayerTurn}
                                playerIndex={1}
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
                    />
                </div>
            </div>
        </div>
    )
}
