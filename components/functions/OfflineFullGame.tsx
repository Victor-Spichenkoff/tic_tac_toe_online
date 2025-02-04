import {InGameOfflineBot} from "@/types/offilineMatch"
import {Square} from "@/components/functions/Square"
import {useDispatch, useSelector} from "react-redux"
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore"
import {GetBotMove, IsDraw, Sleep, WinCheckForPlayer} from "@/helpers/Bot"
import {TransitionStartFunction, useCallback, useEffect, useState} from "react"
import {toast} from "sonner"
import {RootState} from "@/libs/redux"

interface OfflineFullGameProps {
    gameInfo: InGameOfflineBot
    setIsLoading: (b: boolean) => void
}

export const OfflineFullGame = ({setIsLoading}: OfflineFullGameProps) => {
    const dispatch = useDispatch()
    // const [localState, setLocaState] = useState<InGameOfflineBot>(gameInfo)
    const gameInfo = useSelector((state: RootState) => state.botState.value)
    if (!gameInfo) return null
    const [isBotStarting, setIsBotStarting] = useState(false)

    const handlePlayerTurn = (index: number) => {
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
            isPlayerTurn: false,
            isBotTurn: true,
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
            isPlayerTurn: true,
            isBotTurn: false,
            state: finalState,
        }

        dispatch(setFullInGameBotState(updatedState))
        setIsLoading(false) // Fim do turno do bot
        return updatedState
    }

    const handleSquareClick = async (index: number, ignorePlayer?: boolean) => {
        if (gameInfo.isFinished) return
        let currentState
        let isPlayerWin = false

        if (gameInfo.isPlayerTurn) {
            currentState = handlePlayerTurn(index)
            isPlayerWin = WinCheckForPlayer(1, currentState.state)

            // já ganhou/empatou
            if (!isPlayerWin && currentState.state.includes(0)) {
                // Aguarda a conclusão da jogada do jogador antes de iniciar a do bot
                await Sleep(500) // Animação fluida

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
            finalState.playerWins = true
            finalState.playerPoints += 1
        } else if (isBotWin) {
            finalState.botWins = true
            finalState.botPoints += 1
        } else {
            finalState.drawCount += 1
        }

        if (finalState.matchCount % 2 == 0) {
            console.log("Bot vai comecçar a proxima")
            setIsBotStarting(true)// permitir ele iniciar rápidamente
        }

        dispatch(setFullInGameBotState(finalState))
    }

    const handleBotStart = async () => {
        if (gameInfo.isFinished || gameInfo.isPlayerTurn) return
        // ainda tem coisa
        if (gameInfo.state.includes(1) || gameInfo.state.includes(2)) return

        console.log("BOT START!")
        setIsBotStarting(false)
        let currentState = gameInfo

        await Sleep(500)
        currentState = await handleBotTurn(currentState)

        dispatch(setFullInGameBotState(currentState))
    }

    useEffect(() => {
        console.log("Bot may start")
        if (isBotStarting)
            handleBotStart()
    }, [gameInfo])


    return (
        <div className={"grid grid-cols-3 mx-auto w-[384px] md:w-[426px] lg:w-[432px] lg:h-[432px]"}>
            {/*/TODO -> criar um componente para cuidar de tudo do jogo (placar, nomes...) e outro interno para o jogo em si*/}
            {gameInfo.state.map((state, i) => {
                {/*{localState.state.map((state, i) => {*/
                }
                return (
                    <Square
                        value={state}
                        index={i}
                        onClick={handleSquareClick}
                        key={i}
                        isDisabled={gameInfo.isFinished}
                    />
                )
            })}
        </div>
    )
}
