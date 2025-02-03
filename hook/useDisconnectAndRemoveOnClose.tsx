import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {apiUrl} from "@/global";
import {setInGameStateToNull} from "@/libs/stores/inGameOnlineStore";
import {setRoomStateToNull} from "@/libs/stores/RoomState";
import {setFullPlayerInfos} from "@/libs/stores/PlayerInfos";
import {setSocket} from "@/libs/stores/SocketStore";
import {toast} from "sonner";

export const useDisconnectAndRemoveOnClose = (roomId: string | undefined, playerIndex: number | undefined) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (!roomId || !playerIndex) return

        const handleBeforeUnload = () => {
            // Usando navigator.sendBeacon para garantir que a requisição seja enviada
            if (roomId) {
                const disconnectUrl = `${apiUrl}/disconnect/${playerIndex}/${roomId}`
                navigator.sendBeacon(disconnectUrl)
                dispatch(setInGameStateToNull())
                dispatch(setRoomStateToNull())
                dispatch(setFullPlayerInfos(null))
                dispatch(setSocket(null))

                toast.warning("Remove local game data!")
            }
        };

        // Adiciona o listener
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [roomId])
}
