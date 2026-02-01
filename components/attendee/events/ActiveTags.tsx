"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const ActiveTags = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const category = params.get("category");
  const search = params.get("search");
  const minPrice = params.get("min_price");
  const maxPrice = params.get("max_price");
  const location = params.get("location");
  const startDate = params.get("start_date");
  const endDate = params.get("end_date");
  const isMultiDay = params.get("is_multi_day");

  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);
    router.push(`/events?${newParams.toString()}`);
  };

  const clearAll = () => {
    router.push("/events");
  };

  if (
    !category &&
    !search &&
    !minPrice &&
    !maxPrice &&
    !location &&
    !startDate &&
    !endDate &&
    !isMultiDay
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span className="text-sm font-semibold text-gray-900">Active Filter:</span>
      
      {category && category !== "all" && (
        <Badge label={`Category: ${category}`} onRemove={() => removeFilter("category")} />
      )}
      
      {search && (
        <Badge label={`Search: ${search}`} onRemove={() => removeFilter("search")} />
      )}
      
      {(minPrice || maxPrice) && (
        <Badge 
          label={`Price: ₦${minPrice || 0} - ₦${maxPrice || "Any"}`} 
          onRemove={() => {
            const p = new URLSearchParams(searchParams.toString());
            p.delete("min_price");
            p.delete("max_price");
            router.push(`/events?${p.toString()}`);
          }} 
        />
      )}

      {location && (
        <Badge label={`Location: ${location}`} onRemove={() => removeFilter("location")} />
      )}

      {(startDate || endDate) && (
        <Badge 
            label={`Date: ${startDate || 'Any'} - ${endDate || 'Any'}`} 
            onRemove={() => {
                const p = new URLSearchParams(searchParams.toString());
                p.delete("start_date");
                p.delete("end_date");
                router.push(`/events?${p.toString()}`);
            }} 
        />
      )}

      {isMultiDay && (
        <Badge 
            label={`Duration: ${isMultiDay === 'true' ? 'Multi-day' : 'Single-day'}`} 
            onRemove={() => removeFilter("is_multi_day")} 
        />
      )}

      <button
        onClick={clearAll}
        className="text-sm text-red-500 font-medium hover:text-red-600 underline underline-offset-4 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
};

const Badge = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <button
    
    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF5722] text-white text-sm rounded-full"
  >
    <span className="capitalize">{label}</span>
    <X className="w-3.5 h-3.5 cursor-pointer" onClick={onRemove}/>
  </button>
);

export default ActiveTags;
