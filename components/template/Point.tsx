import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";

interface PointProps {
    points: number
    label: string
    className?: string
    maxSize?: number
}

export const Point = ({points, label, className, maxSize=10}: PointProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)

    let fullSquares = []
    let useNumbers = false// PREVENIR MUITO GRANDE

    const fullSquareCount = Math.floor(points / 5)
    const remainingCount = points % 5

    const diagonalWith = Math.floor(128 * Math.sqrt(2))

    if (points > maxSize) {
        useNumbers = true
    } else {
        useNumbers = false
        for (let i = 0; i < fullSquareCount; i++) {
            fullSquares.push(
                <div className={'h-32 overflow-hidden ' + className} key={i}>
                    <div
                        className={`h-32 w-32 border-2 border-white relative flex items-center justify-center overflow-visible`}>
                        <div className={`   
                            bg-white border-[1px]  border-white
                            rotate-45
                            absolute top-1/2 left-[calc(50% - 50%]
                            z-20
                            `}
                            // style={{width: "181px"}}
                             style={{width: `calc(100% * ${diagonalWith})`}}
                        ></div>
                    </div>

                </div>)
        }
    }


    return (
        <div className={className}>
            <h2 className={"font-hand_title text-xl lg:text-3xl lg:text-center mb-2"}>{label}</h2>

            {useNumbers && (
                <div className={"text-2xl text-center w-full"}>{points}</div>
            )}
            {!useNumbers && (
                <div className={"flex lg:flex-col items-center justify-between gap-x-4 lg:gap-x-0 lg:gap-y-6"}>
                    {fullSquares}
                    {remainingCount > 0 && (
                        <div className={`h-32 w-32 
                        ${remainingCount >= 1 && "border-l-2"}
                        ${remainingCount >= 2 && "border-t-2"}
                        ${remainingCount >= 3 && "border-r-2"}
                        ${remainingCount >= 4 && "border-b-2"}
                        border-white 
                        
                        relative flex items-center justify-center overflow-visible`}></div>

                    )}
                </div>
            )}
        </div>
    )
}
