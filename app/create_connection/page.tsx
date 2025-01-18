"use client"

import {Input} from "@/components/template/Input";
import {useState} from "react";
import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import {toast} from 'sonner'
import {Header} from "@/components/template/Header";

export default function CreateConnectionScreen() {
    const [roomId, SetRoomId] = useState("")
    const router = useRouter();

    //1 TODO 1-> criar 1 sala com o back
    const CreateRoom = () => {

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
