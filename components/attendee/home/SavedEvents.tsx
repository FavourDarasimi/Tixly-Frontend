"use client";

import Link from "next/link";
import { Event } from "@/types/event";
import { Heart, ChevronRight } from "lucide-react";
import EventCard from "@/components/EventsCard";

type EventArray = {
  savedEvents: Event[];
};

const SavedEvents = ({ savedEvents }: EventArray) => {
  if (savedEvents?.length == 0) {
    return (
      <section className="py-8 bg-gray-50/50">
        <div className="max-w-[1500px] mx-auto px-6 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No saved events yet</h3>
            <p className="text-gray-500 mb-4">Events you bookmark will appear here.</p>
             <Link
              href="/events"
              className="inline-flex items-center gap-2 text-[#FF5722] hover:text-[#E64A19] font-semibold"
            >
              Browse Events
              <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 ">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#FF5722] fill-[#FF5722]" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Saved Events
              </h2>
              <p className="text-sm text-gray-500">Events you've bookmarked</p>
            </div>
          </div>
          
          <Link
            href="/events?filter=saved"
            className="text-[#FF5722] hover:text-[#E64A19] font-semibold flex items-center gap-2 "
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedEvents &&
            savedEvents
              .slice(0, 4)
              .map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
};

export default SavedEvents;
