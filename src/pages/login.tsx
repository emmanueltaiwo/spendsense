import React from "react";
import SideContainerBackground from "@/components/UI/sideContainerBackground";
import LoginSidePanel from "@/components/Login/LoginSidePanel";
import Head from "next/head";

const Login = () => {
  return (
    <main className="w-full flex gap-5 md:flex-row pt-10 md:pt-0 flex-col-reverse justify-center">
      <Head>
        <title>SpendSense - Login</title>
      </Head>
      <SideContainerBackground bgImage="/assets/Images/login-bg.png" />
      <LoginSidePanel />
    </main>
  );
};

export default Login;
