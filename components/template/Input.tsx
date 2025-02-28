import {Button} from "@/components/template/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";

interface InputProps {
    value: string
    setValue: (value: string) => void
    label?: string
    onEnter?: () => any | Promise<any>
}

export const Input = ({setValue,value,label, onEnter}: InputProps) => {
    const router = useRouter()

    //todo-> enviar a info e verificar se está certo; criar/mostrar msg

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            onEnter()
        }
    }

    return (
        <div>
            <label className={"flex flex-col gap-y-2"}>
                {label}
                <input value={value} onChange={(e) => setValue(e.target.value)}
                    className={'border border-yellow-300 dark:border-lightCircle bg-transparent outline-none focus:border-2 rounded-2xl px-2 py-1'}
                    onKeyDown={handleKeyDown}
                />
            </label>


        </div>
    )
}
