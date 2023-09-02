import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  handleSidebarOpen: () => void;
  handleSidebarClose: () => void;
  sidebarIsOpen: boolean;
  profilePic: string;
  fullName: string;
}

const MobileHeader = (props: MobileHeaderProps) => {
  const {
    handleSidebarOpen,
    handleSidebarClose,
    sidebarIsOpen,
    profilePic,
    fullName,
  } = props;

  return (
    <div className="md:hidden flex gap-3 justify-end items-center">
      <button
        className={
          sidebarIsOpen
            ? "hidden"
            : "w-fit flex bg-[rgba(179,179,179,0.3)] px-2 py-2 rounded-lg"
        }
        onClick={handleSidebarOpen}
      >
        <MenuIcon className="text-gray-600" />
      </button>

      <button
        className={`${
          sidebarIsOpen
            ? "w-fit flex bg-[rgba(179,179,179,0.3)] px-2 py-2 rounded-lg"
            : "hidden"
        }`}
        onClick={handleSidebarClose}
      >
        <CloseIcon className="text-gray-600" />
      </button>

      <Link
        href="/notifications"
        className="bg-[rgba(179,179,179,0.3)] h-fit  px-2 py-2 rounded-full"
      >
        <NotificationsNoneOutlinedIcon className="text-gray-400" />
      </Link>

      <div
        className={`${
          !sidebarIsOpen
            ? "h-fit py-5 w-[1.5px] bg-black"
            : "hidden sm:block h-fit py-5 w-[1.5px] bg-black"
        }`}
      />

      <Link
        href="/profile"
        className={`${
          !sidebarIsOpen ? "flex md:hidden h-fit" : "hidden sm:flex"
        }`}
      >
        {profilePic && (
          <Image
            src={profilePic}
            width={30}
            height={30}
            alt="User"
            className="rounded-full h-10 w-10"
          />
        )}
        {!profilePic && (
          <div className="bg-blue-700 p-2 flex items-center justify-center h-10 w-10 rounded-full text-white text-center text-xl font-semibold">
            {fullName && fullName.length > 0 && (
              <>
                {fullName[0]}
                {fullName.indexOf(" ") !== -1 &&
                  fullName[fullName.indexOf(" ") + 1]}
              </>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

export default MobileHeader;
