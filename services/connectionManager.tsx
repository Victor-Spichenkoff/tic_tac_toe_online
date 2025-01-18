"use client"

import {api} from "@/libs/axios";

export const getIsFullForRoom = async (roomId: string) => {
    try {
        const res = await api(`/room/isFull/${roomId}`)
        return res.data
    }
    catch (error) {
        console.error(error)
        console.error("Erro no axios up")
    }
}
