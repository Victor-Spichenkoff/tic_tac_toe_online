import {Point} from "@/components/template/Point";
import {useState} from "react";
import {Button} from "@/components/template/Button";
import {aborted} from "node:util";

export const TestPointsResponsivity = () => {
    const [points, setPoints] = useState(0)



    return (
        <div className={"relative"}>
            <Point points={points} label={"Points"} />
            <Button label={"Aumentar"} onClick={() => {
                setPoints(points + 1)
            }}
            className={"absolute bottom-0 left-0"}
            />
        </div>
    )
}
