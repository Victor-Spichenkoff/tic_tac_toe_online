export const apiUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://tic-tac-toe-online-backend-jjv9.onrender.com"

export const socketUrl = process.env.NODE_ENV == "development" ? "ws://localhost:2006" : "wss://tic-tac-toe-online-backend-jjv9.onrender.com"


export const theme_key = "tic-tac-toe-online_theme"
export const player_info_key = "tic-tac-toe-online_player_info"
