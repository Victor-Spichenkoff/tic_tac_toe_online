import {useState} from "react";
import {FontAwesomeIcon,} from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {Button} from "@/components/template/Button";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useRouter} from "next/navigation";
import ThemeToggle from "@/components/functions/ThemeToggle";

interface MobileMenuProps {
    isPopReturn?: boolean
    hiddeReturn?: boolean
}

export const MobileMenu = ({isPopReturn, hiddeReturn}: MobileMenuProps) => {
    const [show, setShow] = useState(false)
    const [isFirst, setIsFirst] = useState(true)

    const router = useRouter()

    const handleReturnButton = () => {
        if (isPopReturn)
            router.back()
        else
            router.push("/")
    }


    const handleMenuClick = () => {
        setShow(!show)
        if (isFirst)
            setIsFirst(false)
    }

    return (
        <div className={`absolute right-4 top-4  lg:hidden`}>
            <div>
                <button
                    onClick={handleMenuClick}
                    className={`flex justify-center items-center z-40 border-0 border-gray-200 dark:border-gray-500 rounded-full p-2 hover:scale-105`}>
                    <FontAwesomeIcon icon={faBars} className={"text-2xl border-gray-200 dark:text-gray-500"}/>
                </button>
                <div
                    className={`${isFirst && "hidden"} ${!show ? "fade-out" : "fade-in"} fixed top-0 right-0 pl-20 h-full flex flex-col 
                        l abg-lightMenu dark:bg-darkMenu  border-l border-white/40
                        flex flex-row-reverse z-40`}>
                    <div className={"h-full flex flex-col justify-between items-end pr-4 py-4 opacity-100"}>
                        <div>
                            <button
                                onClick={handleMenuClick}
                                className={`w-fit border-0 border-gray-200 dark:border-gray-500 rounded-full p-2 hover:scale-105`}>
                                <FontAwesomeIcon icon={faBars}
                                                 className={"text-2xl border-gray-200 dark:text-gray-500"}/>
                            </button>

                        </div>
                        <div className={"flex flex-col items-center gap-y-8"}>

                            <ThemeToggle/>
                            {!hiddeReturn && (
                                <div>
                                    <Button onClick={handleReturnButton} className={"h-[40px] inline-block"}>
                                        <FontAwesomeIcon icon={faArrowLeft}/>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {show && (
                    <div className={"fade-in fixed top-0 left-0 w-screen h-screen bg-black/50 z-30"}
                         onClick={() => setShow(false)}></div>
                )}
            </div>
        </div>
    )
}
