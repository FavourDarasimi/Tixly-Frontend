import Link from "next/link";
import { LayoutGrid, Music, Trophy, Mic, Hammer, Flag,  Monitor, MoreHorizontal, Clapperboard, Lightbulb } from "lucide-react";

import { getNewEvents, getUpcomingEvents, getSavedEvents, getRecommendedEvents } from "@/lib/event-api/api";
import UpcomingEvents from "@/components/attendee/home/UpcomingEvents";
import SavedEvents from "@/components/attendee/home/SavedEvents";
import RecommendedEvents from "@/components/attendee/home/RecommendedEvents";

import HomeHeader from "@/components/attendee/home/HomeHeader";
import NewEvents from "@/components/attendee/home/NewEvents";
import { cookies } from "next/headers";

// Categories
const CATEGORIES = [
  { id: "all", label: "All", icon: <LayoutGrid className="w-8 h-8" /> },
  { id: "music", label: "Music", icon: <Music className="w-8 h-8" /> },
  { id: "sports", label: "Sports", icon: <Trophy className="w-8 h-8" /> },
  { id: "conference", label: "Conference", icon: <Mic className="w-8 h-8" /> },
  { id: "workshop", label: "Workshop", icon: <Lightbulb className="w-8 h-8" /> },
  { id: "festival", label: "Festival", icon: <Flag className="w-8 h-8" /> },
  { id: "theater", label: "Theater", icon: <Clapperboard className="w-8 h-8" /> },
  { id: "tech", label: "Tech", icon: <Monitor className="w-8 h-8" /> },
  { id: "other", label: "Other", icon: <MoreHorizontal className="w-8 h-8" /> },
];



const Home = async () => {
  // const [selectedLocation, setSelectedLocation] = useState("Lagos, Nigeria");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [events, setEvents] = useState<Event[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const response = await getUpcomingEvents(cookieString);
  const data = response.next_24_hours;
  const header_data = response.this_month.length;

  const response2 = await getNewEvents();
  const newEvents = response2.results;

  const savedEvents = await getSavedEvents(cookieString);

  // Fetch recommended events
 const recommendedEvents = await getRecommendedEvents(cookieString);
 

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className=" ">
      {/* Hero Section */}
      <section className="mt-5">
        <HomeHeader upcomingEvents={header_data} />
      </section>

      {/* Upcoming in 24h */}
      <UpcomingEvents upcomingEvents={data} />

      {/* Categories */}
      <section className="py-8 bg-gray-50/50">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/events?category=${category.id}`}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF5722]/30 transition-all cursor-pointer group"
              >
                <div className="mb-3 text-[#FF5722] group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-[#FF5722]">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Events */}
      <RecommendedEvents recommendedEvents={recommendedEvents} />

      {/* Saved Events */}
      <SavedEvents savedEvents={savedEvents} />

      {/* New Events */}
      <NewEvents newEvents={newEvents} />

      
    </div>
  );
};

export default Home;
