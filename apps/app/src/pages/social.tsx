import Dock from "@/components/dock";
import { HeaderKah } from "@/components/search-home";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineSettingsVoice } from "react-icons/md";

function Social() {
  return (
    <div className="">
        <div className="">
            <HeaderKah />
            <div className="flex mt-[10vw]">
                <FriendsSearch />
            </div>
            <div className="flex mt-[5vw]">
                <FriendsPending />
            </div>
            
        </div>
        <Dock />
    </div>
  )
}

export function FriendsSearch() {
    return(
        <div className="border rounded-xl p-[3vw] flex flex-col">
            <p className="ml-[1vw] text-[6vw] mb-[2vw]">Make Friends</p>
            <div className="flex gap-[2vw]">
                <Input className="pt-[6vw] pb-[6vw] pl-[4vw] pr-[4vw] rounded-2xl" type="text" placeholder="Search @aditya@gmail.com" />
                <Button className="p-[6vw] rounded-2xl">Search</Button>
            </div>
        </div>
    )
}

export function FriendsPending() {
    return(
        <div className="w-full border rounded-xl p-[3vw] flex flex-col">
            <p className="ml-[1vw] text-[6vw] mb-[2vw]">Friend Requests</p>
            <div className="flex gap-[2vw] justify-between">
                <Avatars />  
                <Button className="p-[6vw] rounded-2xl">See Requests</Button>
            </div>
        </div>
    );
}

export function Avatars() {
    return(
        <div className="mt-[2.5vw] *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    )
}

export default Social;