import React from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import eventimg from "@/public/images/wmremove-transformed.webp";
import Button from "./Button";

type EventProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  organizer: {
    name: string;
    avatar: string;
  };
  isFeatured: boolean;
};

const isAuthenticated = false;

const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  price,
  currency,
  image,
  category,
  organizer,
  isFeatured,
}: EventProps) => {
  const eventDate = new Date(date);

  // Format Date for the top-right badge (e.g., "28 SEP")
  const day = eventDate.getDate();
  const month = eventDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  // Format Time (e.g., "9:00 AM")
  const time = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:scale-105 transition duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={eventimg}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay: Date Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md text-center min-w-[60px]">
          <div className="text-gray-900 font-bold text-lg leading-none mb-1">
            {day}
          </div>
          <div className="text-[#FF5722] text-xs font-bold">{month}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {title}
        </h3>

        {/* Time and Location Row */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#FF5722]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#FF5722]" />
            <span className="truncate max-w-[150px]">{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Button Section */}
        <div className="flex gap-5">
          {isAuthenticated ? (
            <Button size="medium" className="w-full" type="primary">
              Buy Tickets
            </Button>
          ) : (
            ""
          )}

          <Button size="medium" className="w-full" type="secondary">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
