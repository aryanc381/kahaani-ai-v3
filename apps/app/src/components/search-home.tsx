import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdOutlineSettingsVoice } from "react-icons/md";


export function Searchbar() {
  return (
    <>
        <div className="z-10 ml-[1vw] mr-[1vw] flex justify-between mt-[8vw] text-[4.5vw] text-center">
            <p>KahaaniAI®</p>
            <p>Logout</p>
        </div>
        <div className="z-10 mt-[4vw] flex justify-center w-full max-w-sm items-center gap-2">
            <div className="flex gap-[2vw]">
                <Input className="w-[50vw] p-[6vw] rounded-2xl" type="text" placeholder="Fort near me..." />
                <Button className="p-[6vw] rounded-2xl" type="submit" variant="outline">Search</Button>
                <Button className="p-[6vw] rounded-2xl" type="submit" variant="outline"><MdOutlineSettingsVoice  /></Button>
            </div>
        </div>
    </>
  );
}
