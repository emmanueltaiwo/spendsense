import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.removeItem("userId");

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("userId", user.uid);
          setEmail("");
          setPassword("");
          setError("");
          setSuccessMessage("You are now logged in!");
          router.push("/dashboard");
        }
      );
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage = firebaseError.message;
      setError(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <form
      className="w-full flex flex-col gap-4 items-center mt-10"
      onSubmit={handleSignIn}
    >
      <input
        type=""
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        className={`w-[80%] rounded-lg py-4 px-4 bg-blue-500 text-white text-lg font-medium active:bg-blue-400 active:border-blue-900 active:border-2 ${
          isLoading
            ? "disabled cursor-not-allowed bg-gray-400 outline-none border-none active:bg-gray-400"
            : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? <AutorenewIcon className="animate-spin" /> : "Login"}
      </button>

      {error && <p className="w-[80%] text-center text-red-500">{error}</p>}

      {successMessage && (
        <p className="w-[80%] text-center text-green-500">{successMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
