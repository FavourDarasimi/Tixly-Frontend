"use client";

import { useState } from "react";
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

type EventArray = {
  newEvents: Event[];
};

const NewEvents = ({ newEvents }: EventArray) => {
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

        {newEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-lg mb-4">
              No events found in this category
            </p>
            <button className="text-[#FF5722] font-semibold hover:underline">
              View all events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newEvents.slice(0, 8).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewEvents;
