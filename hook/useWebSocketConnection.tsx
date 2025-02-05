import {useCallback, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {InGameOnlineState} from "@/types/onlineInfos"
import {setSocket} from "@/libs/stores/SocketStore";
import {FormatToObject, FormatToSocketResponse} from "@/helpers/socketMessageHandler";
import {toast} from "sonner";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {RemoveConnectionService} from "@/services/connectionInfosManager";
import {RootState} from "@/libs/redux";
import {useRemoveConnection} from "@/hook/useRemoveConnection";

let firstLoad = true
export const useWebSocketConnection = (
    socketUrl: string,
    roomId: string,
    playerIndex: 1 | 2,
    inGameInfo: InGameOnlineState | null | undefined,
) => {
    const { destroyConnection } = useRemoveConnection(roomId, playerIndex)

    const dispatch = useDispatch()
    const socketRef = useRef<WebSocket | null>(null) // Garante que a instância seja única e persistente
    const existingSocketInStore = useSelector((state: RootState) => state.socketState.value)

    useEffect(() => {
        if (!roomId || !inGameInfo) return

        // if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN){
        //     console.log("Tentou conectar, mas já está. Cancelando...")
        //     return
        // }

        // Criar a conexão WebSocket
        const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
        socketRef.current = ws

        // se já tem, usar esse
        if (existingSocketInStore && existingSocketInStore.readyState === WebSocket.OPEN) {
            socketRef.current = existingSocketInStore;
            return;
        }

        dispatch(setSocket(socketRef.current)) // Armazena no Redux ou use outro estado global/local

        // Configurar eventos
        ws.onmessage = (event) => {
            try {
                const message = event.data
                const socketResponseObject = FormatToSocketResponse(message)
                if (!socketResponseObject) return toast.error("Can't receive state")

                if (socketResponseObject.isError || !socketResponseObject.inGameState)
                    return toast.error(socketResponseObject.errorMessage)

                dispatch(setFullInGameState(socketResponseObject.inGameState))
            } catch (error) {
                console.error("Erro ao receber infos: ", error)
            }
        }

        ws.onclose = async () => {
            await destroyConnection()
            console.log("Connection closed and data removed")
            // await RemoveConnectionService(playerIndex ?? 1, roomId)
        }

        ws.onerror = (e) => {
            console.log("[FECHADO] Erro no socket: ")
            console.error(e)
            ws.close();
        }

        // Cleanup na desmontagem
        return () => {
            if (typeof window === "undefined") {
                console.log("Nem carregou, fechando componente")
                return
            }
            if(!roomId || !inGameInfo) {
            // if(!roomId || !inGameInfo || firstLoad) {
                firstLoad = true
            }

            // if (socketRef.current && socketRef.current?.readyState === WebSocket.OPEN) {
            //     socketRef.current.close()
            // }

            // ws.close()
        }
    }, [])
    // }, [socketUrl, roomId, inGameInfo, playerIndex, dispatch])

    return {socket: socketRef.current} // Retorna a instância do WebSocket se necessário
}
