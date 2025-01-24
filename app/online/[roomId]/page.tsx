"use client"

import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {Header} from "@/components/template/Header";
import {Square} from "@/components/functions/Square";
import {useEffect, useState, useTransition} from "react";
import {getIsFullForRoom} from "@/services/connectionInfosManager";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {getStorePlayerInfo} from "@/libs/localStorage/playerInfos";
import {ThemeToggleFooter} from "@/components/template/ThemeToggleFooter";
import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {Loading} from "@/components/template/Loading";
import {OnlineFullGame} from "@/components/functions/OnlineFullGame";

export default function OnlineGameRoom() {
    //todo -> pegar os dados e só exigit. Vão ficar localmente
    const params = useParams()
    const roomId = typeof params.roomId == "object" ? params.roomId[0] : params.roomId// se não sai string[]
    const router = useRouter()
    const roomInfo = useSelector((state: RootState) => state.roomState.value)
    const inGameInfo = useSelector((state: RootState) => state.inGameState.value)
    const [isGameLoaded, setIsGameLoaded] = useState(false);
    const [isLoading, startTransition] = useTransition()

    const playerIndex = getStorePlayerInfo()

    useEffect(() => {
        if(inGameInfo && roomInfo)
            setIsGameLoaded(true)

        // if(getIsFullForRoom(roomId))

    }, [])


    const handleReloadDataClick = async () => {

    }

    // TODO -> Pegar os dados como um join direto usando o roomId

    if(!isGameLoaded) {
        return (
            <div className={"h-screen w-screen flex flex-col justify-between items-center"}>
                { isLoading && <Loading /> }
                <div className={"text-9xl text-red-600"}>No data</div>
                <Button onClick={() => handleReloadDataClick()}>Try to Reload?</Button>
            </div>
        )
    }


    if(!roomInfo || !inGameInfo || !roomId)
        return null

    return (
        <div className={"flex flex-col justify-between items-center"}>
            <Header label={"room info"}/>
            <div>
                player{playerIndex?.playerIndex.toString() }
            </div>

            <div className={""}>
                <OnlineFullGame roomId={roomId}/>

            </div>
            <Header label={"IN game info"}/>
            <div>
                Vez de: { inGameInfo.isPLayer1Turn ? "player 1" : "player 2" }
            </div>
            <ThemeToggleFooter>
                <Button onClick={() => router.push("/")} className={"h-full"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            </ThemeToggleFooter>
        </div>
    )
}
