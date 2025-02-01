"use client"
import {SquareOptions} from "@/types/onlineInfos";
import {useState} from "react";
import {Header} from "@/components/template/Header";
import {Button} from "@/components/template/Button";
import {useRouter} from "next/navigation";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import { toast } from "sonner";
export default function Home() {
    const router = useRouter()

    const handleOnlineCreate = ()=> {
        router.push("/create_connection")
    }

    const handleNotBuildClick = () => {
        toast.info("Man Working...")
    }

    return (
        <div className={'flex justify-center items-center'}>
            
                <div className={"h-screen flex flex-col items-center justify-center gap-y-40"}>
                   <Header label={"Mode Choose"}/>

                    <div className={"flex justify-between gap-x-4"}>
                        <Button onClick={handleOnlineCreate}>Create</Button>
                        <Button onClick={()=>router.push("/insert_connection")}>Join</Button>
                        <Button onClick={handleNotBuildClick}>Local</Button>
                        <Button onClick={handleNotBuildClick}>Bot</Button>
                    </div>
                </div>
            <ThemeToggleFooter />
        </div>
    )
}
