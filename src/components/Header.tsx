"use client";

import { fadeIn } from "@/animation/variants";
import { motion } from "framer-motion";
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
    <div className="w-full mx-auto h-20 flex items-center lg:border-b lg:border-[#eee]">
      <nav className="w-11/12 max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image width={183} height={32} src="/fsw-logo.png" alt="FSW Logo" />
        </Link>
        {status === "loading" && (
          <div className="animate-pulse bg-gray-200 h-6 w-16"></div>
        )}
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
              <motion.div
                variants={fadeIn("down", 0)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mt-[1px] absolute top-full right-0 w-[110%] bg-white shadow-lg flex flex-col justify-center items-center rounded-lg border border-walterWhite"
              >
                <Link
                  href="/my-trips"
                  className="text-primary font-medium text-xs pt-2 pb-1 text-center"
                  onClick={() => setMenu(false)}
                >
                  Minhas viagens
                </Link>
                <div className="border-b border-[#e5e5e5]  w-4/5"></div>
                <button
                  className="text-primary font-medium text-xs pb-2 pt-1"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
