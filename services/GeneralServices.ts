import {HandleApiCall} from "@/helpers/ApiResponse";
import {api} from "@/libs/axios";

export const TestApiWorkService = async () => {
    return await HandleApiCall(async () => {
        const res = await api(`/teste`, {
            timeout: 8_000
        })
        return res.data as string
    })
}
