import {useSelector} from "react-redux";
import {RootState} from "@/libs/redux";
import {Button} from "@/components/template/Button";
import {useRouter} from "next/navigation";

export const RestartMatchButton = () => {
    // const socket = useSelector((state: RootState) => state.socketState.value)
    const router = useRouter()

    let message = ""

    const handleRestartButton = () => {}

    const handleReturnHomeButton = () => router.push("/")

    return (
        <div className={""}>
            <div>{message}</div>
            <Button label={"Again"} onClick={handleRestartButton}/>
            <Button label={"Home"} onClick={handleReturnHomeButton}/>
        </div>
    )
}
