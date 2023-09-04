import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../../../firebase";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../../../firebase";
import Image from "next/image";
import EditProfile from "./editProfile";

interface ProfileContainerProps {
  userData: Record<string, any>;
}

const ProfileContainer = (props: ProfileContainerProps) => {
  const { userData } = props;
  const [newFullName, setNewFullName] = useState(userData.fullName);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState(userData.password);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isDemoAccount =
    auth.currentUser?.uid === "P8Mu6vzjbBWRcvC9spr5U21AHGX2"; // Check if it's a demo account

  const handleProfileReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      if (isDemoAccount) {
        setErrorMessage(
          "Can't edit profile, this is a demo account. Create an account to access all features"
        );
        return;
      }

      const user = auth.currentUser;

      if (user) {
        // Check if user.email is not null
        if (user.email) {
          // Re-authenticate the user
          const credential = EmailAuthProvider.credential(
            user.email,
            newPassword
          );
          await reauthenticateWithCredential(user, credential);

          // Update user email
          await updateEmail(user, newEmail);

          // Update user password (if newPassword is not empty)
          if (newPassword) {
            await updatePassword(user, newPassword);
          }

          const getCurrentUserId = localStorage.getItem("userId");
          if (getCurrentUserId) {
            const userRef = doc(db, "users", getCurrentUserId);
            await updateDoc(userRef, {
              fullName: newFullName,
              email: newEmail,
            });
          }

          setSuccessMessage("Profile updated successfully.");
          setErrorMessage("");
          setNewEmail("");
          setNewFullName("");
          setNewPassword("");
        } else {
          setSuccessMessage("");
          setErrorMessage("User email is null. Please sign in again.");
        }
      } else {
        setSuccessMessage("");
        setErrorMessage("User not found. Please log in.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Error updating profile, email, or password:");

      console.error("Error updating profile, email, or password:", error);
    }
  };

  const handleEmailChange = (e: string) => {
    setNewEmail(e);
  };

  const handlePasswordChange = (e: string) => {
    setNewPassword(e);
  };

  const handleFullNameChange = (e: string) => {
    setNewFullName(e);
  };

  return (
    <main className="w-full flex flex-col gap-10">
      <section className="lg:mx-10 xl:mx-16 mx-5 mt-10 flex flex-col gap-5">
        <h1 className="text-3xl font-medium text-slate-800">
          Manage Your Profile
        </h1>
        <p className="text-sm font-light text-slate-800">
          SpendSense offers a user-friendly interface that empowers users to
          efficiently manage their profiles.
        </p>
      </section>

      <section className="lg:mx-10 xl:mx-16 mx-5 md:mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-medium text-slate-800">
            Edit Profile Picture
          </h2>
          <div className="mt-5 flex gap-3 items-center">
            {userData.profilePic ? (
              <Image
                src={userData.profilePic}
                width={120}
                height={100}
                alt="User"
                className="rounded-full"
              />
            ) : (
              <div className="bg-blue-700 p-2 flex items-center justify-center w-[100px] h-[100px] rounded-full text-white text-center text-3xl font-semibold">
                {userData.fullName && userData.fullName.length > 0 && (
                  <>
                    {userData.fullName[0]}
                    {userData.fullName.indexOf(" ") !== -1 &&
                      userData.fullName[userData.fullName.indexOf(" ") + 1]}
                  </>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                disabled={isDemoAccount}
                className={`bg-blue-700 w-40 h-fit px-5 py-2 rounded-md text-white text-md font-medium ${
                  isDemoAccount && "opacity-50 cursor-not-allowed"
                }`}
              >
                Change Picture
              </button>
              <button
                disabled={isDemoAccount}
                className={`bg-red-700 border-2 w-40 h-fit px-5 py-2 rounded-md text-white text-md font-medium ${
                  isDemoAccount && "opacity-50 cursor-not-allowed"
                }`}
              >
                Delete Picture
              </button>
            </div>
          </div>
          <p className="text-slate-800 text-sm">
            Remember to refresh your browser to see recent updates.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <h2 className="text-2xl font-medium text-slate-800">
            Edit Personal Details
          </h2>

          <EditProfile
            newEmail={newEmail}
            newPassword={newPassword}
            newFullName={newFullName}
            isDemoAccount={isDemoAccount}
            successMessage={successMessage}
            errorMessage={errorMessage}
            handleProfileReset={handleProfileReset}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleFullNameChange={handleFullNameChange}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfileContainer;
