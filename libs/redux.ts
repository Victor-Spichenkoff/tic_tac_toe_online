"use client"

import {configureStore} from '@reduxjs/toolkit'
import {inGameStateStore} from "@/libs/stores/inGameOnlineStore";
import {roomStateStore} from "@/libs/stores/RoomState";
import {playerInfosStore} from "@/libs/stores/PlayerInfos";
import {socketStore} from "@/libs/stores/SocketStore";
import {inGameBotStateStore} from "@/libs/stores/inGameOfflineStore";


export const store = configureStore({
    reducer: {
        inGameState: inGameStateStore,
        roomState: roomStateStore,
        playerInfo: playerInfosStore,
        socketState: socketStore,
        botState: inGameBotStateStore,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false// erro aqui; erro de non serialization para o socket
        }),
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
