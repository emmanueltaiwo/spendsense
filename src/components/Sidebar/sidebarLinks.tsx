import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { sidebarLinksData } from "../db/sidebarLinksData";

type IconType = React.ElementType;

const iconComponents: { [key: string]: IconType } = {
  DashboardIcon,
  Person2Icon,
  PaidIcon,
  AddBoxIcon,
  NotificationsIcon,
};

const SidebarLinks = () => {
  const [activeLinkId, setActiveLinkId] = useState(1);

  useEffect(() => {
    const getPageId = localStorage.getItem("page_id");
    if (getPageId !== null) {
      const parsedPageId = parseFloat(getPageId);
      if (!isNaN(parsedPageId)) {
        setActiveLinkId(parsedPageId);
      }
    }
  }, []);

  const handleLogOut = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("page_id");
    localStorage.removeItem("page_name");
    window.location.reload();
  };

  return (
    <ul className="w-full flex flex-col h-full gap-5 items-start mx-5">
      {sidebarLinksData.map((data) => {
        const IconComponent = iconComponents[data.icon];
        const isActiveLink = data.id == activeLinkId;
        return (
          <li
            className={`${
              isActiveLink
                ? "bg-[#066cfc5c] w-[80%] pl-5 p-3 rounded-lg"
                : "w-[80%] pl-5 p-3 rounded-lg hover:bg-[#066cfc5c] transition-all duration-200"
            }`}
            key={data.id}
          >
            <Link href={data.route} className="flex items-center gap-3">
              <IconComponent className="text-blue-700" />
              <span className="text-blue-700 font-medium">{data.title}</span>
            </Link>
          </li>
        );
      })}
      <li
        onClick={handleLogOut}
        className="mt-auto mb-10 w-[80%] bg-[#f34141] active:bg-[#c84747] cursor-pointer transition-all duration-200 pl-5 p-3 rounded-lg"
      >
        <button className="flex items-center gap-3">
          <LogoutIcon className="text-white" />
          <span className="text-white font-medium">Logout</span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarLinks;
