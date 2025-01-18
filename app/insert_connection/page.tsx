"use client"

import {Input} from "@/components/template/Input";
import {useState} from "react";
import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import {toast} from 'sonner'
import {Header} from "@/components/template/Header";

export default function InsertConnectionScreen() {
    const [roomId, SetRoomId] = useState("")
    const router = useRouter();

    return (
        <div className={"flex flex-col items-center justify-center h-screen"}>
            <Header label={"Connect to a game"} className={"mt-4"}/>
            <div className={"flex flex-col items-center justify-center flex-1 -mt-32"}>
                {/* Inputs */}
                <div>
                    <Input value={roomId} setValue={SetRoomId} label={"Room ID"}/>
                </div>
            </div>

            <ThemeToggleFooter>
                <Button onClick={() => router.push("/")} className={"h-full"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            </ThemeToggleFooter>
        </div>
    )
}
