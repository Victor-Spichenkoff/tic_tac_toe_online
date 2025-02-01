"use client"

import {Square} from "@/components/functions/Square"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/libs/redux"
import {toast} from "sonner"
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos"
import {GameAction} from "@/types/RequestBody"
import {usePlayerInfo} from "@/hook/usePlayerInfo";
import {useCallback, useEffect} from "react";

interface OnlineFullGameProps {
    roomId: string
}


// export const OnlineFullGame = ({roomId, inGameState: inGameInfo}: OnlineFullGameProps) => {
export const OnlineFullGame = ({roomId}: OnlineFullGameProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const socket = useSelector((state: RootState) => state.socketState.value)
    const playerInfos = usePlayerInfo()
    const playerInfo = usePlayerInfo()

    if (!inGameInfo || !playerInfos)
        return "No game info found"

    const handleSquareClick = (squareIndex: number) => {
        // bloquear o player
        const playerName = playerInfo?.playerIndex == 1 ? `isPLayer1Turn` : "isPlayer2Turn"
        if(inGameInfo.isFinished)
            return

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

        socket?.send(stringConverted)
    }

    // todo -> não está mostrando a msg de quem ganhou
    useEffect((): any=> {
       if(inGameInfo.isFinished) {
           if(inGameInfo.isDrawn)
               return toast.info("Draw!")
           else if(//só assim para ter ganhado
               (inGameInfo.player1Wins && playerInfo?.playerIndex == 1) ||
               (inGameInfo.player2Wins && playerInfo?.playerIndex == 2)
           )
               toast.success("You won!")
           else
               toast.error("You lose!")
       }
    }, [inGameInfo.isFinished, inGameInfo.isDrawn, inGameInfo.player1Wins, playerInfo?.playerIndex, inGameInfo.player2Wins])

    return (

        <div className={"grid grid-cols-3 mx-auto w-[384px] md:w-[426px] lg:w-[432px] lg:h-[432px]"}>
            {/*/TODO -> criar um componente para cuidar de tudo do jogo (placar, nomes...) e outro interno para o jogo em si*/}
            {inGameInfo.state.map((state, i) => {
                return (
                    <Square
                        value={state}
                        index={i}
                        onClick={handleSquareClick}
                        key={i}
                        isDisabled={inGameInfo.isFinished}
                    />
                )
            })}
        </div>
    )
}
