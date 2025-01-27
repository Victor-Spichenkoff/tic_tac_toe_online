import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import {InGameOnlineState} from "@/types/onlineInfos"
import {setSocket} from "@/libs/stores/SocketStore";
import {FormatToObject} from "@/helpers/socketMessageHandler";
import {toast} from "sonner";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {RemoveConnectionService} from "@/services/connectionInfosManager";



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
        const inObject = FormatToObject(message)
        console.log("Recebido: ", inObject)
        if (!inObject) return toast.error("Can't receive state")

        dispatch(setFullInGameState(inObject))
      } catch (error) {
        console.error("Erro ao receber infos: ", error)
      }
    }

    ws.onclose = async () => {
      console.log("Connection closed")
      await RemoveConnectionService(playerIndex ?? 1, roomId)
    }

    // Cleanup na desmontagem
    return () => {
      if (typeof window === "undefined") {
        console.log("Nem carregou, fechando componente")
        return
      }
      console.log("Component return, gonna close")
      ws.close()
    }
  }, [socketUrl, roomId, inGameInfo, playerIndex, dispatch])

  return { socket: socketRef.current } // Retorna a instância do WebSocket se necessário
}
