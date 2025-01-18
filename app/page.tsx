"use client"

import {Chat} from "@/components/functions/Chat"
import {Square} from "@/components/functions/Square";
import {SquareOptions} from "@/types/onlineInfos";
import ThemeToggle from "@/components/functions/ThemeToggle";
import {useState} from "react";
import {Header} from "@/components/template/Header";
import {Button} from "@/components/template/Button";
import {useRouter} from "next/navigation";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";

export default function Home() {
    const values: SquareOptions[] = [1, 0, 1, 0, 2, 2, 2, 0, 1]
    const [onlineGameMode, setOnlineGameMode] = useState(false)
    const [selectionMode, setSelectionMode] = useState(true)
    const router = useRouter()

    const handleOnlineCreate = ()=> {
        router.push("/create_connection")
        //TODO -> chamar a api, pegar a res e criar
    }

    return (
        <div className={'flex justify-center items-center'}>
            {selectionMode && (
                <div className={"h-screen flex flex-col items-center justify-center gap-y-40"}>
                   <Header label={"Mode Choose"}/>

                    <div className={"flex justify-between gap-x-4"}>
                        <Button onClick={handleOnlineCreate}>Create</Button>
                        <Button onClick={()=>router.push("/insert_connection")}>Join</Button>
                        <Button >Local</Button>
                        <Button >Bot</Button>
                    </div>
                </div>
            )}


            <div className={"grid grid-cols-3"}>
                {onlineGameMode && (
                    values.map((value, i) => (
                        <Square value={value} index={i} key={i}/>
                    ))
                )}
            </div>
            <ThemeToggleFooter />
        </div>
    )
}
