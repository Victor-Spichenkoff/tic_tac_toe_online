"use client"

import { Chat } from "@/components/functions/Chat"
import {Square} from "@/components/functions/Square";
import {SquareOptions} from "@/types/onlineInfos";
import ThemeToggle from "@/components/functions/ThemeToggle";

export default function Home() {
    const values: SquareOptions[] = [1, 0, 1, 0, 2, 2, 2, 0, 1]



  return (
    <div className={'flex justify-center items-center'}>
      <div className={"grid grid-cols-3"}>
          {values.map((value, i) => (
              <Square value={value} index={i} key={i} />
          ))}
      </div>


        <div className={"absolute bottom-0 right-10"}>

        <ThemeToggle />
        </div>
    </div>
  )
}
