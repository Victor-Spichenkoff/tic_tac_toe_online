import {ErrorResponse} from "@/types/responsesTypes";

export function isOfErroResponseType<T>(objToTest: any): objToTest is ErrorResponse {
    try {
        const n: ErrorResponse = objToTest
        return true
    } catch {
        return false
    }
}
// function isOfType<T>(obj: unknown, type: { new (...args: any[]): T }): obj is T {
//     return obj instanceof type
// }
