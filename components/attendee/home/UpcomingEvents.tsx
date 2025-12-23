"use client";

import EventCard from "@/components/EventsCard";
import React from "react";

type Event = {
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

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          My Upcoming Events
        </h2>
        <p className="text-gray-500">
          You have no upcoming events —{" "}
          <span className="cursor-pointer font-medium text-[#FF5722] hover:underline">
            discover something new!
          </span>
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        My Upcoming Events
      </h2>

      <div className="grid gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            price={event.price}
            currency={event.currency}
            category={event.category}
            organizer={event.organizer}
            isFeatured={event.isFeatured}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
