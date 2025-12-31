"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Ticket,
  QrCode,
} from "lucide-react";
import eventimg from "@/public/images/wmremove-transformed.webp";
import { Event } from "@/types/event";

type EventArray = {
  upcomingEvents: Event[];
};

const UpcomingEvents = ({ upcomingEvents }: EventArray) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const date2 = new Date();
    if (date.getDate() == date2.getDate()) {
      return "Today";
    } else if (date.getDate() == date2.getDate() + 1) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (upcomingEvents?.length == 0) {
    return null;
  }
  return (
    <section className="py-16">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between ">
          <div className="flex gap-1 items-center ">
            <Ticket className="w-7 h-7" color="#FF5722" />
            <h2 className="text-2xl font-bold text-gray-900 ">
              Your Next Event
            </h2>
          </div>
          <Link
            href="/events"
            className="text-[#FF5722] hover:text-[#E64A19] font-semibold flex items-center gap-2"
          >
            View all tickets
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="">
          {upcomingEvents &&
            upcomingEvents.slice(0, 1).map((event: Event) => {
              const eventDate = event.startDateTime || "";

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group bg-white w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="flex  p-6 mx-20 w-full h-full ">
                    <div className="w-1/2 h-60 shrink-0 rounded-l-xl overflow-hidden bg-gray-100">
                      <Image
                        src={eventimg}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="border-y border-y-gray-300 border-r border-r-gray-300 rounded-r-xl h-60 w-full pl-5 py-5 flex flex-col justify-between">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#FF5722] transition">
                        {event.title}
                      </h3>

                      <div className="space-y-1.5 text-[15px] text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FF5722]" />
                          <span>{formatDate(eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#FF5722]" />
                          <span>{formatTime(eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#FF5722]" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex items-center font-medium gap-2 rounded-lg border border-gray-300 py-2 px-4 text-[15px]">
                          <QrCode className="w-4 h-4" />
                          View Ticket
                        </button>
                        <button className="flex text-[#FF5722] bg-[#FF5722]/10 items-center font-medium gap-2 rounded-lg border border-gray-300 py-2 px-4 text-[15px]">
                          <QrCode className="w-4 h-4" />
                          View Event Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
