import {Square} from "@/components/functions/Square";
import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";

interface OnlineFullGameProps {
    roomId: string
}

export const OnlineFullGame = ({roomId}: OnlineFullGameProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)

    if(!inGameInfo)
        return "No game info found"

    return (
        <div className={"grid grid-cols-3 w-fit mx-auto "}>
            {/*/TODO -> criar um componente para cuidar de tudo do jogo (placar, nomes...) e outro interno para o jogo em si*/}
            {inGameInfo.state.map((state, i) => {
                return (
                    <Square value={state} index={i}/>
                )
            })}
        </div>
    )
}
