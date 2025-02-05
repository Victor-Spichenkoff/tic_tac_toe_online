import {SquareOptions} from "@/types/onlineInfos"
import {InGameOfflineBot} from "@/types/offilineMatch";

// export const GetBotMove = async (state: SquareOptions[]) => {
//
//
//
//     const timeout = 1//algo entre 100ms até 1ms
//
//     return new Promise( resolve=> {
//         setTimeout(()=> {
//             resolve(1)// onde jogar, de 0-8
//         }, timeout)
//     })
// }


export const GetBotMove = async (state: SquareOptions[]): Promise<number> => {
    const timeout = Math.floor(Math.random() * (1000 - 100) + 100)

    // Possíveis combinações de vitória no jogo da velha
    const winningCombinations = [
        [0, 1, 2], // Linha superior
        [3, 4, 5], // Linha do meio
        [6, 7, 8], // Linha inferior
        [0, 3, 6], // Coluna esquerda
        [1, 4, 7], // Coluna do meio
        [2, 5, 8], // Coluna direita
        [0, 4, 8], // Diagonal principal
        [2, 4, 6], // Diagonal secundária
    ]

    // Função para verificar se há uma jogada vencedora ou para bloquear o player
    const findCriticalMove = (player: 1 | 2): number | null => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination
            const line = [state[a], state[b], state[c]]

            // Verifica se há dois iguais e um vazio (prioriza jogada ou bloqueio)
            if (line.filter((v) => v === player).length === 2 && line.includes(0)) {
                return combination[line.indexOf(0)]
            }
        }
        return null
    }


    return new Promise((resolve) => {

        setTimeout(() => {
            let move = findCriticalMove(2)
            if (move !== null) {
                resolve(move)
                return
            }

            // 2. Bloqueia vitória do player
            move = findCriticalMove(1)
            if (move !== null) {
                resolve(move)
                return
            }

            // 3. Escolhe uma jogada aleatória
            const emptySquares = state
                .map((value, index) => (value === 0 ? index : null))
                .filter((index) => index !== null) as number[]
            const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)]
            resolve(randomMove)
        }, timeout)
    })
}

export const WinCheckForPlayer = (playerIndex: number, state: SquareOptions[]): boolean => {
    const winningCombinations = [
        // Linhas
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Colunas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonais
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (const combination of winningCombinations) {
        if (
            state[combination[0]] === playerIndex &&
            state[combination[1]] === playerIndex &&
            state[combination[2]] === playerIndex
        ) {
            return true
        }
    }

    return false
}

export const IsDraw = (state: SquareOptions[]) => {
    if (state.includes(0)) return false

    const isPlayerWin = WinCheckForPlayer(1, state)
    const isBotWin = WinCheckForPlayer(2, state)

    return !isPlayerWin && !isPlayerWin
}

export const getResetLocalState = (): InGameOfflineBot => {
    return {
        state: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        isPlayer1Turn: true,
        isPlayer2Turn: false,
        player2Points: 0,
        player1Points: 0,
        matchCount: 1,
        isFinished: false,
        player1Wins: false,
        player2Wins: false,
        drawCount: 0

    }
}

export const Sleep = (msTime: number) => new Promise(resolve => setTimeout(() => resolve(true), msTime))
