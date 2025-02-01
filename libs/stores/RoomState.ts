import {InGameOnlineState, RoomState} from "@/types/onlineInfos";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RoomStateSlice {
    value: RoomState | null
}

// Define the initial state using that type
const initialState: RoomStateSlice = {
    value: null
}

export const roomStateSlice = createSlice({
    name: 'InGameOnlineStore',
    initialState,
    reducers: {
        setFullRoomState: (state, action: PayloadAction<RoomState>) => {
            state.value = action.payload
        },
        setRoomStateToNull: (state) => { state.value = null }
    }
})


// para usar fora rapidamente
export const {  setFullRoomState, setRoomStateToNull } = roomStateSlice.actions

//ele que usa para configurar no store
export const roomStateStore = roomStateSlice.reducer
