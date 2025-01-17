import {ReactNode} from "react";

interface ButtonProps {
    children?: ReactNode
    className?: string
    label?: string
    onClick?: () => void

}

export const Button = ({label,onClick,children,className}: ButtonProps) => {
    return (
        <button className={"border-2 border-yellow-300 dark:border-lightCircle px-3 py-1 rounded-lg hover:text-slate-900 hover:bg-yellow-00 dark:hover:bg-sky-500 inline-block" + className}>
            {children && children}
            {label && !children && label}
        </button>
    )
}
