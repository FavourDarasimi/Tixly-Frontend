"use client";

import Image from "next/image";
import Button from "../Button";
import icon from "@/public/images/tixly-icon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

const AuthNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="p-5 flex justify-between items-center fixed w-full top-0 bg-white z-50 shadow-md">
      <Link href="/">
        <div className="flex gap-1 items-center cursor-pointer">
          <Image src={icon} alt="" width={40} height={40} className="" />
          <h1 className="text-[28px] font-semibold ">Tixly</h1>
        </div>
      </Link>
      {pathname === "/join" || pathname === "/signup" ? (
        <div className="flex gap-3 items-center">
          <h1 className="text-lg">Already a member?</h1>
          <Link href="/login">
            <Button type="primary" size="medium" className="rounded-lg">
              Log in
            </Button>
          </Link>
        </div>
      ) : pathname === "/login" ? (
        <div className="flex gap-3 items-center">
          <h1 className="text-lg">Don't have an account?</h1>
          <Link href="/signup">
            <Button type="primary" size="medium" className="rounded-lg">
              Sign up
            </Button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default AuthNavbar;
