import {InGameOnlineState} from "@/types/onlineInfos";
import {SocketResponse} from "@/types/responsesTypes";

export const FormatToJson = (inGameState: InGameOnlineState) => {
    return JSON.stringify(inGameState)
}


export const FormatToObject = (inGameStateString: string) => {
    try {
        const res: InGameOnlineState = JSON.parse(inGameStateString)
        return res
    } catch (e) {
        return null
    }
}


export const FormatToSocketResponse = (socketResponseString: string) => {
    try {
        const res: SocketResponse = JSON.parse(socketResponseString)
        return res
    } catch (e) {
        return null
    }
}
