import Image from "next/image";
import React, { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLinks from "./sidebarLinks";
import Link from "next/link";

interface SidebarProps {
  sidebarIsOpen: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const { sidebarIsOpen } = props;
  return (
    <Fragment>
      <AnimatePresence>
        {sidebarIsOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0, transition: { duration: 0 } }}
            exit={{ x: "-100%" }}
            className="w-[55%] transition-all duration-500 sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[15%] h-screen bg-white fixed left-0 top-0 bottom-0 flex gap-10  flex-col z-10"
          >
            <Link href="/" className="w-full h-20 flex items-center">
              <Image
                src="/assets/Images/spendsense.png"
                width={100}
                height={100}
                alt="logo"
                className="min-w-[170px] sm:min-w-[200px]"
              />
            </Link>
            <SidebarLinks />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden w-[50%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[15%] h-screen bg-white fixed top-0 bottom-0 left-0 md:flex gap-10  flex-col z-10">
        <Link href="/" className="w-full h-20 flex items-center">
          <Image
            src="/assets/Images/spendsense.png"
            width={100}
            height={100}
            alt="logo"
            className="min-w-[170px] sm:min-w-[200px]"
          />
        </Link>
        <SidebarLinks />
      </div>
    </Fragment>
  );
};
export default Sidebar;
