import React from "react";

interface EditProfileProps {
  newFullName: string;
  newEmail: string;
  newPassword: string;
  isDemoAccount: boolean;
  successMessage: string;
  errorMessage: string;
  handleFullNameChange: (e: string) => void;
  handleEmailChange: (e: string) => void;
  handlePasswordChange: (e: string) => void;
  handleProfileReset: (e: { preventDefault: () => void }) => void;
}

const EditProfile = (props: EditProfileProps) => {
  const {
    newEmail,
    newPassword,
    newFullName,
    isDemoAccount,
    successMessage,
    errorMessage,
    handleEmailChange,
    handlePasswordChange,
    handleFullNameChange,
    handleProfileReset,
  } = props;
  return (
    <form onSubmit={handleProfileReset} className="w-full flex flex-col gap-5">
      <input
        type="text"
        placeholder="Full Name"
        value={newFullName}
        onChange={(e) => handleFullNameChange(e.target.value)}
        className="bg-white w-[80%] md:w-[60%] lg:w-[40%] px-3 py-2 border-slate-800 border-[1px] rounded-md outline-none"
        disabled={isDemoAccount}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={newEmail}
        onChange={(e) => handleEmailChange(e.target.value)}
        className="bg-white w-[80%] md:w-[60%] lg:w-[40%] px-3 py-2 border-slate-800 border-[1px] rounded-md outline-none"
        disabled={isDemoAccount}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => handlePasswordChange(e.target.value)}
        className="bg-white w-[80%] md:w-[60%] lg:w-[40%] px-3 py-2 border-slate-800 border-[1px] rounded-md outline-none"
        disabled={isDemoAccount}
      />
      <button
        type="submit"
        className={`w-[80%] md:w-[60%] lg:w-[40%] px-5 py-2 bg-blue-800 text-white rounded-md ${
          isDemoAccount && "opacity-50 cursor-not-allowed"
        }`}
      >
        Reset
      </button>
      {successMessage && (
        <div className="text-green-500 text-md">{successMessage}</div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-md">{errorMessage}</div>
      )}
    </form>
  );
};

export default EditProfile;
