"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Calendar, Filter, X, MapPin } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "music", label: "Music" },
  { id: "sports", label: "Sports" },
  { id: "conference", label: "Conference" },
  { id: "workshop", label: "Workshop" },
  { id: "festival", label: "Festival" },
  { id: "theater", label: "Theater" },
  { id: "tech", label: "Tech" },
  { id: "other", label: "Other" },
];

const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for inputs to allow smooth typing
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max_price") || "");

  // Debouncing search & location
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      // Apply Search
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      // Apply Location
      if (location) {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      params.delete("page");
      router.push(`/events?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, location]); // Removing searchParams from dependency to avoid loops, relying on router.push to refresh



  // Helper for direct simple filters (legacy wrapper if needed, but better to be explicit)
  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/events?${params.toString()}`);
  };

  const multiDay = (e:any) => {
     const isChecked = e.target.checked;
    if (isChecked) applyFilter("is_multi_day", "true"); 
    else applyFilter("is_multi_day", ""); 
  }



  return (
    <div className="bg-white  pt-5 space-y-8 pr-5">
      
      <div className="space-y-6">
        <h3 className="text-lg font-bold">Filter Options</h3>
        
      </div>

         {/* Search (Keep search here as well?) */}
      <div className="space-y-4">
        <h4 className="font-bold ">Keywords</h4>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4 ">
        <h4 className="font-bold ">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label 
              key={cat.id} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                  category === cat.id ? "bg-[#FF5722] border-[#FF5722]" : "border-gray-300 group-hover:border-gray-400"
              }`}>
                   {category === cat.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              
              <input 
                type="radio" 
                name="category"
                value={cat.id}
                checked={category === cat.id}
                onChange={(e) => {
                  setCategory(e.target.value);
                  applyFilter("category", e.target.value);
                }}
                className="hidden" // Custom checkbox styling
              />
              <span className={`text-sm ${
                category === cat.id ? "font-semibold" : "text-gray-700 group-hover:text-gray-900 "
              } transition duration-300`}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h4 className="font-bold ">Price</h4>
        <div className="space-y-3">
             {/* Simple Range Inputs for now */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-2.25 text-gray-600 text-sm">₦</span>
                    <input 
                        type="number"
                        placeholder="Min" 
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            applyFilter("min_price", e.target.value)}}
                        className="w-full pl-6 pr-3 py-2 bg-gray-50 placeholder:text-gray-600 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative flex-1">
                    <span className="absolute left-3 top-2.25 text-gray-600 text-sm">₦</span>
                    <input 
                        type="number"
                        placeholder="Max" 
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            applyFilter("max_price", e.target.value)}}
                        className="w-full pl-6 pr-3 py-2 bg-gray-50 placeholder:text-gray-600 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                </div>
            </div>
            
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h4 className="font-bold ">Location</h4>
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter City or Zip..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
          />
          <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>
      
       {/* Date Range */}
       <div className="space-y-4">
            <h4 className="font-bold">Date Range</h4>
            <div className="space-y-3 ">
                <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-medium">Start Date</label>
                    <input 
                        type="date"
                        value={searchParams.get("start_date") || ""}
                        onChange={(e) => applyFilter("start_date", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-medium">End Date</label>
                    <input 
                        type="date"
                        value={searchParams.get("end_date") || ""}
                        onChange={(e) => applyFilter("end_date", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF5722]"
                    />
                </div>
            </div>
      </div>

       {/* Event Duration */}
       <div className="space-y-4">
         <h4 className="font-bold">Event Duration</h4>
         <div className="space-y-2 ">
      

            <label 
             
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                  searchParams.get("is_multi_day") === "false" ? "bg-[#FF5722] border-[#FF5722]" : "border-gray-300 group-hover:border-gray-400"
              }`}>
                   {searchParams.get("is_multi_day") === "false" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              
              <input 
                type="radio" 
                name="category"
                 checked={searchParams.get("is_multi_day") === "false"}
               onChange={(e) => {
                         const isChecked = e.target.checked;
                         if (isChecked) applyFilter("is_multi_day", "false"); 
                         else applyFilter("is_multi_day", ""); // Clear filter
                    }}
                className="hidden" // Custom checkbox styling
              />
              <span className={`text-sm ${
                searchParams.get("is_multi_day") === "false"? "font-semibold" : "text-gray-700 group-hover:text-gray-900 "
              } transition duration-300`}>
                  Single-day events
              </span>
            </label>
            <label 
             
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                  searchParams.get("is_multi_day") === "true" ? "bg-[#FF5722] border-[#FF5722]" : "border-gray-300 group-hover:border-gray-400"
              }`}>
                   {searchParams.get("is_multi_day") === "true" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              
              <input 
                type="radio" 
                name="category"
                 checked={searchParams.get("is_multi_day") === "true"}
               onChange={(e) => {
                         const isChecked = e.target.checked;
                         if (isChecked) applyFilter("is_multi_day", "true"); 
                         else applyFilter("is_multi_day", ""); // Clear filter
                    }}
                className="hidden" // Custom checkbox styling
              />
              <span className={`text-sm ${
                searchParams.get("is_multi_day") === "true"? "font-semibold" : "text-gray-700 group-hover:text-gray-900 "
              } transition duration-300`}>
                  Multi-day events
              </span>
            </label>

           
         </div>
       </div>


   

    </div>
  );
};

export default FilterSidebar;
