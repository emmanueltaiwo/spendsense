import RightSidePanel from "@/components/Register/registerSidePanel";
import SideContainerBackground from "@/components/UI/sideContainerBackground";
import React from "react";
import Head from "next/head";

const Register = () => {
  return (
    <main className="w-full flex gap-5 md:flex-row pt-10 md:pt-0 flex-col-reverse justify-center">
      <Head>
        <title>SpendSense - Register</title>
      </Head>
      <SideContainerBackground bgImage="/assets/Images/register-bg.png" />
      <RightSidePanel />
    </main>
  );
};

export default Register;
