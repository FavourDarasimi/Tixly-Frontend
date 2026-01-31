"use client";

import Link from "next/link";
import { Event } from "@/types/event";
import { ChevronRight, TrendingUp } from "lucide-react";
import EventCard from "@/components/EventsCard";

type EventArray = {
  trendingEvents: Event[];
};

const TrendingEvents = ({ trendingEvents }: EventArray) => {
  if (!trendingEvents || trendingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-orange-50/30">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-[#FF5722]" />
              <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Trending This Week
              </h2>            <p className="text-sm text-gray-500">Top-selling and highly anticipated events</p></div>

            </div>
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
          {trendingEvents.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingEvents;
