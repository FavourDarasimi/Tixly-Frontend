import React, { Suspense } from "react";
import FilterSidebar from "@/components/attendee/events/FilterSidebar";
import EventList from "@/components/attendee/events/EventList";
import EventsSkeleton from "@/components/attendee/events/EventsSkeleton";

type SearchParams = {
  search?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  page?: string;
  min_price?: string;
  max_price?: string;
  location?: string;
};

const Events = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  
  // Create a key based on params to force Suspense boundary to re-trigger on filter change
  const suspenseKey = JSON.stringify(params);

  return (
    <div className="max-w-[1500px] mx-auto px-6 pb-10 min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 border-r border-r-gray-200  sticky top-24 h-[calc(100vh-5rem)] overflow-y-auto hidden lg:block">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="pt-10 w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Discover Events Near You
            </h1>
            <p className="text-gray-500 mt-2">
              Browse concerts, workshops, conferences, and more happening around you.
            </p>
          </div>
          <Suspense key={suspenseKey} fallback={<EventsSkeleton />}>
            <EventList searchParams={params} />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Events;
