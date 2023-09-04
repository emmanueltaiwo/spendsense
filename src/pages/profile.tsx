import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar/sidebar";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "@/components/UI/loader";
import Container from "@/components/UI/container";
import Head from "next/head";
import ProfileContainer from "@/components/Profile/profileContainer";

const Profile = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<any>({}); // Define the correct type for userData

  useEffect(() => {
    localStorage.removeItem("page_name");
    localStorage.setItem("page_name", "Profile");
  }, []);

  useEffect(() => {
    localStorage.removeItem("page_id");
    localStorage.setItem("page_id", "2");
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const getCurrentUserId = localStorage.getItem("userId");

      if (getCurrentUserId !== null) {
        const userRef = doc(db, "users", getCurrentUserId);

        const unsub = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const getUserData = doc.data();
            setUserData(getUserData);
          }
        });

        return () => unsub();
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const validateUserEntry = async () => {
      const getStoredUserId = localStorage.getItem("userId");
      if (getStoredUserId !== null) {
        const userRef = doc(db, "users", getStoredUserId);
        const userSnap = await getDoc(userRef);
        setIsLoggedIn(userSnap.exists());
        setUserId(getStoredUserId);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };
    validateUserEntry();
  }, [router]);

  const handleSidebarOpen = () => {
    setSidebarIsOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarIsOpen(false);
  };

  const handleSearchExpenses = (searchStr: string, e: any) => {};

  return (
    <>
      <Head>
        <title>SpendSense - Profile</title>
      </Head>

      {isLoggedIn && (
        <Layout
          handleSidebarOpen={handleSidebarOpen}
          handleSidebarClose={handleSidebarClose}
          sidebarIsOpen={sidebarIsOpen}
          userId={userId}
          handleSearchExpenses={handleSearchExpenses}
        >
          <Sidebar sidebarIsOpen={sidebarIsOpen} />
          <Container>
            <ProfileContainer userData={userData} />
          </Container>
        </Layout>
      )}

      {!isLoggedIn && <Loader />}
    </>
  );
};

export default Profile;
