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
import {createRoomService, getIsFullForRoom, joinRoomService} from "@/services/connectionInfosManager";
import {api} from "@/libs/axios";
import axios from "axios";
import {ApiResponse} from "@/helpers/ApiResponse";
import {Loading} from "@/components/template/Loading";
import {useDispatch} from "react-redux";
import {setFullRoomState} from "@/libs/stores/RoomState";
import {setFullInGameState} from "@/libs/stores/inGameOnlineStore";
import {storePlayerInfo} from "@/libs/localStorage/playerInfos";
import {setFullPlayerInfos} from "@/libs/stores/PlayerInfos";
import {useCheckConnectionAndRedirect} from "@/hook/useCheckConnection";

export default function CreateConnectionScreen() {
    useCheckConnectionAndRedirect()

    const [roomId, SetRoomId] = useState("")
    const router = useRouter()
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [isLoading, setIsLoading] = useTransition()
    const dispatch = useDispatch()

    const JoinRoom = async () => {
        if (!roomId)
            return toast.error("Invalid room id")

        startTransition(async () => {
            let res = await joinRoomService(roomId)
            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }

            if(!res.response?.roomState || !res.response.inGameState) {
                toast.error("Missing data!")
                return
            }

            dispatch(setFullRoomState(res.response.roomState))
            dispatch(setFullInGameState(res.response.inGameState))

            // passar se é o 2 ou reconectou como 1
            dispatch(setFullPlayerInfos({
                playerIndex: res.response.playerIndex
            }))
            storePlayerInfo({
                playerIndex: res.response.playerIndex
            })

            toast.info("Joining room...")

            router.push("/online/"+roomId)
        })
    }

    return (
        <div className={"flex flex-col items-center h-screen"}>
            { isLoading && <Loading /> }

            <Header label={"Join a game"} className={"mt-4"}/>
            <div className={"flex flex-col items-center justify-center flex-1 -mt-32"}>
                {/* Inputs */}
                <div>
                    <Input value={roomId} setValue={SetRoomId} label={"Room ID"} onEnter={JoinRoom}/>
                </div>
                <Button label={"Join room"} onClick={JoinRoom} className={"mt-4"}/>
            </div>


            <ThemeToggleFooter useReturnHomeButton/>
        </div>
    )
}
