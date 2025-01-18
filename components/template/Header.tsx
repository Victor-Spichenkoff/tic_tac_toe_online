interface HeaderProps {
    label: string;
    className?: string
}

export const Header = ({label, className}:HeaderProps) => {
    return (
        <header className={"text-center font-hand_title text-3xl text-whit inline-block " + className}>
            {label}
        </header>
    )
}
