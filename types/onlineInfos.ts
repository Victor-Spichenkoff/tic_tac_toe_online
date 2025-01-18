import {WinsState} from "@/types/winsState";

/*
* *
* */
export type InGameOnlineState = {
    isFinished: boolean
    player1Wins: boolean
    player2Wins: boolean
    state: SquareOptions[]
    isPLayer1Turn: boolean
    isPlayer2Turn: boolean
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


export type SquareOptions = 0| 1 | 2
