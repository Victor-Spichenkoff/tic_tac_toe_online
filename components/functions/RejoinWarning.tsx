import {Loading} from "@/components/template/Loading"
import {Button} from "@/components/template/Button"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {toast} from "sonner"
import {joinRoomService} from "@/services/connectionInfosManager"
import {setFullRoomState, setRoomStateToNull} from "@/libs/stores/RoomState"
import {setFullInGameState, setInGameStateToNull} from "@/libs/stores/inGameOnlineStore"
import {useDispatch, useSelector} from "react-redux"
import {getStorePlayerInfo, storePlayerInfo} from "@/libs/localStorage/playerInfos"
import {TransitionStartFunction, useState} from "react"
import {useRouter} from "next/navigation"
import {setFullPlayerInfos} from "@/libs/stores/PlayerInfos";
import {useWebSocketConnection} from "@/hook/useWebSocketConnection";
import {socketUrl} from "@/global";
import {RootState} from "@/libs/redux";
import {setSocket} from "@/libs/stores/SocketStore";


interface RejoinWarningProps {
    roomId: string
    startTransition: TransitionStartFunction
    isLoading: boolean
    orderReconnection?: () => any
}


export const RejoinWarning = ({roomId, startTransition, isLoading, orderReconnection}: RejoinWarningProps) => {
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const playerInfos = getStorePlayerInfo()
    const router = useRouter()
    const dispatch = useDispatch()
    const [canLoadSocket, setCanLoadSocket] = useState(false)
    const socket = useSelector((state: RootState) => state.socketState.value)

    const preClear = () => {
        dispatch(setRoomStateToNull())
        dispatch(setInGameStateToNull())
        dispatch(setFullPlayerInfos(null))

    }

    const handleReloadDataClick = async () => {
        if (!playerInfos || !roomId) {
            toast.error("No player info! You need to rejoin...", {duration: 3000})
            return setTimeout(() => router.push("/"), 1000)
        }
        startTransition(async () => {
            const res = await joinRoomService(roomId)

            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }

            // tentar reconectar o socket
            if (!res.response?.roomState || !res.response.inGameState) {
                toast.error("Game state mismatch. Please rejoin the game.")
                // se estiver com problema, descomentar, mais restrito que o outro
                toast.error("Room information conflict")
                return router.push("/")
            }
            if (!res.response) {
                toast.error("Room information conflict")
                return
            }


            dispatch(setFullRoomState(res.response?.roomState))
            dispatch(setFullInGameState(res.response?.inGameState))
            dispatch(setFullPlayerInfos({
                playerIndex: res.response.playerIndex,
            }))
            storePlayerInfo({
                playerIndex: res.response?.playerIndex,
            })

            setCanLoadSocket(true)
            toast.info("Restoring game state...")
        })
    }

    if(canLoadSocket && orderReconnection)
        orderReconnection()


    return (
        <div className={"h-screen w-screen flex flex-col justify-center items-center gap-y-14"}>
            {isLoading && <Loading/>}
            <div className={"text-9xl text-red-600"}>No data</div>
            <Button onClick={() => handleReloadDataClick()}>Try to Reload?</Button>
            <ThemeToggleFooter useReturnHomeButton>
            </ThemeToggleFooter>
        </div>
    )
}
