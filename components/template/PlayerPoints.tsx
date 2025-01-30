import {RoomState} from "@/types/onlineInfos";
import {Point} from "@/components/template/Point";

type PLayerPointsProps = {
    roomInfo: RoomState
    playerIndex: 1 | 2 | undefined | null
}

export const PlayerPoints = ({playerIndex, roomInfo}: PLayerPointsProps) => {



    return (
        <div className={"flex flex-row justify-between md:flex-col h-[500px]"}>
            {playerIndex == 1 && (
                <div className={"flex h-full flex-row md:flex-col gap-y-4"}>
                    <Point points={roomInfo.player1Points} label={"Your Points"} className={"flex-1"} maxSize={5}/>
                    <Point points={roomInfo.player2Points} label={"Opponent Points"} className={"flex-1"} maxSize={5}/>
                </div>
            )}

            {playerIndex == 2 && (
                <div>
                    <Point points={roomInfo.player2Points} label={"Your Points"} className={"flex-1"}/>
                    <Point points={roomInfo.player1Points} label={"Opponent Points"} className={"flex-1"}/>
                </div>
            )}
        </div>
    )
}

