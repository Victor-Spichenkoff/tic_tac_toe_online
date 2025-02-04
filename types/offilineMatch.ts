import {SquareOptions} from "@/types/onlineInfos";

export type InGameOfflineBot = {
    state: SquareOptions[]
    isFinished: boolean
    isPlayerTurn: boolean
    isBotTurn: boolean
    playerWins: boolean
    botWins: boolean,
    playerPoints: number,
    botPoints: number,
    drawCount: number,
    matchCount: number
}

