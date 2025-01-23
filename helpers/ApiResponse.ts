import {isOfErroResponseType} from "@/helpers/TypeCheck";

/*
* * Success -> só passar a resposta
* * Error -> Passar true (2°) e o erro inteiro, mostro no console
* */
export const ApiResponse = <T>(response: T, isError: boolean = false, error?: any, id: string = "UNKNOWN") => {
    // console.log(error);
    // console.log("Axios Error up " + id)

    if (error?.response != null) {
        if (error?.response?.data && isOfErroResponseType(error.response.data)) {
            return {
                isError,
                response: error.response.data.message
            }
        }
    }

    return {
        isError: isError ?? false,
        response,
    }
}
