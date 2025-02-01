"use client"

import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {usePlayerInfo} from "@/hook/usePlayerInfo";
import {useWebSocketConnection} from "@/hook/useWebSocketConnection";
import {socketUrl} from "@/global";
import {RemoveConnectionService} from "@/services/connectionInfosManager";
import {RejoinWarning} from "@/components/functions/RejoinWarning";
import {Header} from "@/components/template/Header";
import {PlayerPoints} from "@/components/template/PlayerPoints";
import {OnlineFullGame} from "@/components/functions/OnlineFullGame";
import {Point} from "@/components/template/Point";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import {RoomState, SquareOptions} from "@/types/onlineInfos";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {useEffect} from "react";
import {Square} from "@/components/functions/Square";

export default function Teses() {
    const params = useParams()
    const dispatch = useDispatch()
    const roomId = typeof params.roomId == "object" ? params.roomId[0] : params.roomId// se não sai string[]


    const states: SquareOptions[] = [0, 1,2, 0,1,2 ,2,1,1]
    const roomInfo: RoomState = {
        roomId: "12",
        drawsCount: 12,
        player1Points: 1,
        player2Points: 0,
        isPLayer1Connected: true,
        isPLayer2Connected: true,
        matchCount: 1
    }
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerInfos = {playerIndex: 1}//usePlayerInfo()
    // const playerInfos = useSelector((state: RootState) => state.playerInfo.value)

    useEffect(() => {

        dispatch(setFullInGameState({
            roomId: "12",
            isFinished: false,
            state: [1, 0, 0, 1, 2, 0, 2, 2, 1],
            player1Wins: false,
            player2Wins: false,
            isPlayer2Turn: false,
            isPLayer1Turn: true,
            isDrawn: false
        }))
    }, [])


    return (
        <div className={"flex flex-col justify-between items-center"}>
            <Header label={"room info"}/>
            {/*MEIO DA TELA; PC- JOGO + PLACARES*/}
            <div>
                {/*PLAYERS*/}
                <div>
                    {playerInfos?.playerIndex == 1 && (
                        <PlayerPoints roomInfo={roomInfo} playerIndex={playerInfos.playerIndex}/>

                    )}
                </div>
                <div className={"w-[500px]"}>

                </div>
                <div className={"grid grid-cols-3 w-fit mx-auto "}>
                    {/*/TODO -> criar um componente para cuidar de tudo do jogo (placar, nomes...) e outro interno para o jogo em si*/}
                    {states.map((state, i) => {
                        return (
                            <Square
                                value={state}
                                index={i}
                                onClick={ ()=> {}}
                                key={i}
                                isDisabled={false}
                            />
                        )
                    })}
                </div>
                {/*DRAW*/}
                <div>
                    <Point points={roomInfo.drawsCount} label={"Draw"}/>
                </div>
            </div>


            <div className={""}>

            </div>


            <ThemeToggleFooter useReturnHomeButton/>
        </div>)
}
