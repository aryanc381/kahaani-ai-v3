import Dock from "@/components/dock";
import { HeaderKah } from "@/components/search-home";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Account() {
  const [name, setName] = useState<string>("Aditya Yenpure");
  const [tempName, setTempName] = useState<string>(name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [language, setLanguage] = useState<string>("English");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  function saveName(onClose?: () => void) {
    setName(tempName);
    if (onClose) onClose();
  }

  function updatePassword(onClose?: () => void) {
    // TODO: call API to change password (validate currentPassword/newPassword)
    setCurrentPassword("");
    setNewPassword("");
    if (onClose) onClose();
  }

  function saveLanguage(onClose?: () => void) {
    setLanguage(selectedLanguage);
    if (onClose) onClose();
  }

  return (
    <div className="">
      <div className="m-[-5vw]"><HeaderKah /></div>

      <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white flex flex-col items-center">
        <div className="flex items-center mt-[10vw] p-[4vw] gap-[5vw] rounded-xl bg-gray-200 dark:bg-[#161616] w-[90vw]">
          <Avatar className="w-[15vw] h-[15vw]">
            <AvatarImage src="https://kahaani.site/city/pune.png" alt="@shadcn" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <p className="text-[5vw] font-semibold">{name}</p>
        </div>

        <div className="mt-[5vw] w-[90vw] space-y-[4vw]">
          <div className="p-[4vw] rounded-xl bg-gray-100 dark:bg-[#161616]">
            <p className="text-[4vw] font-semibold mb-[2vw]">Account Settings</p>
            <ul className="text-[3.5vw] space-y-[1.5vw]">
              <li className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="">Edit Profile</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>

                    <Input
                      value={tempName}
                      onChange={(e) => setTempName((e.target as HTMLInputElement).value)}
                      placeholder="Enter new name"
                      className="mt-4 w-full"
                    />

                    <DialogFooter className="flex gap-3">
                      <DialogClose asChild>
                        <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800">Cancel</button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button
                          onClick={() => saveName()}
                          className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
                        >
                          Save
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <span>›</span>
              </li>

              <li className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="">Change Password</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>

                    <Input
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword((e.target as HTMLInputElement).value)}
                      placeholder="Current Password"
                      type="password"
                      className="mt-3 w-full"
                    />
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword((e.target as HTMLInputElement).value)}
                      placeholder="New Password"
                      type="password"
                      className="mt-3 w-full"
                    />

                    <DialogFooter className="flex gap-3">
                      <DialogClose asChild>
                        <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800">Cancel</button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button
                          onClick={() => updatePassword()}
                          className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
                        >
                          Update
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <span>›</span>
              </li>

              <li className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="">Language</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Language</DialogTitle>
                    </DialogHeader>

                    <div className="mt-2 space-y-2">
                      {['English', 'Hindi', 'Marathi'].map((lang) => (
                        <label key={lang} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={selectedLanguage === lang}
                            onChange={() => setSelectedLanguage(lang)}
                          />
                          <span>{lang}</span>
                        </label>
                      ))}
                    </div>

                    <DialogFooter className="flex gap-3 mt-4">
                      <DialogClose asChild>
                        <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800">Cancel</button>
                      </DialogClose>
                      <DialogClose asChild>
                        <button
                          onClick={() => saveLanguage()}
                          className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
                        >
                          Save
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <span>›</span>
              </li>
            </ul>
          </div>

          <div className="p-[4vw] rounded-xl bg-gray-100 dark:bg-[#161616]">
            <p className="text-[4vw] font-semibold mb-[2vw]">App Preferences</p>
            <ul className="text-[3.5vw] space-y-[1.5vw]">
              <li className="flex justify-between"><span>Notifications</span><span>›</span></li>
              <li className="flex justify-between"><span>Theme</span><span>›</span></li>
              <li className="flex justify-between"><span>Data Usage</span><span>›</span></li>
            </ul>
          </div>

          <div className="p-[4vw] rounded-xl bg-gray-100 dark:bg-[#161616]">
            <p className="text-[4vw] font-semibold mb-[2vw]">Support</p>
            <ul className="text-[3.5vw] space-y-[1.5vw]">
              <li className="flex justify-between"><span>Help Center</span><span>›</span></li>
              <li className="flex justify-between"><span>Report an Issue</span><span>›</span></li>
              <li className="flex justify-between"><span>About KahaaniAI</span><span>›</span></li>
            </ul>
          </div>

          <button className="w-full p-[4vw] text-[4vw] font-semibold bg-red-500 text-white rounded-xl">Logout</button>
        </div>

        <div className="fixed bottom-0 w-full"><Dock /></div>
      </div>
    </div>
    
  );
}
