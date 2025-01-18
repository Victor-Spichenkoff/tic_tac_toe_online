import axios from "axios";
import {apiUrl} from "@/global";

export const api = axios.create({
    baseURL: apiUrl
})
