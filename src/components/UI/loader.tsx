import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <AutorenewIcon className="animate-spin text-blue-800" fontSize="large" />
    </div>
  );
};

export default Loader;
