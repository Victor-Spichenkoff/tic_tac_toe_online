import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PlayerInfos} from "@/libs/localStorage/playerInfos";

interface RoomStateSlice {
    value: PlayerInfos | null
}

// Define the initial state using that type
const initialState: RoomStateSlice = {
    value: null
}

export const playerInfosSlice = createSlice({
    name: 'InGameOnlineStore',
    initialState,
    reducers: {
        setFullPlayerInfos: (state, action: PayloadAction<PlayerInfos | null>) => {
            state.value = action.payload
        },
    }
})


// para usar fora rapidamente
export const {  setFullPlayerInfos } = playerInfosSlice.actions

//ele que usa para configurar no store
export const playerInfosStore = playerInfosSlice.reducer
