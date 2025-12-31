"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Event } from "@/types/event";
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
  Zap,
} from "lucide-react";
import EventCard from "@/components/EventsCard";
import { getUpcomingEvents, getNewEvents } from "@/lib/event-api/api";

type EventArray = {
  newEvents: Event[];
};

const NewEvents = ({ newEvents }: EventArray) => {
  if (newEvents?.length == 0) {
    return null;
  }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl xl:max-w-[1500px]  mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              New events in your area
            </h2>
            <p className="text-gray-600">Freshly added events you might like</p>
          </div>
          <Link
            href="/events"
            className="text-[#FF5722] hover:text-[#E64A19] font-semibold flex items-center gap-2"
          >
            View more
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newEvents &&
            newEvents
              .slice(0, 8)
              .map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
};

export default NewEvents;
