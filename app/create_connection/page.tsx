"use client"

import {Input} from "@/components/template/Input"
import {useEffect, useState} from "react"
import {Button} from "@/components/template/Button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBackward} from "@fortawesome/free-solid-svg-icons"
import {useRouter} from "next/navigation"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter"
import {toast} from 'sonner'
import {Header} from "@/components/template/Header"
import {socketUrl} from "@/global"
import {getIsFullForRoom} from "@/services/connectionInfosManager";
import {api} from "@/libs/axios";
import axios from "axios";

export default function CreateConnectionScreen() {
    const [roomId, SetRoomId] = useState("")
    const router = useRouter()
    const [socket, setSocket] = useState<WebSocket | null>(null)

    //TODO -> não reconhece que os que estão conectados

    useEffect(() => {
        const roomId = 17;

        // Conectar ao WebSocket ao carregar o componente
        const ws = new WebSocket(`${socketUrl}/ws?roomId=${roomId}`)
        setSocket(ws)

        ws.onmessage = (event) => {
            const message = event.data
            // setMessages((prev) => [...prev, message])
        }

        ws.onclose = () => {
            console.log("WebSocket disconnected")
        }

        return () => {
            ws.close()
        }
    }, [])

    //1 TODO 1-> criar 1 sala com o back
    const CreateRoom = async () => {
        if(!roomId)
            return toast.error("Invalid room id")

        let res = await axios("http://localhost:2006/Chat/status")

        console.log(res.data)
        const isFull = await getIsFullForRoom(roomId)

        console.log(isFull)

        if(isFull.isError)
            return toast.error(isFull.response)

        if(isFull.response)
            return toast.error("Full room")

        toast.success("Room created!")
    }

    return (
        <div className={"flex flex-col items-center h-screen"}>
            <Header label={"Create a game"} className={"mt-4"}/>
            <div className={"flex flex-col items-center justify-center flex-1 -mt-32"}>
                {/* Inputs */}
                <div>
                    <Input value={roomId} setValue={SetRoomId} label={"Room ID"}/>
                </div>
                <Button label={"Create room"} onClick={()=> CreateRoom()}/>
            </div>


            <ThemeToggleFooter>
                <Button onClick={() => router.push("/")} className={"h-full"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            </ThemeToggleFooter>
        </div>
    )
}
