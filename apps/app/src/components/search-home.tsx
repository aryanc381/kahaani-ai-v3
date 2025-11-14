import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineSettingsVoice } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAppDispatch } from "@/store/hooks";
import { setSearchValue, setSearchTrigger } from "@/store/appSlice";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Searchbar() {
  const dispatch = useAppDispatch();

  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //@ts-ignore
  useEffect(() => {
    const instance = new Vapi("292efbdf-9362-4b24-b1e6-3dfc7954fc0b"); // YOUR PUBLIC VAPI API KEY
    setVapi(instance);

    instance.on("call-start", () => {
      setIsConnected(true);
      setIsLoading(false);
    });

    instance.on("call-end", () => {
      setIsConnected(false);
      setIsLoading(false);
    });

    return () => instance.stop();
  }, []);

  const startCall = async () => {
    if (!vapi) return;
    setIsLoading(true);
    await vapi.start("db256f21-0f65-4023-b701-e6b2eacd9fdb"); // YOUR AGENT ID
  };

  const endCall = async () => {
    await vapi?.stop();
    setIsConnected(false);
    setIsLoading(false);
  };

  const handleSearch = () => {
    console.log("Search Trigger Fired!");
    dispatch(setSearchTrigger()); 
  };

  return (
    <>
      <HeaderKah />

      <div className="z-10 mt-[4vw] flex justify-center w-full max-w-sm items-center gap-2">
        <div className="flex gap-[2vw]">
          <Input
            className="w-[50vw] p-[6vw] rounded-2xl"
            type="text"
            placeholder="Forts near me...."
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          <Button
            className="p-[6vw] rounded-2xl"
            variant="outline"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button className="p-[6vw] rounded-2xl" variant="outline">
                <MdOutlineSettingsVoice />
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-black text-white border-neutral-800">
              <DialogHeader>
                <DialogTitle className="text-xl">Talk With Kahaani</DialogTitle>

                <div className="mt-6 flex flex-col items-center gap-6">
                  <img src="/siri.gif" alt="siri animation" />
                  <Button
                    className="w-full py-6 rounded-xl"
                    onClick={isConnected ? endCall : startCall}
                    disabled={isLoading}
                  >
                    {isConnected
                      ? "End Call"
                      : isLoading
                      ? "Connecting..."
                      : "Start Voice Chat"}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export function HeaderKah() {
  return (
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
  );
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

        <DropdownMenuContent
          align="end"
          className="mt-[5vw] rounded-xl"
        >
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
  );
}
