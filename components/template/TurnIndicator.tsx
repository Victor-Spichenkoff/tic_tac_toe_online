import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {usePlayerInfo} from "@/hook/usePlayerInfo";

interface TurnIndicatorProps {
    playerIndex?: 1 | 2,
    isPlayer1Turn?: boolean,
    isFinished?: boolean,
}

export const TurnIndicator = ({}: TurnIndicatorProps) => {
// export const TurnIndicator = ({isPlayer1Turn, playerIndex,isFinished} :TurnIndicatorProps) => {
    const [text, setText] = useState('turn')

    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerIndex = usePlayerInfo()?.playerIndex

    console.log(inGameInfo)

    // useEffect(() => {
    //     if (inGameInfo?.isPLayer1Turn && playerIndex == 1 && !inGameInfo?.isFinished)
    //         setText("Your Turn")
    //
    //     if (inGameInfo?.isPLayer1Turn && playerIndex == 2 && !inGameInfo?.isFinished)
    //         setText("Opponent Turn")
    //
    //     if (inGameInfo?.isFinished)
    //         setText("Match Finished")
    // }, [inGameInfo?.isPLayer1Turn, playerIndex, inGameInfo?.isFinished])


    return (
        <div className={`text-md flex justify-center font-hand_text
            ${text.includes("Your") && "text-darkCircle"}
            ${text.includes("Opponent") && "text-cross"}
            ${text.includes("Finished") && "text-yellow-400"}
        `}>
            {text}
        </div>
    )
}
