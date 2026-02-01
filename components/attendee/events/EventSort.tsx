"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function EventSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentSort = searchParams.get("ordering") || "-startDateTime"; 

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("ordering", value);
    router.push(`/events?${params.toString()}`);
    setIsOpen(false);
  };

  const getLabel = () => {
    switch (currentSort) {
      case "startDateTime": return "Oldest";
      case "-startDateTime": return "Newest";
      default: return "Newest";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-300 bg-white"
      >
        {getLabel()}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1">
          <button
            onClick={() => handleSort("-startDateTime")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 bg-white"
          >
            Newest
          </button>
          <button
            onClick={() => handleSort("startDateTime")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 bg-white"
          >
            Oldest
          </button>
        </div>
      )}
    </div>
  );
}
