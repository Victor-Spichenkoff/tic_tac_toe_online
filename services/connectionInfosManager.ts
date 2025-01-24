"use client"

import {api} from "@/libs/axios";
import {ApiResponse, HandleApiCall} from "@/helpers/ApiResponse";
import {FullOnlineInfos, FullOnlineInfosWithPlayerIndex} from "@/types/onlineInfos";

export const getIsFullForRoom = async (roomId: string) => {
    try {
        const res = await api(`/room/isFull/${roomId}`)
        return ApiResponse(!!res.data)
    } catch (error) {
        console.log(error)
        return ApiResponse("Server Error", true, error)
    }
}

export const joinRoomService = async (roomId: string) => {
    const getInfos = async () => {
        const res = await api.post(`/join/${roomId}`)
        return res.data as FullOnlineInfosWithPlayerIndex//erro aqui
    }

    return await HandleApiCall(getInfos)
}


export const createRoomService = async (roomId: string) => {
    const data = await HandleApiCall(async () => {
        const res = await api.post(`/create/${roomId}`)
        return res.data as FullOnlineInfos
    })

    return data
}


// export const createRoomService = async (roomId: string) => {
//     try {
//         const res = await api.post(`/create/${roomId}`)
//
//         const data: FullOnlineInfos = res.data
//         return ApiResponse(data)
//     }
//     catch (error) {
//         console.error(error)
//         return ApiResponse( "Server Error", true, error, "create room")
//     }
// }


// export const joinRoomService = async (roomId: string) => {
//     try {
//         const res = await api.post(`/join/${roomId}`)
//
//         const data: FullOnlineInfos = res.data
//         return ApiResponse(data)
//     }
//     catch (error) {
//         console.error(error)
//         return ApiResponse( "Server Error", true, error, "create room")
//     }
// }



