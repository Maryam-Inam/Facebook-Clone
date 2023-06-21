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
  // console.log(session);
  return (
    <div className="flex items-center sm:space-x-2 justify-end">
      {/* profile pic */}
      <Image
        onClick={signOut}
        className="rounded-full cursor-pointer"
        alt=""
        src={session.user.image}
        width={40}
        height={40}
        layout="fixed"
      />
      <p className="whitespace-nowrap font-semibold pr-3 cursor-pointer">
        {session.user.name}
      </p>
      <ViewGridIcon className="icon" />
      <ChatIcon className="icon" />
      <BellIcon className="icon" />
      <ChevronDownIcon className="icon" />
    </div>
  );
}

export default RightHeader;
