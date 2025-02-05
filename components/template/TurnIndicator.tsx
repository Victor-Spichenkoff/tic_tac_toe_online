import {useEffect, useState} from "react"

interface TurnIndicatorProps {
    playerIndex?: 1 | 2,
    isPLayer1Turn?: boolean,
    isFinished?: boolean,
    isLocalMultiplayer?: boolean,
}

export const TurnIndicator = ({isPLayer1Turn, playerIndex, isFinished, isLocalMultiplayer}: TurnIndicatorProps) => {


    const [text, setText] = useState('turn')

    useEffect(() => {
        let newText = "Turn Info"

        if (isLocalMultiplayer) {
            if (isFinished)
                newText = "Match Finished"
            else if (isPLayer1Turn)
                newText = "Player 1 Turn"
            else
                newText = "Player 2 Turn"
        } else {// online e bot
            if (isFinished)
                newText = "Match Finished"
            else if (isPLayer1Turn && playerIndex === 1 || !isPLayer1Turn && playerIndex == 2)
                newText = "Your Turn"
            else if (isPLayer1Turn && playerIndex === 2 || !isPLayer1Turn && playerIndex == 1)
                newText = "Opponent Turn"
        }


        setText(newText)
    }, [isPLayer1Turn, isFinished, playerIndex])

    return (
        <div className={`text-md flex justify-center font-hand_text
        h-fit
            ${text.includes("Your")  && "text-darkCircle"}
            ${text.includes("2") && "text-lightCircle dark:text-darkCircle"}
            ${(text.includes("Opponent") || text.includes("1")) && "text-cross"}
            ${text.includes("Finished") && "text-yellow-400"}
            
        `}>
            {text}
        </div>
    )
}
