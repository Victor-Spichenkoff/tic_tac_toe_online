import {toast} from "sonner";
import {InGameOfflineBot} from "@/types/offilineMatch";
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore";
import {GetBotMove, IsDraw, Sleep, WinCheckForPlayer} from "@/helpers/Bot";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {useEffect, useState} from "react";

interface UseBotMatchProps {
    gameInfo: InGameOfflineBot
    setIsLoading: (isLoading: boolean) => void
}

export const useBotMatch = ({gameInfo, setIsLoading}:UseBotMatchProps) => {
    // const gameInfo = useSelector((state: RootState) => state.botState.value)
    const dispatch = useDispatch()
    const [isBotStarting, setIsBotStarting] = useState(false)


    const handlePlayerTurnWithBot = (index: number) => {
        // Cópia do estado atual do jogo
        let finalState = [...gameInfo.state]
        if (finalState[index] !== 0) {
            toast.error("Invalid move!")
            throw "Invalid move!"
        }

        // Atualiza a jogada do player
        finalState[index] = 1

        // Atualiza o estado do jogo no Redux
        const updatedState: InGameOfflineBot = {
            ...gameInfo,
            isPlayer1Turn: false,
            isPlayer2Turn: true,
            state: finalState,
        }

        dispatch(setFullInGameBotState(updatedState))
        return updatedState
    }

    const handleBotTurn = async (gameInfo: InGameOfflineBot) => {
        setIsLoading(true) // Indica que o bot está jogando

        // Garante que o estado do Redux seja atualizado antes do turno do bot
        const finalState = [...gameInfo.state]
        const movePosition = await GetBotMove(finalState)

        // Atualiza a jogada do bot
        finalState[movePosition] = 2

        const updatedState: InGameOfflineBot = {
            ...gameInfo,
            isPlayer1Turn: true,
            isPlayer2Turn: false,
            state: finalState,
        }

        dispatch(setFullInGameBotState(updatedState))
        setIsLoading(false) // Fim do turno do bot
        return updatedState
    }

    const handleSquareClickWithBot = async (index: number, ignorePlayer?: boolean) => {
        if (gameInfo.isFinished) return
        let currentState
        let isPlayerWin = false

        if (gameInfo.isPlayer1Turn) {
            currentState = handlePlayerTurnWithBot(index)
            isPlayerWin = WinCheckForPlayer(1, currentState.state)

            // já ganhou/empatou
            if (!isPlayerWin && currentState.state.includes(0)) {
                await Sleep(250)

                currentState = await handleBotTurn(currentState)
            }
        } else if (!currentState)
            return toast.error("Something went wrong!")
        else
            toast.error("Wait your turn!")


        const isBotWin = WinCheckForPlayer(2, currentState.state)
        const isDraw = IsDraw(currentState.state)

        if (!isPlayerWin && !isBotWin && !isDraw) return dispatch(setFullInGameBotState(currentState))

        const finalState = {...currentState}

        finalState.isFinished = true
        finalState.matchCount += 1

        if (isPlayerWin) {
            finalState.player1Wins = true
            finalState.player1Points += 1
        } else if (isBotWin) {
            finalState.player2Wins = true
            finalState.player2Points += 1
        } else {
            finalState.drawCount += 1
        }

        if (finalState.matchCount % 2 == 0) {
            setIsBotStarting(true)// permitir ele iniciar rápidamente
        }

        dispatch(setFullInGameBotState(finalState))
    }


    const handleBotStart = async () => {
        if (gameInfo.isFinished || gameInfo.isPlayer1Turn) return
        // ainda tem coisa
        if (gameInfo.state.includes(1) || gameInfo.state.includes(2)) return

        setIsBotStarting(false)
        let currentState = gameInfo

        await Sleep(500)
        currentState = await handleBotTurn(currentState)

        dispatch(setFullInGameBotState(currentState))
    }

    useEffect(() => {
        if (isBotStarting)
            handleBotStart()
    }, [gameInfo])

    return {handleSquareClickWithBot}

}
