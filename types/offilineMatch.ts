import {SquareOptions} from "@/types/onlineInfos";

export type InGameOfflineBot = {
    state: SquareOptions[]
    isFinished: boolean
    isPlayer1Turn: boolean
    isPlayer2Turn: boolean
    player1Wins: boolean
    player2Wins: boolean,
    player1Points: number,
    player2Points: number,
    drawCount: number,
    matchCount: number
}

// export type InGameOfflineBot = {
//     state: SquareOptions[]
//     isFinished: boolean
//     isPlayerTurn: boolean
//     isBotTurn: boolean
//     playerWins: boolean
//     botWins: boolean,
//     playerPoints: number,
//     botPoints: number,
//     drawCount: number,
//     matchCount: number
// }

