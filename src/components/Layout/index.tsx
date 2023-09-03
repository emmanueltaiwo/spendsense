import React, { Fragment, ReactNode, useState, useEffect } from "react";
import Header from "./header";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

interface LayoutProps {
  children: ReactNode;
  handleSidebarOpen: () => void;
  handleSidebarClose: () => void;
  sidebarIsOpen: boolean;
  userId: string;
  handleSearchExpenses: (searchStr: string, e: any) => void;
}


const Layout = (props: LayoutProps) => {
  const {
    children,
    handleSidebarOpen,
    handleSidebarClose,
    sidebarIsOpen,
    userId,
    handleSearchExpenses,
  } = props;

  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfilePic(userSnap.data().profilePic);
        setFullName(userSnap.data().fullName);
      }
    };
    getUserDetails();
  }, [userId]);
  return (
    <Fragment>
      <Header
        handleSidebarOpen={handleSidebarOpen}
        handleSidebarClose={handleSidebarClose}
        sidebarIsOpen={sidebarIsOpen}
        profilePic={profilePic}
        fullName={fullName}
        handleSearchExpenses={handleSearchExpenses}
      />
      {children}
    </Fragment>
  );
};

export default Layout;
