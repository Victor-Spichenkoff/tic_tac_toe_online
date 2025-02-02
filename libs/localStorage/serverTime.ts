import {player_info_key} from "@/global";
import {PlayerInfos} from "@/libs/localStorage/playerInfos";

export const storeLastUsedTime = (newTime: number) => {
    localStorage.setItem("last_start", newTime.toString())
}

export const getStoreLastUsedTime = () => {
    const timeStorage = localStorage.getItem("last_start")

    console.log(timeStorage)
    if(!timeStorage)
        return null

    return Number(timeStorage)//erro aqui
}
