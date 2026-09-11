import EventCard from "../EventsCard";
import { Event } from "@/types/event";

type EventArray = {
  events: Event[];
};

const TrendingEvents = async ({ events }: EventArray) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end items-start justify-between gap-4 mb-8">
        <div>
          <p className="inline-flex items-center rounded-full border border-[#e7ded2] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
            Fresh this week
          </p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
            Upcoming events
          </h2>
          <p className="text-stone-500 mt-2 text-[16px]">
            Less scrolling, more showing up. Here’s what your crowd is doing.
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
