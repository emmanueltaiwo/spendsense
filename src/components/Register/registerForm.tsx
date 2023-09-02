import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    localStorage.removeItem("userId");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        password: password,
        profilePic: "",
      });
      localStorage.setItem("userId", user.uid);
      // Registration successful
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setSuccessMessage("Account created successfully!");
      router.push("/dashboard");
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
      onSubmit={handleSignUp}
    >
      <input
        type="text"
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Full Name"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type=""
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="w-[80%] bg-blue-100 py-4 px-4 text-black placeholder-slate-500 font-medium rounded-lg outline-blue-700"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        {isLoading ? (
          <AutorenewIcon className="animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>

      {error && <p className="w-[80%] text-center text-red-500">{error}</p>}

      {successMessage && (
        <p className="w-[80%] text-center text-green-500">{successMessage}</p>
      )}
    </form>
  );
};

export default RegisterForm;
