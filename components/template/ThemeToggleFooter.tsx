import ThemeToggle from "@/components/functions/ThemeToggle";
import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useRouter} from "next/navigation";

interface ThemeToggleFooterProps {
    children?: React.ReactNode
    useReturnHomeButton?: boolean
}

export const ThemeToggleFooter = ({children, useReturnHomeButton}: ThemeToggleFooterProps) => {
    const router = useRouter()

    return (
        <div className={"absolute bottom-4 right-4 flex gap-x-4"}>
            {useReturnHomeButton && (
                <Button onClick={() => router.push("/")} className={"h-[40px] inline-block"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            )}
            {children}
            <ThemeToggle/>
        </div>
    )
}
