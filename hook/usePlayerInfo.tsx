import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {getStorePlayerInfo, PlayerInfos} from "@/libs/localStorage/playerInfos";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export const usePlayerInfo = () => {
    const router = useRouter()

    //priorizar o remoto, evitar conflitos
    const storeUSerInfo = useSelector((state: RootState) => state.playerInfo.value)
    if(storeUSerInfo)
       return storeUSerInfo

    const locaStoragePLayerInfo = getStorePlayerInfo()

    if(locaStoragePLayerInfo)
        return locaStoragePLayerInfo

    toast.error("There is not player info")
    return null
}
