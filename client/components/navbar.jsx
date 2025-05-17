import React from 'react';
import Icon from './icons';
import {GoHome} from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaGoogleScholar } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className="flexs lg:h-screen min-w-[200px] p-3">
            <div className="p-2 w-2/3 flex flex-row lg:flex-col items-center justify-between h-full bg-black rounded-2xl shadow-2xl shadow-black">
                <div className="flex flex-row justify-center items-center basis-1/4 font-extrabold">
                    <span className='font-extrabold text-5xl'>.</span><span>Apollo</span>
                </div>
                <div className="basis-3/4 grow flex flex-row lg:flex-col items-center justify-around">
                    <Icon label="Home" href={"/"} IconName={GoHome}/>
                    <Icon label="Explore Courses" href={"/explore"} IconName={FaGoogleScholar}/>
                    <Icon label="Profile" href={"/profile"} IconName={CgProfile}/>
                    <Icon label="Settings" href={"/settings"} IconName={IoSettingsOutline}/>
                </div>
                <div className="p-3 basis-1/4 flex lg:flex-col justify-end">
                    <Icon label="Logout" href={"/logout"} IconName={IoExitOutline}/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;