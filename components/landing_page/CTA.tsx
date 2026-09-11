import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="px-4 sm:px-6 pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-stone-950 px-6 py-16 sm:py-20 text-center max-w-6xl mx-auto">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(30rem 16rem at 50% -4rem, rgba(255,87,34,0.45), transparent 65%), radial-gradient(24rem 18rem at 90% 110%, rgba(255,138,101,0.25), transparent 60%)",
          }}
        />
        <p className="relative inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
          Join 12,000+ hosts & goers
        </p>
        <h2 className="font-display relative mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.02]">
          Your crowd is already out. <span className="text-[#FF6A3D]">Come through.</span>
        </h2>

        <p className="relative text-white/70 text-[17px] max-w-xl mx-auto mt-4">
          Discover something tonight, or host it yourself — tickets, QR
          check-ins, and payouts handled.
        </p>

        <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/join"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#FF5722] px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-[#E64A19] hover:-translate-y-px"
          >
            Get started for free
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/events"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            Browse events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
