import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {getStoreLastUsedTime, storeLastUsedTime} from "@/libs/localStorage/serverTime";
import {TestApiWorkService} from "@/services/GeneralServices";
import {useEffect} from "react";

export const useCheckConnectionAndRedirect = () => {
    const router = useRouter()


    const isConnectionWorking = async () => {
        // não precisa carregar tudo
        const oldTime = getStoreLastUsedTime() ?? 1
        const now = Date.now()

        if (oldTime + 1000 * 60 * 10 > now)
            return true

        const res = await TestApiWorkService()

        if (res.isError)
            return false


        storeLastUsedTime(now)
        return true
    }

    useEffect(() => {
        (async () => {
            const isWorking = await isConnectionWorking()
            if(isWorking) return

            toast.error("Server is not ready!")
            router.push("/")
        })()
    }, [])
}
