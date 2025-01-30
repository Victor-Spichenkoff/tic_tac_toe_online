"use client"

import {SquareOptions} from "@/types/onlineInfos";
import {toast} from "sonner";

interface ISquare {
    value: SquareOptions,
    index: number
    onClick: (index: number) => void
    isDisabled?: boolean
}

let borders = "border"
let icon
export const Square = ({ value, index, onClick, isDisabled }: ISquare) => {
    if(value == 1)
        icon = "X"
    else if(value == 2)
        icon = "O"
    else {
        icon = " "
    }

    switch (index) {
        case 0:
            borders = "border-b border-r"; break;
        case 1:
            borders = "border-b border-r border-l"; break;
        case 2:
            borders = "border-b border-l"; break;
        case 3:
            borders = "border-b border-t border-r"; break;
        case 4:
            borders = "border-b border-l border-t border-r"; break;
        case 5:
            borders = "border-b border-l border-t"; break;
        case 6:
            borders = "border-r border-t"; break;
        case 7:
            borders = "border-t border-r border-l"; break;
        case 8:
            borders = "border-t border-l"; break;
    }

    const handleClick = () => {
        if(isDisabled)
            toast.error("Game finished")

        onClick(index)
    }


    return (
        <div className={`flex items-center justify-center
                 ${value == 1 && "text-cross"} ${value == 2 && "text-lightCircle dark:text-darkCircle"}
                font-hand_icons leading-none p-0 m-0
                ${value == 0 && "cursor-pointer hover:bg-emerald-700 dark:hover:bg-black/90"}
                
                border-0  ${borders} border-white-600
                w-32 h-32 text-8xl md:w-36 md:h-36 md:text-9xl`}
                style={{ lineHeight: "100%" }}
             onClick={handleClick}
        >
                {/*md:min-w-[556px] md:min-h-[440px]*/}
            { icon }
        </div>
    )
}
