"use client"
import {SquareOptions} from "@/types/onlineInfos";
import {useEffect, useState} from "react";
import {Header} from "@/components/template/Header";
import {Button} from "@/components/template/Button";
import {useRouter} from "next/navigation";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import { toast } from "sonner";
import {ConnectionTest} from "@/components/functions/ConnectionTest";
import {setFullInGameBotState} from "@/libs/stores/inGameOfflineStore";
import {getResetLocalState} from "@/helpers/Bot";
import {useDispatch} from "react-redux";
export default function Home() {
    const router = useRouter()
    const [navigationLock, setNavigationLock] = useState(true)
    const dispatch = useDispatch()

    const handleOnlineCreate = ()=> {
        if(navigationLock) return toast.warning("Wait for the server to start")
        router.push("/create_connection")
    }

    const handleOnlineJoin = ()=> {
        if(navigationLock) return toast.warning("Wait for the server to start")
        router.push("/insert_connection")
    }

    useEffect(() => {
        dispatch(setFullInGameBotState(getResetLocalState()))
    }, [])


    return (
        <div className={'flex justify-center items-center'}>
            { navigationLock && <ConnectionTest setNavigationLock={setNavigationLock} /> }
                <div className={"h-screen flex flex-col items-center justify-center gap-y-40"}>
                   <Header label={"Mode Choose"}/>

                    <div className={"flex justify-between gap-x-4"}>
                        <Button onClick={handleOnlineCreate}>Create</Button>
                        <Button onClick={handleOnlineJoin}>Join</Button>
                        <Button onClick={() => router.push("/local/bot")}>Bot</Button>
                        <Button onClick={() => router.push("/local/player")}>Local</Button>
                    </div>
                </div>
            <ThemeToggleFooter />
        </div>
    )
}
