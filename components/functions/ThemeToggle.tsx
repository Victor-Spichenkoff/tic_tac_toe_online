"use client"

import {useState, useEffect} from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {getStorageTheme, storageTheme} from "@/libs/localStorage/theme";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)


    useEffect(() => {
            const currentTheme = getStorageTheme()

            const root = window.document.documentElement
            // const initialTheme = root.classList.contains("dark")
            setIsDark(currentTheme == "dark")

            if (currentTheme === "dark")
                root.classList.add("dark")
        }, [])


    const toggleTheme = () => {
        const root = window.document.documentElement
        if (isDark) {
            root.classList.remove("dark")
            storageTheme("light")
        } else {
            root.classList.add("dark")
            storageTheme("dark")
        }
        setIsDark(!isDark)
    }

    return (
        <button
            onClick={toggleTheme}
            className={`px-4 py-2 ${isDark ? "bg-lightBackground" : "bg-darkBackground"} rounded dark:bg-gray-800`}
        >
            {isDark ? (
                <FontAwesomeIcon icon={faSun} className={" text-yellow-500"}/>
            ) : (
                <FontAwesomeIcon icon={faMoon} className={'text-white'}/>
            )}
            {/*{isDark ? "Tema Claro" : "Tema Escuro"}*/}
        </button>
    )
}
