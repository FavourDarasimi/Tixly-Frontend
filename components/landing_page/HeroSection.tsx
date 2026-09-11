import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  CalendarCheck,
  MapPin,
  Music4,
  QrCode,
  Sparkles,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";

const floatingChips = [
  {
    className: "left-[4%] top-[22%] hidden lg:flex",
    rotate: "-8deg",
    bg: "bg-violet-200/80",
    icon: <Music4 className="w-5 h-5" />,
    label: "Afrobeat night",
  },
  {
    className: "right-[5%] top-[24%] hidden lg:flex",
    rotate: "7deg",
    bg: "bg-emerald-200/80",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    label: "Food fest",
  },
  {
    className: "left-[9%] top-[52%] hidden lg:flex",
    rotate: "5deg",
    bg: "bg-amber-200/90",
    icon: <QrCode className="w-5 h-5" />,
    label: "QR entry",
  },
];

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-[#faf7f2] pt-32 sm:pt-40 pb-10">
      {/* soft radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52rem 30rem at 50% -8rem, #ffe7d6 0%, transparent 62%), radial-gradient(36rem 24rem at 88% 30%, #e9f7ef 0%, transparent 60%), radial-gradient(36rem 24rem at 8% 34%, #ede9ff 0%, transparent 60%)",
        }}
      />

      {/* floating chips */}
      {floatingChips.map((chip) => (
        <div
          key={chip.label}
          className={`animate-floaty absolute z-10 ${chip.className}`}
          style={{ "--float-rotate": chip.rotate } as CSSProperties}
        >
          <span
            className={`flex items-center gap-2 rounded-2xl ${chip.bg} px-3.5 py-2.5 text-sm font-semibold text-stone-800 shadow-[0_16px_36px_-16px_rgba(28,25,23,0.4)] backdrop-blur`}
          >
            {chip.icon}
            {chip.label}
          </span>
        </div>
      ))}

      {/* sparkle accents */}
      <Sparkles
        aria-hidden
        className="absolute right-[24%] top-[19%] hidden md:block w-6 h-6 text-[#FF5722]"
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/70 px-4 py-1.5 text-[12px] font-semibold tracking-[0.14em] uppercase text-stone-600">
          <span className="h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
          Live events · QR tickets · Real crowds
        </p>

        <h1 className="font-display font-extrabold text-stone-900 text-[13vw] sm:text-7xl lg:text-[92px] leading-[0.95]">
          A place for
          <span className="block text-[#FF5722]">your crowd.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-stone-500">
          For the late-night concerts, the niche meetups, and the friends who
          just get it. Discover events, check in with a scan, make yourself at
          home.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/events"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#FF5722] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(255,87,34,0.7)] transition hover:bg-[#E64A19] hover:-translate-y-px"
          >
            Find your crowd
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/join"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 py-4 text-[15px] font-semibold text-stone-900 transition hover:-translate-y-px hover:shadow-lg"
          >
            <Ticket className="w-4 h-4" />
            Host an event
          </Link>
        </div>

        {/* handwritten aside */}
        <div className="pointer-events-none absolute right-[2%] top-[62%] hidden xl:block rotate-[8deg]">
          <p className="font-hand text-[22px] leading-tight text-stone-500 text-right">
            less scrolling,
            <br />
            more showing up.
          </p>
          <svg
            width="44"
            height="46"
            viewBox="0 0 44 46"
            fill="none"
            className="ml-auto mt-1 text-stone-500"
            aria-hidden
          >
            <path
              d="M32 4C30 14 27 24 16 28M16 28l-3-7m3 7l7-2m-7 15c8 0 13-5 14-14"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* App preview window */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-16">
        <div className="overflow-hidden rounded-2xl border border-[#e7ded2] bg-white shadow-[0_40px_90px_-40px_rgba(28,25,23,0.45)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-stone-200/80 bg-[#f5f0e8] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="ml-3 hidden sm:inline rounded-md bg-white border border-stone-200 px-3 py-1 text-xs text-stone-500">
              tixly — tonight near you
            </span>
          </div>

          <div className="grid md:grid-cols-[240px_1fr_260px]">
            {/* left rail */}
            <div className="hidden md:block border-r border-stone-200/70 bg-[#fbf8f2] p-4">
              <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                Tonight
              </p>
              <div className="mt-3 space-y-1 text-sm font-medium">
                {[
                  { icon: <Music4 className="w-4 h-4" />, label: "Concerts", active: true },
                  { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Food & drink" },
                  { icon: <Sparkles className="w-4 h-4" />, label: "Tech meetups" },
                  { icon: <MapPin className="w-4 h-4" />, label: "Near me" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
                      item.active
                        ? "bg-[#e9e4b8]/60 text-stone-900"
                        : "text-stone-500"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-stone-900 p-4 text-white">
                <p className="text-[13px] font-semibold flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" /> Door check-in
                </p>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Scan QR tickets offline. No lines, no duplicates.
                </p>
              </div>
            </div>

            {/* center feed */}
            <div className="p-4 sm:p-6 text-left">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-stone-900">
                  # tonight <span className="font-normal text-stone-400">· Lagos · 128 going</span>
                </p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  12 around you
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  {
                    initial: "J",
                    bg: "bg-violet-200",
                    name: "Jazz under stars",
                    meta: "Freedom Park · 7:00 PM · from ₦5,000",
                    tag: "42 going",
                  },
                  {
                    initial: "A",
                    bg: "bg-orange-200",
                    name: "Street food festival",
                    meta: "Muri Okunola Park · 4:00 PM · Free entry",
                    tag: "3k going",
                  },
                  {
                    initial: "S",
                    bg: "bg-emerald-200",
                    name: "Builders meetup",
                    meta: "Tech Hub Yaba · 6:30 PM · RSVP",
                    tag: "218 going",
                  },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-white p-3.5 hover:shadow-md transition"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${row.bg} text-sm font-bold text-stone-800`}
                    >
                      {row.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-900">
                        {row.name}
                      </p>
                      <p className="truncate text-[13px] text-stone-500">
                        {row.meta}
                      </p>
                      <span className="mt-2 inline-block rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] font-medium text-stone-500">
                        {row.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right ticket stub */}
            <div className="hidden md:flex flex-col border-l border-stone-200/70 bg-[#fbf8f2] p-4">
              <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
                <div className="bg-[#FF5722] p-4 text-white">
                  <p className="text-[11px] uppercase tracking-widest opacity-80">
                    Admit one
                  </p>
                  <p className="font-display text-lg font-bold leading-tight">
                    Jazz under stars
                  </p>
                </div>
                <div className="p-4 space-y-2 text-[13px] text-stone-600">
                  <p className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-[#FF5722]" /> Sat · 7:00 PM
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF5722]" /> Freedom Park
                  </p>
                  <div className="grid place-items-center rounded-xl border-dashed border-2 border-stone-200 py-4">
                    <QrCode className="w-10 h-10 text-stone-800" />
                    <p className="mt-1 text-[11px] font-mono tracking-widest text-stone-400">
                      TIX-8F42
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-stone-400">
                Instant email delivery · no printing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
