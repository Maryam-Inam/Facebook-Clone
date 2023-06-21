import React from "react";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
function LeftHeader() {
  return (
    <div className="flex items-center">
      <Image
        src="https://links.papareact.com/5me"
        width={40}
        height={40}
        alt=""
        layout="fixed"
      />
      <div className="flex ml-2 items-center rounded-full p-2 bg-gray-100">
        <SearchIcon className="h-6 text-gray-600" />
        <input
          className="hidden md:inline-flex ml-2 items-center flex-shrink bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search Facebook"
        />
      </div>
    </div>
  );
}

export default LeftHeader;
