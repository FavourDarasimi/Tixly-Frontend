import CTA from "@/components/landing_page/CTA";
import FAQ from "@/components/landing_page/FAQ";
import FeaturesSection from "@/components/landing_page/FeaturesSection";
import HeroSection from "@/components/landing_page/HeroSection";
import HowItWorks from "@/components/landing_page/HowItWorks";
import TrendingEvents from "@/components/landing_page/TrendingEvents";
import { getEvents } from "@/lib/event-api/api";

const Home = async () => {
  const response = await getEvents();
  const events = response.results;
  return (
    <section className="">
      <HeroSection />
      <TrendingEvents events={events} />
      <HowItWorks />
      <FeaturesSection />
      <FAQ />
      <CTA />
    </section>
  );
};

export default Home;
