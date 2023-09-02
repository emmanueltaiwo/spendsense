import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const DemoAccount = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoAccountLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.removeItem("userId");

    try {
      await signInWithEmailAndPassword(
        auth,
        "demo@spendsense.com",
        "demo1234"
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userId", user.uid);
        router.push("/dashboard");
      });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = firebaseError.message;
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-5 w-full flex flex-col gap-3">
      <div className="w-[80%] flex items-center mx-auto">
        <div className="border-[1px] border-gray-500 h-fit w-[60%] my-auto" />
        <p className="w-full px-3 text-center">or try demo account</p>
        <div className="border-[1px] border-gray-500 h-fit w-[60%] my-auto" />
      </div>

      <button
        className={`${
          isLoading
            ? "mx-auto w-[80%] rounded-lg py-4 px-4 border-2 border-gray-500 text-gray-500 disabled cursor-not-allowed text-lg font-medium"
            : "mx-auto w-[80%] rounded-lg py-4 px-4 border-2 border-blue-500 text-blue-500 text-lg font-medium  active:border-blue-900 active:text-blue-900"
        }`}
        disabled={isLoading}
        onClick={handleDemoAccountLogin}
      >
        {isLoading ? (
          <AutorenewIcon className="animate-spin" />
        ) : (
          "Demo Account"
        )}
      </button>
    </div>
  );
};

export default DemoAccount;
