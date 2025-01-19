"use client"

import {api} from "@/libs/axios";
import {ApiResponse} from "@/helpers/ApiResponse";

export const getIsFullForRoom = async (roomId: string) => {
    try {
        const res = await api(`/room/isFull/${roomId}`)
        return  ApiResponse(!!res.data)
    }
    catch (error) {
        console.log(error)
        return ApiResponse( "Server Error", true, error)
    }
}
