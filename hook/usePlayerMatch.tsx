import {InGameOfflineBot} from "@/types/offilineMatch";
import {useDispatch} from "react-redux";
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore";
import {toast} from "sonner";
import {IsDraw, Sleep, WinCheckForPlayer} from "@/helpers/Bot";

interface UsePlayerMatchProps {
    gameInfo: InGameOfflineBot
}

export const usePlayerMatch = ({gameInfo}: UsePlayerMatchProps) => {
    const dispatch = useDispatch()

    const handleLocalPlayerTurn = (index: number) => {
        // Cópia do estado atual do jogo
        let finalState = [...gameInfo.state]
        if (finalState[index] !== 0) {
            toast.error("Invalid move!")
            throw "Invalid move!"
        }


        if (gameInfo.isPlayer1Turn) {
            finalState[index] = 1
        }
        else if (gameInfo.isPlayer2Turn)
            finalState[index] = 2
        else {
            toast.error("Something went wrong!")
            throw "Something went wrong!"
        }

        // Atualiza o estado do jogo no Redux
        const updatedState: InGameOfflineBot = {
            ...gameInfo,
            isPlayer1Turn: !gameInfo.isPlayer1Turn,
            isPlayer2Turn: !gameInfo.isPlayer2Turn,
            state: finalState,
        }

        dispatch(setFullInGameBotState(updatedState))
        return updatedState
    }

    //todo -> implementar essa lógica, incluir a win check
    const handleLocalClickWithPlayer = (index: number) => {
        if (gameInfo.isFinished) return
        let currentState
        let isPlayer1Win = false
        let isPlayer2Win = false

            currentState = handleLocalPlayerTurn(index)
        if (gameInfo.isPlayer1Turn) {
            // currentState = handleLocalPlayerTurn(index)
            isPlayer1Win = WinCheckForPlayer(1, currentState.state)
        } else if (gameInfo.isPlayer2Turn) {
            // currentState = handleLocalPlayerTurn(index)
            isPlayer2Win = WinCheckForPlayer(2, currentState.state)
        }
        else if (!currentState) {
            return toast.error("Something went wrong!")
        }
        else
            toast.error("Wait your turn!")


        // const isPlayer2Win = WinCheckForPlayer(2, currentState.state)
        const isDraw = IsDraw(currentState.state)

        if (!isPlayer1Win && !isPlayer2Win && !isDraw) return dispatch(setFullInGameBotState(currentState))

        const finalState = {...currentState}

        finalState.isFinished = true
        finalState.matchCount += 1

        if (isPlayer1Win) {
            finalState.player1Wins = true
            finalState.player1Points += 1
        } else if (isPlayer2Win) {
            finalState.player2Wins = true
            finalState.player2Points += 1
        } else {
            finalState.drawCount += 1
        }

        dispatch(setFullInGameBotState(finalState))
    }

    return {handleLocalClickWithPlayer}

}
