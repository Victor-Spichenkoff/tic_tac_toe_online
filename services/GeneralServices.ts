import {HandleApiCall} from "@/helpers/ApiResponse";
import {api} from "@/libs/axios";
import {FullOnlineInfos} from "@/types/onlineInfos";

export const TestApiWorkService = async () => {
    return await HandleApiCall(async () => {
        const res = await api(`/teste`, {
            timeout: 6_000
        })
        return res.data as string
    })
}
