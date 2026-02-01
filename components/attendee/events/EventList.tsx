import React from "react";
import { getEvents } from "@/lib/event-api/api";
import EventCard from "@/components/EventsCard";
import EventPagination from "@/components/attendee/events/EventPagination";
import ActiveTags from "@/components/attendee/events/ActiveTags";
import EventSort from "@/components/attendee/events/EventSort";
import { Event } from "@/types/event";
import { Ticket } from "lucide-react";

type SearchParams = {
  search?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  page?: string;
  min_price?: string;
  max_price?: string;
  location?: string;
  ordering?: string;
  is_multi_day?: string;
};

const EventList = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = searchParams;
  
  // Construct query string
  const queryParts = [];
  if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
  if (params.category && params.category !== 'all') queryParts.push(`category=${encodeURIComponent(params.category)}`);
  if (params.start_date) queryParts.push(`start_date=${encodeURIComponent(params.start_date)}`);
  if (params.end_date) queryParts.push(`end_date=${encodeURIComponent(params.end_date)}`);
  if (params.page) queryParts.push(`page=${encodeURIComponent(params.page)}`);
  if (params.min_price) queryParts.push(`min_price=${encodeURIComponent(params.min_price)}`);
  if (params.max_price) queryParts.push(`max_price=${encodeURIComponent(params.max_price)}`);
  if (params.location) queryParts.push(`location=${encodeURIComponent(params.location)}`);
  if (params.ordering) queryParts.push(`ordering=${encodeURIComponent(params.ordering)}`);
  if (params.is_multi_day) queryParts.push(`is_multi_day=${encodeURIComponent(params.is_multi_day)}`);

  const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  
  const data = await getEvents(queryString);
  const events: Event[] = data.results || [];
  const totalCount = data.count || events.length;

  return (
    <main className="flex-1 pt-5">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <p className="text-gray-900 ">
                Showing 1-{events.length} of {totalCount} results
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 font-medium">
                <span className="text-sm">Sort By:</span>
                <EventSort />
            </div>
        </div>

        {/* Active Filters */}
        <ActiveTags />

        {events.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
            
            <EventPagination 
                next={data.next} 
                previous={data.previous} 
                count={totalCount} 
            />
        </>
        ) : (
        <div className="flex flex-col items-center justify-center py-20 ">
            <Ticket className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">No events found</h3>
            <p className="text-gray-500 mt-2 text-center max-w-md">
            We couldn't find any events matching your filters. Try adjusting your search or categories.
            </p>
        </div>
        )}
    </main>
  );
};

export default EventList;
