"use client";

import Image from "next/image";
import eventimg from "@/public/images/wmremove-transformed.webp";
import Button from "./Button";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  Ticket,
  Shield,
  BookmarkIcon,
  Zap,
  BookMarked,
} from "lucide-react";
import { Event } from "@/types/event";
import { useAuth } from "@/contexts/AuthContext";

type EventProps = {
  event: Event;
};

const EventCard = ({ event }: EventProps) => {
  const { isAuthenticated } = useAuth();
  const eventDate = new Date(event.startDateTime);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Link
      key={event.id}
      href={`/events/${event.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <Image
          src={eventimg}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[14px] font-semibold text-[#FF5722]">
            {event.category.toUpperCase()}
          </p>
          {isAuthenticated ? <BookmarkIcon className="w-5 h-5" /> : ""}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF5722] transition">
          {event.title}
        </h3>

        <div className="space-y-1.5 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FF5722]" />
            <span>{formatDate(event.startDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF5722]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
