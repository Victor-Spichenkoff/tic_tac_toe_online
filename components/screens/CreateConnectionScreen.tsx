import {Input} from "@/components/template/Input";
import {useState} from "react";


export const CreateConnectionScreen = () => {
    const [roomId, SetRoomId] = useState("")

    return (
        <div>
        {/* Inputs */}
            <div>
                <Input value={roomId} setValue={SetRoomId} label={"Room ID"} />
            </div>
        </div>
    )
}
