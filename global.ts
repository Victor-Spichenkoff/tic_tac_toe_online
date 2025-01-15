export const apiUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "" 

export const socketUrl = process.env.NODE_ENV == "development" ? "ws://localhost:2006" : "" 