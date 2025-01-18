import ThemeToggle from "@/components/functions/ThemeToggle";

interface ThemeToggleFooterProps {
    children?: React.ReactNode
}

export const ThemeToggleFooter = ({children}: ThemeToggleFooterProps) => {
    return (
        <div className={"absolute bottom-4 right-4 flex gap-x-4"}>
            {children}
            <ThemeToggle/>
        </div>
    )
}
