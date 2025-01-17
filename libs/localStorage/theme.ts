import {theme_key} from "@/global";

export const storageTheme = (theme: "dark" | "light") => {
    localStorage.setItem(theme_key, theme)
}


export const getStorageTheme = () => {
    const res = String(localStorage.getItem(theme_key))

    if (res !== "light" && res !== "dark")
        return "light"

    return res
}
