import React from "react";
import Image from "next/image";

import LeftHeader from "./LeftHeader";
import CenterHeader from "./CenterHeader";
import RightHeader from "./RightHeader";
function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/*  left*/}
      <LeftHeader />
      {/* center */}
      <CenterHeader />
      {/* right */}
      <RightHeader />
    </div>
  );
}

export default Header;
