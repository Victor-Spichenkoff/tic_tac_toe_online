import {InGameOnlineState} from "@/types/onlineInfos";

export type ErrorResponse = {
    message: string
    status: number
}


export type SocketResponse = {
    isError: boolean
    inGameState?: InGameOnlineState
    errorMessage?: string
}
