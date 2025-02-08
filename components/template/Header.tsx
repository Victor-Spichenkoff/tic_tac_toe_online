interface HeaderProps {
    label: string;
    className?: string
}

export const Header = ({label, className}:HeaderProps) => {
    return (
        <header className={"mt-4 text-center font-hand_title text-4xl text-whit inline-block " + className}>
            {label}
        </header>
    )
}
