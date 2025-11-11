import {VscAccount, VscHome} from 'react-icons/vsc';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdTour, MdOutlineTour } from "react-icons/md";
import { MdOutlineSettingsVoice } from "react-icons/md";
import type React from 'react';
import { useNavigate } from 'react-router-dom';

interface iconProps {
    name: string;
    icon: React.ElementType;
    nav: string;
    size: string;
}

function Icon({ name, icon: IconComponent, nav, size }: iconProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${nav}`)}
      className="z-10 flex flex-col items-center justify-center cursor-pointer text-[3vw] md:text-[1vw] mt-[1vw] p-[2vw]">
      <IconComponent className="mb-[0.5vw]" size={`${size}vw`} />
      <p className="truncate">{name}</p>
    </div>
  );
}
const icons = [
    { name: 'Home', icon: VscHome, nav: '/home'},
    { name: 'My tours', icon: MdOutlineTour, nav: '/tours'},
    { name: 'Friends', icon: LiaUserFriendsSolid, nav: '/friends'},
    { name: 'Account', icon: VscAccount, nav: '/account'}
]

function Dock() {
  return (
    <div
      className="z-2 fixed bottom-[5%] left-1/2 -translate-x-1/2 flex justify-center items-center w-[80vw] md:w-[50vw] rounded-[2rem] bg-white/20  backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-[2vw] transition-all duration-500">
      <div className="flex justify-around w-full">
        {icons.map((item) => (
          <Icon size="8" key={item.nav} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Dock;