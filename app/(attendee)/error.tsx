"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AttendeeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Attendee route error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load this page. Please try again or browse all
          events.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="py-3 px-6 rounded-full font-semibold bg-[#FF5722] hover:bg-[#E64A19] text-white transition-colors"
          >
            Try again
          </button>
          <Link
            href="/events"
            className="py-3 px-6 rounded-full font-semibold border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
          >
            Browse events
          </Link>
        </div>
      </div>
    </div>
  );
}
