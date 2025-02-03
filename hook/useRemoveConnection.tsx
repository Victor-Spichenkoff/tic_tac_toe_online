import {RemoveConnectionService} from "@/services/connectionInfosManager";
import {setInGameStateToNull} from "@/libs/stores/inGameOnlineStore";
import {setRoomStateToNull} from "@/libs/stores/RoomState";
import {setFullPlayerInfos} from "@/libs/stores/PlayerInfos";
import {setSocket} from "@/libs/stores/SocketStore";
import {toast} from "sonner";
import {useDispatch} from "react-redux";

export const useRemoveConnection = (roomId: string, playerIndex: 1 | 2) => {
    const dispatch = useDispatch()


    const destroyConnection = async (specialMessage?: string) => {
        await RemoveConnectionService(playerIndex, roomId)
        dispatch(setInGameStateToNull())
        dispatch(setRoomStateToNull())
        dispatch(setFullPlayerInfos(null))
        dispatch(setSocket(null))

        toast.warning(specialMessage ?? "Remove local game data!")

    }

    return {destroyConnection}
}
