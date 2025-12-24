import React from "react";
import eventimg from "@/public/images/wmremove-transformed.webp";
import EventCard from "../EventsCard";
import { Event } from "@/types/event";

type EventArray = {
  events: Event[];
};

const TrendingEvents = async ({ events }: EventArray) => {
  return (
    <section className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 py-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 mt-1 text-lg">
            Discover what's happening near you and plan ahead.
          </p>
        </div>

        {/* View All */}
        <a
          href="/events"
          className="text-sm font-semibold text-[#FF5722] hover:underline"
        >
          View all →
        </a>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.slice(0, 4).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No upcoming events yet. Check back soon!
        </div>
      )}
    </section>
  );
};

export default TrendingEvents;
