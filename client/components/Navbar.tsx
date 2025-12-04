"use client";

import Image from "next/image";
import Button from "./Button";
import icon from "@/public/images/tixly-icon.png";

const Navbar = () => {
  return (
    <nav className="p-5 flex justify-between items-center sticky top-0">
      <div className="flex gap-1 items-center">
        <Image src={icon} alt="" width={40} height={40} className="" />
        <h1 className="text-2xl font-semibold ">Tixly</h1>
      </div>
      <ul className="flex gap-10 text-[#3a3a3a]">
        <li>About</li>
        <li>Trending</li>
        <li>How it Works</li>
        <li>Features</li>
      </ul>
      <Button>Log in</Button>
    </nav>
  );
};

export default Navbar;
