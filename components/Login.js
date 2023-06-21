import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
function Login() {
  return (
    <div className="grid place-items-center">
      <Image
        alt=""
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1
        onClick={signIn}
        className="bg-blue-500 rounded-full p-5 text-white text-center cursor-pointer"
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
