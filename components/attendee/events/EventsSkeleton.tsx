import React from "react";

const EventsSkeleton = () => {
  return (
    <div className="flex-1 pt-5 animate-pulse">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="h-5 w-48 bg-gray-200 rounded"></div>
        <div className="h-9 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Active Filters */}
      <div className="flex gap-2 mb-6">
        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 h-[320px]"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSkeleton;
