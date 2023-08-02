"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => signOut();

  const [menu, setMenu] = useState<boolean>(false);

  return (
    <div className="w-full mx-auto max-w-6xl h-20 flex items-center">
      <nav className="w-11/12 m-auto flex items-center justify-between">
        <Image width={183} height={32} src="/logo.png" alt="FSW Logo" />
        {status === "unauthenticated" && (
          <button
            onClick={handleLoginClick}
            className="font-semibold text-primary"
          >
            Login
          </button>
        )}
        {status === "authenticated" && (
          <div className="flex items-center gap-1 border border-solid border-gray-300 p-2 rounded-full relative">
            {!menu && (
              <MdMenu
                size="1.5rem"
                className="text-gray-400 cursor-pointer"
                onClick={() => setMenu(true)}
              />
            )}
            {!!menu && (
              <MdClose
                size="1.5rem"
                className="text-primary cursor-pointer"
                onClick={() => setMenu(false)}
              />
            )}
            <Image
              width={30}
              height={30}
              src={data?.user?.image!}
              alt={data?.user?.name!}
              className="rounded-full"
            />

            {!!menu && (
              <div className="absolute top-full right-0 w-full h-full shadow-md flex justify-center items-center rounded-lg">
                <button
                  className="text-primary font-medium text-sm"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
