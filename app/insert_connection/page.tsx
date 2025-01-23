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

export default function CreateConnectionScreen() {
    const [roomId, SetRoomId] = useState("")
    const router = useRouter()
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [isLoading, setIsLoading] = useTransition()

    //TODO -> não reconhece que os que estão conectados


    //1 TODO 1-> criar 1 sala com o back
    const CreateRoom = async () => {
        if (!roomId)
            return toast.error("Invalid room id")

        startTransition(async () => {
            let res = await joinRoomService(roomId)
            if (res.isError) {
                toast.error(res.response)
                return
            }

            toast.success("Room created!")

            setTimeout(()=> router.push("/"), 1000)
        })


    }

    return (
        <div className={"flex flex-col items-center h-screen"}>
            { isLoading && <Loading /> }

            <Header label={"Join a game"} className={"mt-4"}/>
            <div className={"flex flex-col items-center justify-center flex-1 -mt-32"}>
                {/* Inputs */}
                <div>
                    <Input value={roomId} setValue={SetRoomId} label={"Room ID"} onEnter={CreateRoom}/>
                </div>
                <Button label={"Join room"} onClick={CreateRoom} className={"mt-4"}/>
            </div>


            <ThemeToggleFooter>
                <Button onClick={() => router.push("/")} className={"h-full"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            </ThemeToggleFooter>
        </div>
    )
}
