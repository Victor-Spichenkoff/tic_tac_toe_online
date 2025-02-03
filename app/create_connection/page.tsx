"use client"

import {Input} from "@/components/template/Input"
import {startTransition, useEffect, useState, useTransition} from "react"
import {Button} from "@/components/template/Button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBackward} from "@fortawesome/free-solid-svg-icons"
import {useRouter} from "next/navigation"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {toast} from 'sonner'
import {Header} from "@/components/template/Header"
import {socketUrl} from "@/global"
import {createRoomService, getIsFullForRoom} from "@/services/connectionInfosManager";
import {api} from "@/libs/axios";
import axios from "axios";
import {ApiResponse} from "@/helpers/ApiResponse";
import {Loading} from "@/components/template/Loading";
import {setFullRoomState} from "@/libs/stores/RoomState";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {useDispatch} from "react-redux";
import {storePlayerInfo} from "@/libs/localStorage/playerInfos";
import {setFullPlayerInfos} from "@/libs/stores/PlayerInfos";
import {useCheckConnectionAndRedirect} from "@/hook/useCheckConnection";

export default function CreateConnectionScreen() {
    useCheckConnectionAndRedirect()
    const [roomId, SetRoomId] = useState("")
    const router = useRouter()
    const dispatch = useDispatch()
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [isLoading, setIsLoading] = useTransition()

    const CreateRoom = async () => {
        if (!roomId)
            return toast.error("Invalid room id")

        startTransition(async () => {
            let res = await createRoomService(roomId)
            if (res.isError) {
                toast.error(res.errorMessage)
                // toast.error(res.response)
                return
            }

            if (res.response?.roomState && res.response.inGameState) {
                dispatch(setFullInGameState(res.response.inGameState))
                dispatch(setFullRoomState(res.response.roomState))
            }

            dispatch(setFullPlayerInfos({
                playerIndex: 1
            }))

            storePlayerInfo({
                playerIndex: 1
            })

            toast.success("Room created!")


            setTimeout(() => router.push("/online/" + res.response?.roomState.roomId), 500)
        })


    }

    return (
        <div className={"flex flex-col items-center h-screen"}>
            {isLoading && <Loading/>}

            <Header label={"Create a game"} className={"mt-4"}/>
            <div className={"flex flex-col items-center justify-center flex-1 -mt-32"}>
                {/* Inputs */}
                <div>
                    <Input value={roomId} setValue={SetRoomId} label={"Room ID"} onEnter={CreateRoom}/>
                </div>
                <Button label={"Create room"} onClick={CreateRoom} className={"mt-4"}/>
            </div>


            <ThemeToggleFooter useReturnHomeButton/>
        </div>
    )
}
