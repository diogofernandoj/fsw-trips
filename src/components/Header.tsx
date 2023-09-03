"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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
        <Link href="/">
          <Image width={183} height={32} src="/logo.png" alt="FSW Logo" />
        </Link>
        {status === "unauthenticated" && (
          <button
            onClick={handleLoginClick}
            className="font-semibold text-primary"
          >
            Login
          </button>
        )}
        {status === "authenticated" && (
          <div className="z-10 flex items-center gap-1 border border-solid border-gray-300 p-2 rounded-full relative">
            {!menu && (
              <button>
                <MdMenu
                  size="1.5rem"
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setMenu(true)}
                />
              </button>
            )}
            {!!menu && (
              <button>
                <MdClose
                  size="1.5rem"
                  className="text-primary cursor-pointer"
                  onClick={() => setMenu(false)}
                />
              </button>
            )}
            <Image
              width={30}
              height={30}
              src={data?.user?.image!}
              alt={data?.user?.name!}
              className="rounded-full"
            />

            {!!menu && (
              <div className="mt-[1px] absolute top-full right-0 w-full bg-walterWhite shadow-lg flex flex-col justify-center items-center rounded-lg">
                <Link
                  href="/my-trips"
                  className="text-primary font-medium text-xs pt-2 pb-1 text-center"
                >
                  Minhas viagens
                </Link>
                <div className="border-b border border-[#e5e5e5]  w-4/5"></div>
                <button
                  className="text-primary font-medium text-xs pb-2 pt-1"
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
