import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface SocketSlice {
    value: WebSocket | null
}

// Define the initial state using that type
const initialState: SocketSlice = {
    value: null
}

export const socketSlice = createSlice({
    name: 'SocketSlice',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<WebSocket>) => {
            state.value = action.payload
        },
    }
})


// para usar fora rapidamente
export const {  setSocket } = socketSlice.actions

//ele que usa para configurar no store
export const socketStore = socketSlice.reducer
