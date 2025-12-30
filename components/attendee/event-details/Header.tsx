import React, { ReactNode } from "react";
import Image from "next/image";
import { Event } from "@/types/event";
import {
  MapPin,
  Calendar,
  Ticket,
  Music,
  Code,
  Mic2,
  Wrench,
  Users,
  GraduationCap,
  BookmarkIcon,
  PartyPopper,
  Dumbbell,
  HelpCircle,
  Drama,
} from "lucide-react";
import Button from "@/components/Button";

const categoryIcons: Record<
  | "music"
  | "sports"
  | "conference"
  | "workshop"
  | "festival"
  | "theater"
  | "tech"
  | "other",
  ReactNode
> = {
  music: <Music size={18} />,
  sports: <Dumbbell size={18} />,
  conference: <Mic2 size={18} />,
  workshop: <Wrench size={18} />,
  festival: <PartyPopper size={18} />,
  theater: <Drama size={18} />,
  tech: <Code size={18} />,
  other: <HelpCircle size={18} />,
};

type EventDetails = {
  data: Event;
};

const Header = ({ data }: EventDetails) => {
  function formatEventDate(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const sameMonth =
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    if (sameMonth) {
      return `${startDate.toLocaleString("en-US", {
        month: "short",
      })} ${startDate.getDate()}–${endDate.getDate()}, ${endDate.getFullYear()}`;
    }

    const sameDay =
      startDate.getDay() === endDate.getDay() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    if (sameDay) {
      return `${startDate.toLocaleString("en-US", {
        month: "short",
      })} ${startDate.getDate()}}, ${endDate.getFullYear()}`;
    }

    // Fallback if months differ
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} – ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  const getCategoryIcon = (category: string) =>
    categoryIcons[category as keyof typeof categoryIcons] ??
    categoryIcons.other;

  return (
    <div className="">
      <div className="relative  h-[800px]">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover "
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute left-0 bottom-0 px-5 py-10 text-white space-y-7 w-[50%]">
          <div className="flex gap-5">
            <p
              className="inline-flex items-center gap-2 rounded-full 
            bg-white/20 backdrop-blur-md 
            px-5 py-2"
            >
              <Calendar className="w-5 h-5" />
              {formatEventDate(data.startDateTime, data.endDateTime)}
            </p>
            <p
              className="inline-flex items-center gap-2 rounded-full 
            bg-white/20 backdrop-blur-md 
            px-5 py-2"
            >
              <MapPin className="w-5 h-5" />
              {data.location}
            </p>
            <p
              className="inline-flex items-center gap-2 rounded-full 
            bg-[#FF5722] backdrop-blur-md 
            px-5 py-2"
            >
              {getCategoryIcon(data.category)}
              {data.category}
            </p>
          </div>
          <h1 className="text-7xl font-bold">{data.title}</h1>
          <h4 className="text-gray-300 text-[22px] ">
            {data.short_description}
          </h4>
          <Button
            type="primary"
            size="large"
            className="rounded-full flex gap-5 items-center"
          >
            <Ticket />
            Get Tickets - From ${data.min_price}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
