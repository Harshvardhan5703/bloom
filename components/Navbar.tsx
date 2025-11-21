"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="bloom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          BLOOM
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* If logged in → show avatar + logout */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="group relative">
              <button className="rounded-full border border-dark-3 p-[1px]">
                <Image
                  src={user.avatar || "/images/avatar-1.jpeg"}
                  alt="user avatar"
                  width={38}
                  height={38}
                  className="rounded-full object-cover"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 hidden w-40 rounded-md bg-dark-2 p-2 text-sm shadow-lg group-hover:block">
                <p className="px-2 py-1 text-gray-300">{user.name}</p>
                <hr className="my-1 border-dark-3" />
                <button
                  onClick={async () => {
                    await logout();
                    router.push("/sign-in");
                  }}
                  className="w-full rounded px-2 py-1 text-left text-red-400 hover:bg-dark-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* If not logged in → show Sign In */
          <button
            onClick={() => router.push("/sign-in")}
            className="rounded-md bg-blue-1 px-4 py-2 font-semibold text-white hover:bg-blue-2"
          >
            Sign In
          </button>
        )}

        {/* Mobile Nav keeps working */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
