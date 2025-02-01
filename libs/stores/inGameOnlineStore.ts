import {InGameOnlineState} from "@/types/onlineInfos";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InGameOnlineSlice {
    value: InGameOnlineState | null
}

// Define the initial state using that type
const initialState: InGameOnlineSlice = {
    value: null
    //     {
    //     roomId: "",
    //     state: [
    //         0, 0, 0,
    //         0, 0, 0
    //     ],
    //     isFinished: false,
    //     isPLayer1Turn: true,
    //     player1Wins: false,
    //     player2Wins: false,
    //     isPlayer2Turn: false
    // }
}

export const inGameStateSlice = createSlice({
    name: 'InGameOnlineStore',
    initialState,
    reducers: {
        setFullInGameState: (state, action: PayloadAction<InGameOnlineState>) => {
            state.value = action.payload
        },
        setInGameStateToNull: (state) => { state.value = null }
    }
})


// para usar fora rapidamente
export const {  setFullInGameState, setInGameStateToNull } = inGameStateSlice.actions

//ele que usa para configurar no store
export const inGameStateStore = inGameStateSlice.reducer
