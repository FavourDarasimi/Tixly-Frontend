import Image from "next/image";
import Link from "next/link";
import hero_section from "@/public/images/hero-section.png";
import Button from "@/components/Button";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="flex items-center h-screen mx-20">
      <div className="w-[50%] space-y-7">
        <div className="space-y-3">
          <div className="flex gap-1 text-[12px]  items-center border rounded-full py-1 px-3 w-fit border-gray-400">
            <span className="bg-[#FF5722] w-2 h-2 rounded-full animate-pulse"></span>
            <p className="tracking-widest ">
              Introducing QR Code Scanning Support
            </p>
          </div>
          <h1 className="text-7xl max-w-2xl ">
            The Easiest Way to Host and Attend Live{" "}
            <span className="text-[#FF5722]">Events</span>
          </h1>
        </div>
        <h2 className="text-xl max-w-2xl">
          Book Tickets in seconds or manage your own event with real-time
          analytics and QR check-ins
        </h2>
        <div className="flex gap-3">
          <Link href="/join">
            <Button
              size="large"
              type="primary"
              className="rounded-lg  group inline-flex gap-2 items-center"
            >
              Get Started
              <FaArrowRight
                size={12}
                className="sm:w-4 sm:h-4 group-hover:ml-2 group-hover:mr-0 mr-2 transition-all duration-300 "
                color="white"
              />
            </Button>
          </Link>
          <Button size="large" type="secondary" className="rounded-lg">
            Browse Events
          </Button>
        </div>
      </div>

      <Image src={hero_section} alt="" className="w-[50%]" />
    </div>
  );
};

export default HeroSection;
