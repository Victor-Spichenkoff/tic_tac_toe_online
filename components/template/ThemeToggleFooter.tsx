import ThemeToggle from "@/components/functions/ThemeToggle";
import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useRouter} from "next/navigation";

interface ThemeToggleFooterProps {
    children?: React.ReactNode
    useReturnHomeButton?: boolean
    usePopReturnHomeButton?: boolean
    onReturnClick?: () => void
}

export const ThemeToggleFooter = ({children, useReturnHomeButton,usePopReturnHomeButton,onReturnClick}: ThemeToggleFooterProps) => {
    const router = useRouter()

    const handleReturnButton = () => {
        if(onReturnClick)
            onReturnClick()

        if(usePopReturnHomeButton)
            router.back()
        else
            router.push("/")
    }

    return (
        <div className={"absolute bottom-4 right-4 flex gap-x-4"}>
            {(useReturnHomeButton || usePopReturnHomeButton) && (
                <Button onClick={handleReturnButton} className={"h-[40px] inline-block"}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Button>
            )}
            {children}
            <ThemeToggle/>
        </div>
    )
}
