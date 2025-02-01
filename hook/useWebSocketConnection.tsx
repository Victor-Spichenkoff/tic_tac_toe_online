import {useEffect, useRef} from "react"
import {useDispatch} from "react-redux"
import {InGameOnlineState} from "@/types/onlineInfos"
import {setSocket} from "@/libs/stores/SocketStore";
import {FormatToObject, FormatToSocketResponse} from "@/helpers/socketMessageHandler";
import {toast} from "sonner";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {RemoveConnectionService} from "@/services/connectionInfosManager";

let firstLoad = true
export const useWebSocketConnection = (
    socketUrl: string,
    roomId: string,
    playerIndex: 1 | 2,
    inGameInfo: InGameOnlineState | null | undefined,
) => {

    const dispatch = useDispatch()
    const socketRef = useRef<WebSocket | null>(null) // Garante que a instância seja única e persistente

    useEffect(() => {
        if (!roomId || !inGameInfo) return
        if (typeof window === "undefined") {
            console.log("Nem carregou, não conectando...")
            return
        }

        // Criar a conexão WebSocket
        const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
        socketRef.current = ws
        dispatch(setSocket(ws)) // Armazena no Redux ou use outro estado global/local

        // Configurar eventos
        ws.onmessage = (event) => {
            try {
                const message = event.data
                const socketResponseObject = FormatToSocketResponse(message)
                console.log("Recebido: ", socketResponseObject)
                if (!socketResponseObject) return toast.error("Can't receive state")

                if (socketResponseObject.isError || !socketResponseObject.inGameState)
                    return toast.error(socketResponseObject.errorMessage)

                dispatch(setFullInGameState(socketResponseObject.inGameState))
            } catch (error) {
                console.error("Erro ao receber infos: ", error)
            }
        }

        ws.onclose = async () => {
            console.log("Connection closed")
            // await RemoveConnectionService(playerIndex ?? 1, roomId)
        }

        ws.onerror = (e) => {
            console.log("Erro no socket: ")
            console.error(e)
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
                return console.log("não vai desconectar nada!")
            }

            ws.close()
        }
    }, [])
    // }, [socketUrl, roomId, inGameInfo, playerIndex, dispatch])

    return {socket: socketRef.current} // Retorna a instância do WebSocket se necessário
}
