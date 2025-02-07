import {TestApiWorkService} from "@/services/GeneralServices";
import {toast} from "sonner";
import {Button} from "@/components/template/Button";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getStoreLastUsedTime, storeLastUsedTime} from "@/libs/localStorage/serverTime";

interface ConnectionTestProps {
    setNavigationLock: (n: boolean) => void
}

let attempts = 0
/*
* setNavigationLock → true _> não navega para outras áreas
* */
export const ConnectionTest = ({setNavigationLock}: ConnectionTestProps) => {
    const router = useRouter()
    const [errorToastId, setErrorToastId] = useState<string | number | null>(null)

    const handleCancel = () => {
        setNavigationLock(true);
        toast.dismiss(errorToastId ?? 1)
        toast.warning("Cancelled")
    }
    const actionArea = (
        <div className={"flex gap-x-2 min-w-fit"}>
            <Button
                label={"Play with Bot?"}
                onClick={() => router.push("/bot")}
                className={"text-sm"}
            />
            <Button
                label={"Cancel"}
                onClick={handleCancel}
                className={"text-sm border-2 border-red-600 hover:bg-red-700" +
                    "dark:border-2 dark:border-red-600 dark:hover:bg-red-700"}
            />
        </div>
    )

    const handleTestAgainClick = async () => {
        if(attempts > 12) {
            toast.error("Server didn't started, sorry!")
            return true
        }

        // não precisa carregar tudo
        const oldTime = getStoreLastUsedTime() ?? 1
        const now = Date.now()

        if (oldTime + 1000 * 60 * 10 > now) {
            setNavigationLock(false)
            return true
        }

        const res = await TestApiWorkService()

        if (res.isError)
            return false


        storeLastUsedTime(now)
        setNavigationLock(false)


        toast.info("Server is ready!")
        return true
    }

    const TryAgain = async () => {
        attempts++

        const success = await handleTestAgainClick()

        if (success) {
            toast.dismiss(errorToastId ?? 1)
            return
        }

        setTimeout(async () => {
            await TryAgain()
        }, 5000)
    }

    useEffect(() => {
        if(process.env.NODE_ENV == "development") {
            setNavigationLock(false)
            return
        }

        (async () => {
            const success = await handleTestAgainClick()

            // caso dê errado
            if (success)
                return


            const toastErrorID = toast.info("Server starting, please wait 1 minute...", {
                action: actionArea,
                duration: 60_000,
            })

            setErrorToastId(toastErrorID)

            // recursivo
            setTimeout(() => TryAgain(), 5000)
        })()
    }, [])

    return null
}
