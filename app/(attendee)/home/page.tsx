import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Star,
  Ticket,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import eventimg from "@/public/images/wmremove-transformed.webp";

import { getEvents } from "@/lib/event-api/api";
import UpcomingEvents from "@/components/attendee/home/UpcomingEvents";
import { getUpcomingEvents, getNewEvents } from "@/lib/event-api/api";
import HomeHeader from "@/components/attendee/home/HomeHeader";
import NewEvents from "@/components/attendee/home/NewEvents";
import { useAuth } from "@/contexts/AuthContext";

// Categories
const CATEGORIES = [
  { id: "all", label: "All", icon: "🎯" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "sport", label: "Sport", icon: "⚽" },
  { id: "exhibition", label: "Exhibition", icon: "🎨" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "photography", label: "Photography", icon: "📷" },
];

// Why choose us features
const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Booking",
    description: "Book tickets in seconds with our seamless checkout process",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Your transactions are protected with bank-level security",
  },
  {
    icon: <Ticket className="w-6 h-6" />,
    title: "QR Code Tickets",
    description: "Get instant access with digital tickets on your phone",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Trusted by Thousands",
    description: "Join our community of event enthusiasts",
  },
];

// Stats
const STATS = [
  { number: "10K+", label: "Events Hosted" },
  { number: "50K+", label: "Happy Attendees" },
  { number: "500+", label: "Event Organizers" },
  { number: "4.8/5", label: "Average Rating" },
];

const Home = async () => {
  // const [selectedLocation, setSelectedLocation] = useState("Lagos, Nigeria");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [events, setEvents] = useState<Event[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const new_response = await getNewEvents();
  const newEvents = new_response.results;

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
        <HomeHeader />
      </section>

      {/* Top Trending Events */}
      {/* {trendingEvents.length > 0 && (
        <section className="py-16 ">
          <div className="max-w-7xl xl:max-w-[1500px]  mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-[#FF5722]" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Top 3 <span className="text-[#FF5722]">trending</span>{" "}
                    events
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Most popular events right now
                  </p>
                </div>
              </div>
              <Link
                href="/events"
                className="text-[#FF5722] hover:text-[#E64A19] font-semibold flex items-center gap-2 group"
              >
                View all
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  price={event.price}
                  currency={event.currency}
                  category={event.category}
                  organizer={event.organizer}
                  isFeatured={event.isFeatured}
                />
              ))}
            </div>
          </div>
        </section>
      )} */}
      {/* Upcoming in 24h */}
      <UpcomingEvents />

      {/* New Events */}
      <NewEvents newEvents={newEvents} />

      {/* Highlight of the Week */}
      {/* {events.length > 0 && (
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Highlight of this week
              </h2>
              <p className="text-gray-600">Featured event you shouldn't miss</p>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#FF5722]/30 shadow-xl">
              <div className="grid md:grid-cols-2">
                {/* Content 
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-[#FF5722] text-white text-sm font-bold px-4 py-2 rounded-full w-fit mb-6">
                    ⭐ FEATURED EVENT
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {events[0].title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {events[0].description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-[#FF5722]" />
                      <span className="font-medium">
                        {formatDate(events[0].date)} at{" "}
                        {formatTime(events[0].date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-[#FF5722]" />
                      <span className="font-medium">{events[0].location}</span>
                    </div>
                  </div>

                  <Link href={`/events/${events[0].id}`}>
                    <button className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                      Get Tickets Now
                    </button>
                  </Link>
                </div>

                {/* Image 
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={eventimg}
                    alt={events[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#FF5722]/10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-[#FF5722]">Tixly</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make discovering and attending events easier than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl border border-gray-200 hover:border-[#FF5722] hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF5722]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Amazing Events?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of event-goers and never miss out on great
            experiences
          </p>
          <Link href="/events">
            <button className="bg-white text-[#FF5722] hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
              Explore All Events
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
