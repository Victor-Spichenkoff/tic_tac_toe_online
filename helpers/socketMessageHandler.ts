import {InGameOnlineState} from "@/types/onlineInfos";

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
