"use client";

import Image from "next/image";
import icon from "@/public/images/tixly-icon.png";
import Link from "next/link";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <header className="fixed w-full top-0 z-50 px-4 sm:px-6 pt-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center rounded-2xl border border-[#e7ded2] bg-[#faf7f2]/85 backdrop-blur-xl px-4 sm:px-5 py-3 shadow-[0_12px_40px_-18px_rgba(28,25,23,0.35)]">
        <div
          onClick={scrollToTop}
          className="flex gap-2 items-center cursor-pointer"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#FF5722] text-white shadow-md">
            <Image src={icon} alt="Tixly" width={22} height={22} className="" />
          </span>
          <h1 className="text-[24px] font-extrabold tracking-tight font-display">
            tixly<span className="text-[#FF5722]">.</span>
          </h1>
        </div>
        <ul className="hidden md:flex gap-8 text-[#57534e] text-[15px] font-medium">
          <li className="hover:text-black cursor-pointer transition duration-300">
            Browse Events
          </li>

          <li
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-black cursor-pointer transition duration-300"
          >
            How it Works
          </li>

          <li
            onClick={() => scrollToSection("features")}
            className="hover:text-black cursor-pointer transition duration-300"
          >
            Features
          </li>
          <li
            onClick={() => scrollToSection("faqs")}
            className="hover:text-black cursor-pointer transition duration-300"
          >
            FAQs
          </li>
        </ul>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-semibold text-stone-700 hover:text-black transition"
          >
            Log in
          </Link>
          <Link href="/join">
            <span className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white hover:bg-black transition-all hover:-translate-y-px">
              Join Tixly
              <span aria-hidden>↗</span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
