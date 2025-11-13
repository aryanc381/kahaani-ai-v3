import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdOutlineSettingsVoice } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export function Searchbar() {
  return (
    <>
        <HeaderKah />
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

export function HeaderKah() {
    return(
        <div className="z-10 ml-[1vw] mr-[1vw] flex justify-between mt-[8vw] text-[4.5vw] text-center">
            <p>KahaaniAI®</p>
            <Popover>
                <PopoverTrigger>Settings</PopoverTrigger>
                <PopoverContent className="mr-[3vw] w-[50vw] rounded-xl">
                    <div className="flex items-center gap-[3vw]">
                        <ModeToggleApp />
                        
                    </div>
                    
                </PopoverContent>
            </Popover>
        </div>
    )
    
}

export function ModeToggleApp() {
  const { setTheme } = useTheme();

  return (
    <div className="flex">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-[3vw]">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <p>App Theme</p>
            </div>
            
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-[5vw] rounded-xl">
            <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
            System
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
    
  )
}