import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface MobileSearchProps {
  handleSearchExpenses: (searchStr: string, e: any) => void;
}

const MobileSearch = (props: MobileSearchProps) => {
  const { handleSearchExpenses } = props;
  const [searchStr, setSearchStr] = useState("");
  return (
    <div className="mt-5 flex mx-3 md:hidden items-center w-[94%] gap-2 px-3 rounded-lg bg-[rgba(179,179,179,0.3)]">
      <SearchIcon className="text-gray-400" />
      <input
        type="text"
        className="w-full text-md font-medium bg-transparent py-3 px-2 outline-none"
        placeholder="Search for expenses"
        value={searchStr}
        onChange={(e) => {
          setSearchStr(e.target.value);
          handleSearchExpenses(e.target.value, e);
        }}
      />
    </div>
  );
};

export default MobileSearch;
