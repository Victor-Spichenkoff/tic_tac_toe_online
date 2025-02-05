import {InGameOfflineBot} from "@/types/offilineMatch"
import {Square} from "@/components/functions/Square"
import {useDispatch, useSelector} from "react-redux"
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore"
import {GetBotMove, IsDraw, Sleep, WinCheckForPlayer} from "@/helpers/Bot"
import {TransitionStartFunction, useCallback, useEffect, useState} from "react"
import {toast} from "sonner"
import {RootState} from "@/libs/redux"
import {useBotMatch} from "@/hook/useBotMatch";
import {usePlayerMatch} from "@/hook/usePlayerMatch";

interface OfflineFullGameProps {
    gameInfo: InGameOfflineBot
    setIsLoading: (b: boolean) => void
    useBot?: boolean
}

export const OfflineFullGame = ({setIsLoading, useBot}: OfflineFullGameProps) => {
    const dispatch = useDispatch()
    // const [localState, setLocaState] = useState<InGameOfflineBot>(gameInfo)
    const gameInfo = useSelector((state: RootState) => state.botState.value)
    if (!gameInfo) return null
    const [isBotStarting, setIsBotStarting] = useState(false)

    const { handleSquareClickWithBot } = useBotMatch({gameInfo, setIsLoading})
    const { handleLocalClickWithPlayer } = usePlayerMatch({gameInfo})

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
                        onClick={useBot ? handleSquareClickWithBot : handleLocalClickWithPlayer}
                        key={i}
                        isDisabled={gameInfo.isFinished}
                    />
                )
            })}
        </div>
    )
}
