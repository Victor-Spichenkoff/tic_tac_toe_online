import {player_info_key} from "@/global";

export type PlayerInfos =  {
    playerIndex: 1 | 2
}


export const storePlayerInfo = (playerInfo: PlayerInfos) => {
    localStorage.setItem(player_info_key, JSON.stringify(playerInfo))
}

export const getStorePlayerInfo = () => {
    const playerInfos = localStorage.getItem(player_info_key)

    if(!playerInfos)
        return null

    return JSON.parse(playerInfos) as PlayerInfos//erro aqui
}
