import React from "react";
import Link from "next/link";
import DemoAccount from "../UI/demoAccount";
import LoginForm from "./loginForm";

const LoginSidePanel = () => {
  return (
    <section className="w-full lg:w-[80%] xl:w-[60%] flex flex-col  items-center gap-3 mt-5 md:mt-0 md:justify-center h-screen">
      <h1 className="text-slate-800 text-center font-bold text-3xl">
        Login to SpendSense
      </h1>
      <p className="text-sm text-center text-gray-400">
        Don&apos;t have an account?{" "}
        <Link className="underline text-blue-700 font-medium" href="/register">
          Register
        </Link>{" "}
      </p>
      <LoginForm />
      <DemoAccount />
    </section>
  );
};

export default LoginSidePanel;
