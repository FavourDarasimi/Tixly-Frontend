"use client";

import { Bell, MapPin, Search } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  userName: string;
  location: string;
  onLocationChange?: (location: string) => void;
  onSearch?: (query: string) => void;
}

const HomeHeader = ({
  userName,
  location,
  onLocationChange,
  onSearch,
}: DashboardHeaderProps) => {
  const [search, setSearch] = useState("");

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-sm text-gray-500">
            Discover events happening around you
          </p>
        </div>

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className="relative rounded-full border p-2 text-gray-600 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          {/* Notification dot */}
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#FF5722]" />
        </button>
      </div>

      {/* Search & Location */}
      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, dates, cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch?.(search)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
          />
        </div>

        {/* Location Selector */}
        <div className="relative w-full md:w-64">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
          >
            <option>New York</option>
            <option>London</option>
            <option>Berlin</option>
            <option>Dubai</option>
            <option>Online</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
