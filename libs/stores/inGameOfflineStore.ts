import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {InGameOfflineBot} from "@/types/offilineMatch"

interface InGameOnlineSlice {
    value: InGameOfflineBot | null
}

// Define the initial state using that type
const initialState: InGameOnlineSlice = {
    value: {
        state: [
            1, 2, 0,
            1, 2, 0,
            0, 0, 0
            // 0, 0, 0,
            // 0, 0, 0,
            // 0, 0, 0
        ],
        isFinished: false,
        isPlayer1Turn: true,
        isPlayer2Turn: false,
        player1Wins: false,
        player2Wins: false,
        player2Points: 0,
        player1Points: 0,
        drawCount: 0,
        matchCount: 1
    }
}

export const inGameBotState = createSlice({
    name: 'InGameOnlineStore',
    initialState,
    reducers: {
        setFullInGameBotState: (state, action: PayloadAction<InGameOfflineBot>) => {
            state.value = action.payload
        },
        setInGameStateToNull: (state) => { state.value = null }
    }
})


// para usar fora rapidamente
export const {  setFullInGameBotState, setInGameStateToNull } = inGameBotState.actions

//ele que usa para configurar no store
export const inGameBotStateStore = inGameBotState.reducer
