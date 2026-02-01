import EventsSkeleton from "@/components/attendee/events/EventsSkeleton";
import FilterSidebar from "@/components/attendee/events/FilterSidebar";

export default function Loading() {
  return (
    <div className="max-w-[1500px] mx-auto px-6 py-10 animate-pulse">
      
      <div className="flex flex-col lg:flex-row gap-8 border-t border-t-gray-200">
        {/* Sidebar Skeleton */}
        <aside className="w-full lg:w-64 shrink-0 border-r border-r-gray-200 pt-5 sticky top-0 h-screen overflow-y-auto hidden lg:block">
            {/* We can just render the real sidebar logic or a skeleton of it. 
                Using real sidebar might cause hydration mismatch if it reads params? 
                Better to use simple skeleton as before to be safe in loading.tsx context. 
            */}
             <div className="space-y-8">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="h-6 w-20 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                </div>
            </div>
        </aside>

        {/* Main Content Skeleton */}
        <EventsSkeleton />
      </div>
    </div>
  );
}
