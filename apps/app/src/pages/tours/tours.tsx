import Dock from "@/components/dock";
import { HeaderKah } from "@/components/search-home";
import { Cities } from "./cities";
import { MonumentList } from "./monuments";
import { MyTours } from "./mytours";

function Tours() {
  return (
    <div>
        <div className="m-[-5vw]">
            <HeaderKah />
        </div>
        <div className="mt-[12.5vw]">
            <Stats />
        </div>

        <div className="mt-[10vw]">
            <MonumentList />
            
        </div>

        <div className="mt-[10vw]">
            <Cities />
        </div>

        <div className="mt-[10vw]">
            <MyTours />
        </div>

        <div className="flex w-full mt-[25vw] mb-[25vw] justify-center">

        </div>

        <div className="fixed bottom-[0vw]">
            <Dock />
        </div>
    </div>
  );
}

export function Stats() {
    return(
        <div className="flex justify-center gap-[15vw]">
            <div className="flex flex-col items-center w-[20vw]">
                <p className="text-[12.5vw] font-bold">18</p>
                <p className="mt-[-3vw]">Friends</p>
            </div>
            <div className="flex flex-col items-center w-[20vw]">
                <p className="text-[12.5vw] font-bold">12</p>
                <p className="mt-[-3vw]">Monuments</p>
            </div>
            <div className="flex flex-col items-center w-[20vw]">
                <p className="text-[12.5vw] font-bold">24</p>
                <p className="mt-[-3vw]">Cities</p>
            </div>
        </div>
    )
}

export default Tours;