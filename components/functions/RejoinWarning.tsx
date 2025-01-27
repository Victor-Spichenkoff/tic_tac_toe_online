import {Loading} from "@/components/template/Loading"
import {Button} from "@/components/template/Button"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {toast} from "sonner"
import {joinRoomService} from "@/services/connectionInfosManager"
import {setFullRoomState} from "@/libs/stores/RoomState"
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore"
import {useDispatch} from "react-redux"
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos"
import {TransitionStartFunction} from "react"
import {useRouter} from "next/navigation"


interface RejoinWarningProps {
    roomId: string
    startTransition:  TransitionStartFunction
    isLoading: boolean
}



export const RejoinWarning = ({ roomId,startTransition, isLoading }: RejoinWarningProps) => {
    const playerInfos = getStorePlayerInfo()
    const router = useRouter()
    const dispatch = useDispatch()

    const handleReloadDataClick = async () => {
        if (!playerInfos || !roomId) {
            toast.error("No player info! You need to rejoin...", {duration: 3000})
            return setTimeout(() => router.push("/"), 1000)
        }
        startTransition(async () => {
            const res = await joinRoomService(roomId)

            if (res.isError) {
                toast.error(res.errorMessage)
            }

            if (!res.response?.roomState || !res.response.inGameState) {
                toast.error("Room infomation conflict")
                return
            }

            dispatch(setFullRoomState(res.response?.roomState))
            dispatch(setFullInGameState(res.response?.inGameState))

            toast.info("Restoring game state...")
        })
    }

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
