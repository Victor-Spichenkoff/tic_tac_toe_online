import {WinsState} from "@/types/winsState";

/*
* *
* */
export type InGameOnlineState = {
    roomId: string;
    isFinished: boolean
    player1Wins: boolean
    player2Wins: boolean
    state: SquareOptions[]
    isPLayer1Turn: boolean
    isPlayer2Turn: boolean
}

export type RoomState = {
    roomId: string
    isPLayer1Connected: boolean
    isPLayer2Connected: boolean
    player1Points: number
    player2Points: number
    drawsCount: number
}


/*
* * Objeto para enviar as infos para a API (1 jogada)
* */
export type SendInfosObject = {
    playerIndex: 1 | 2,
    choosePosition: 3 // index, começa em 0 1 2...
}

//TODO -> Criar um sobre infos da sala (id...)
/*
* * Como está tudo antes de começar
* */
export type MatchStatus = {
    isWaiting: boolean
}


export type FullOnlineInfos = {
    inGameState: InGameOnlineState
    roomState: RoomState
}


export interface FullOnlineInfosWithPlayerIndex extends FullOnlineInfos {
    playerIndex: 1 | 2
}


export type SquareOptions = 0 | 1 | 2
