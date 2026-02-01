"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventPaginationProps = {
  next: string | null;
  previous: string | null;
  count: number;
};

const EventPagination = ({ next, previous, count }: EventPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Since the API returns next/prev URLs, we can use those or just simple page counters
  // if we knew the page size. Standard DRF page size is often 10 or 20.
  // We'll rely on the presence of next/previous to enable buttons.

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/events?${params.toString()}`);
  };

  if (!next && !previous) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        disabled={!previous}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
          ${!previous 
            ? "border-gray-100 text-gray-300 cursor-not-allowed" 
            : "border-gray-200 text-gray-700 hover:border-[#FF5722] hover:text-[#FF5722]"
          }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <span className="text-sm text-gray-500 font-medium">
        Page {currentPage}
      </span>

      <button
        disabled={!next}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors
          ${!next 
            ? "border-gray-100 text-gray-300 cursor-not-allowed" 
            : "border-gray-200 text-gray-700 hover:border-[#FF5722] hover:text-[#FF5722]"
          }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default EventPagination;
