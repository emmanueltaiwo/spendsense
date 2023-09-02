import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "@/components/UI/loader";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateUserEntry = async () => {
      const getStoredUserId = localStorage.getItem("userId");
      if (getStoredUserId !== null) {
        const userRef = doc(db, "users", getStoredUserId);
        const userSnap = await getDoc(userRef);
        setIsLoggedIn(userSnap.exists());
        router.push("/dashboard")
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };
    validateUserEntry();
  }, [router]);

  return (
    <>
      {" "}
      <Head>
        <title>SpendSense - Finance Tracker App</title>
      </Head>{" "}
      {!isLoggedIn && <Loader />}
    </>
  );
}
