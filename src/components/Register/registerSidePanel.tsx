import React from "react";
import RegisterForm from "./registerForm";
import Link from "next/link";
import DemoAccount from "../UI/demoAccount";

const RightSidePanel = () => {
  return (
    <section className="w-full lg:w-[80%] xl:w-[60%] flex flex-col  items-center gap-3 mt-5 md:mt-0 md:justify-center h-screen">
      <h1 className="text-slate-800 text-center font-bold text-3xl">
        Sign Up to SpendSense
      </h1>
      <p className="text-sm text-center text-gray-400">
        Already have an account?{" "}
        <Link className="underline text-blue-700 font-medium" href="/login">
          Login
        </Link>{" "}
      </p>

      <RegisterForm />

      <DemoAccount />
    </section>
  );
};

export default RightSidePanel;
