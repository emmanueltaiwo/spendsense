import React, { useEffect, useState } from "react";
import DesktopHeader from "../Header/desktopHeader";
import MobileHeader from "../Header/mobileHeader";

interface HeaderProps {
  handleSidebarOpen: () => void;
  handleSidebarClose: () => void;
  sidebarIsOpen: boolean;
  profilePic: string;
  fullName: string;
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const Header = (props: HeaderProps) => {
  const {
    handleSidebarOpen,
    handleSidebarClose,
    sidebarIsOpen,
    profilePic,
    fullName,
    handleSearchExpenses,
  } = props;
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const getPageName = localStorage.getItem("page_name")?.toString();
    if (getPageName) {
      setPageName(getPageName);
    }
  }, []);

  return (
    <header
      className={`${
        !sidebarIsOpen
          ? "w-full shadow-gray-400 shadow-sm md:w-[75%] z-10 lg:w-[80%] xl:w-[85%] top-0 right-0 fixed h-20 bg-white flex items-center gap-5 justify-between"
          : "transition-all duration-1000 z-10 w-[45%] sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[85%] top-0 right-0 fixed h-20 bg-white flex items-center gap-5 justify-between shadow-gray-400 shadow-sm"
      }`}
    >
      <div
        className={`${
          !sidebarIsOpen
            ? "md:ml-10 ml-5 xl:ml-16"
            : "hidden md:block md:ml-10 ml-5 xl:ml-16"
        }`}
      >
        <h1 className="text-2xl lg:text-3xl font-bold">{pageName}</h1>
      </div>

      <div className="w-full mr-5 xl:mr-16 md:mr-10">
        <DesktopHeader
          handleSearchExpenses={handleSearchExpenses}
          profilePic={profilePic}
          fullName={fullName}
        />
        <MobileHeader
          handleSidebarOpen={handleSidebarOpen}
          handleSidebarClose={handleSidebarClose}
          sidebarIsOpen={sidebarIsOpen}
          profilePic={profilePic}
          fullName={fullName}
        />
      </div>
    </header>
  );
};

export default Header;
