import { useEffect, useState} from "react"

interface TurnIndicatorProps {
    playerIndex?: 1 | 2,
    isPLayer1Turn?: boolean,
    isFinished?: boolean,
}

export const TurnIndicator = ({isPLayer1Turn, playerIndex,isFinished} :TurnIndicatorProps) => {


    const [text, setText] = useState('turn')

    useEffect(() => {
        let newText = "Turn Info"

        if (isFinished) 
            newText = "Match Finished"
         else if (isPLayer1Turn && playerIndex === 1 || !isPLayer1Turn && playerIndex == 2) 
            newText = "Your Turn"
         else if (isPLayer1Turn && playerIndex === 2 || !isPLayer1Turn && playerIndex == 1) 
            newText = "Opponent Turn"
        

        setText(newText)
    }, [isPLayer1Turn, isFinished, playerIndex])

    return (
        <div className={`text-md flex justify-center font-hand_text
        h-fit
            ${text.includes("Your") && "text-darkCircle"}
            ${text.includes("Opponent") && "text-cross"}
            ${text.includes("Finished") && "text-yellow-400"}
        `}>
            {text}
        </div>
    )
}
