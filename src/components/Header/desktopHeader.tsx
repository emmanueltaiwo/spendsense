import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Image from "next/image";
import Link from "next/link";

interface DesktopHeaderProps {
  profilePic: string;
  fullName: string;
  handleSearchExpenses: (searchStr: string, e: any) => void;
  pageName: string;
}

const DesktopHeader = (props: DesktopHeaderProps) => {
  const { profilePic, fullName, handleSearchExpenses, pageName } = props;

  const [searchStr, setSearchStr] = useState("");
  return (
    <div className="hidden justify-end md:flex gap-5 items-center">
      <div className="md:flex hidden items-center md:w-[50%] lg:w-[40%] xl:w-[50%] gap-2 px-3 rounded-lg bg-[rgba(179,179,179,0.3)]">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          className={`${
            pageName === "Profile"
              ? "w-full text-md font-medium bg-transparent py-3 px-2 outline-none cursor-not-allowed"
              : "w-full text-md font-medium bg-transparent py-3 px-2 outline-none"
          }`}
          placeholder="Search for expenses"
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value);
            handleSearchExpenses(e.target.value, e);
          }}
          disabled={pageName === "Profile"}
        />
      </div>
      <Link
        href="/notifications"
        className="bg-[rgba(179,179,179,0.3)] h-fit  px-2 py-2 rounded-full"
      >
        <NotificationsNoneOutlinedIcon className="text-gray-400" />
      </Link>

      <div className="hidden md:block h-fit py-5 w-[1.5px] bg-black" />
      <Link href="/profile" className="hidden md:flex items-center gap-3">
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

        <h4 className="md:hidden lg:block font-medium text-lg">
          {fullName || "Hello"}
        </h4>
      </Link>
    </div>
  );
};

export default DesktopHeader;
