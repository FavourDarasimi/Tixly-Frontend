"use client";

import { useState } from "react";
import {
  Search,
  CreditCard,
  QrCode,
  Smartphone,
  CalendarCheck,
  LayoutDashboard,
  BarChart3,
  ScanLine,
  ShieldCheck,
  Wallet,
} from "lucide-react";

type UserType = "attendee" | "organizer";

const FEATURES = {
  attendee: [
    {
      title: "Smart Discovery",
      desc: "Find events by category, location, or date using powerful filters.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Secure Payments",
      desc: "Pay safely with Stripe or Paystack. Transparent pricing guaranteed.",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: "Instant QR Tickets",
      desc: "Receive QR code tickets instantly via email after purchase.",
      icon: <QrCode className="w-6 h-6" />,
    },
    {
      title: "Mobile Friendly",
      desc: "Access tickets easily on any device — no printing required.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Calendar Sync",
      desc: "Save events directly to your calendar with one click.",
      icon: <CalendarCheck className="w-6 h-6" />,
    },
    {
      title: "Fast Entry",
      desc: "Skip long lines with quick QR scanning at the venue.",
      icon: <ScanLine className="w-6 h-6" />,
    },
  ],

  organizer: [
    {
      title: "Event Dashboard",
      desc: "Create and manage events from a powerful, easy-to-use dashboard.",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      title: "Ticket Tiers",
      desc: "Set up free, paid, early-bird, or VIP tickets effortlessly.",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: "Live Analytics",
      desc: "Track ticket sales, revenue, and performance in real time.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "QR Code Scanning",
      desc: "Validate attendees instantly using our built-in scanner app.",
      icon: <ScanLine className="w-6 h-6" />,
    },
    {
      title: "Fraud Protection",
      desc: "Prevent duplicate entries and unauthorized ticket usage.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Fast Payouts",
      desc: "Receive ticket revenue quickly with clear payout reports.",
      icon: <Wallet className="w-6 h-6" />,
    },
  ],
};

export default function FeaturesSection() {
  const [userType, setUserType] = useState<UserType>("attendee");

  return (
    <section id="features" className="py-20 sm:py-24 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="inline-flex rounded-full border border-[#e7ded2] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
            Why Tixly
          </p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Everything for a good night out
          </h2>
          <p className="text-stone-500 text-[17px]">
            Whether you’re showing up or setting up, Tixly keeps it warm,
            fast, and human.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex bg-white border border-[#e7ded2] p-1.5 rounded-full shadow-sm">
            <div
              className="absolute top-1.5 bottom-1.5 bg-stone-900 rounded-full shadow-sm transition-all duration-300"
              style={{
                width: "calc(50% - 12px)",
                left: userType === "attendee" ? "6px" : "calc(50% + 6px)",
              }}
            />
            {["attendee", "organizer"].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type as UserType)}
                className={`cursor-pointer relative z-10 w-[140px] py-2.5 text-sm font-semibold transition-colors ${
                  userType === type ? "text-white" : "text-stone-500"
                }`}
              >
                {type === "attendee" ? "Attendees" : "Organizers"}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div
          key={userType}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {FEATURES[userType].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#e7ded2] p-8 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(28,25,23,0.35)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
