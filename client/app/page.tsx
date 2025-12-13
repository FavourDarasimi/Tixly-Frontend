import FAQ from "@/components/landing_page/FAQ";
import HeroSection from "@/components/landing_page/HeroSection";
import HowItWorks from "@/components/landing_page/HowItWorks";
import TrendingEvents from "@/components/landing_page/TrendingEvents";

export default function Home() {
  return (
    <section className="">
      <HeroSection />
      <TrendingEvents />
      <HowItWorks />
      <FAQ />
    </section>
  );
}
