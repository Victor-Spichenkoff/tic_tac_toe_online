import {isOfErroResponseType} from "@/helpers/TypeCheck"
import axios from "axios"

/*
* * Success -> só passar a resposta
* * Error -> Passar true (2°) e o erro inteiro, mostro no console
* */
export const ApiResponse = <T>(response: T, isError: boolean = false, error?: any, id: string = "UNKNOWN") => {

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


/*
* Passe uma call back
* Ele pega o res.data e retorna em response
* */
export const HandleApiCall = async <T>(
    apiCall: () => Promise<T> // Função que faz a chamada da API
): Promise<{
    isError: boolean
    response: T | null
    errorMessage?: string
    error?: any
}> => {
    try {
        const response = await apiCall() // Executa a função passada
        return {
            isError: false,
            response: response, // Dados da API
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API Error:", error) // Mostra o erro completo no console

            // Verifica se a resposta do erro segue o formato esperado
            if (error.response?.data && isOfErroResponseType(error.response.data)) {
                return {
                    isError: true,
                    response: null,
                    errorMessage: error.response.data.message, // Mensagem do erro
                    error: error.response.data, // Detalhes do erro
                }
            }
        }

        // Caso o erro não seja um AxiosError ou não tenha o formato esperado
        console.error("Unexpected Error:", error)
        return {
            isError: true,
            response: null,
            errorMessage: "An unexpected error occurred.",
            error: error,
        }
    }
}
