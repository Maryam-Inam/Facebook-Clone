import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import HeaderIcon from "./HeaderIcon";
function RightHeader() {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image;
  const username = session?.user?.name;
  return (
    <div className="flex items-center sm:space-x-2 justify-end">
      {/* profile pic */}
      <Image
        onClick={signOut}
        className="rounded-full cursor-pointer"
        alt=""
        src={imageUrl}
        width={40}
        height={40}
        layout="fixed"
      />
      <p className="whitespace-nowrap font-semibold pr-3 cursor-pointer">
        {username}
      </p>
      <ViewGridIcon className="icon" />
      <ChatIcon className="icon" />
      <BellIcon className="icon" />
      <ChevronDownIcon className="icon" />
    </div>
  );
}

export default RightHeader;
