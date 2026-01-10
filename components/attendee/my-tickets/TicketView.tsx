"use client";

import { getUserEventTicket } from "@/lib/event-api/api";
import { useEffect, useState } from "react";
import QRCode from "./QRCode";
import {
  X,
  Download,
  Share2,
  Calendar,
  MapPin,
  Clock,
  Ticket,
} from "lucide-react";
import { TicketTier } from "@/types/event";

type TicketData = {
  id: number;
  qr_code: string;
  ticket_tier: TicketTier;
  event_title: string;
  event_date: string;
  event_location: string;
  attendee_name: string;
  ticket_number: string;
};

type TicketViewProps = {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
};

const TicketView = ({
  id,
  isOpen,
  onClose,
  eventTitle,
  eventDate,
  eventLocation,
}: TicketViewProps) => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const getTickets = async () => {
        try {
          setIsLoading(true);
          const response = await getUserEventTicket(id);
          setTickets(response.results);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      getTickets();
    }
  }, [id, isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const currentTicket = tickets[currentTicketIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-0 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>

        {/* Ticket Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="w-16 h-16 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
              <Ticket className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Tickets Found
              </h3>
              <p className="text-gray-600">
                You don't have any tickets for this event yet.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="bg-linear-to-br from-[#FF5722] to-[#E64A19] p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Event Ticket</p>
                      <p className="font-semibold">
                        {currentTicket?.ticket_tier.name || "General Admission"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Ticket</p>
                    <p className="font-semibold">
                      {currentTicketIndex + 1} of {tickets.length}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{eventTitle}</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{eventLocation}</span>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="p-8">
                <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code at the venue entrance
                  </p>

                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <QRCode uuid={currentTicket?.qr_code || ""} />
                  </div>

                  <p className="text-xs text-gray-500 mt-4 font-mono">
                    {currentTicket?.qr_code}
                  </p>
                </div>

                {/* Navigation for multiple tickets */}
                {tickets.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={() =>
                        setCurrentTicketIndex((prev) =>
                          prev > 0 ? prev - 1 : tickets.length - 1
                        )
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {tickets.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTicketIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentTicketIndex
                              ? "bg-[#FF5722] w-6"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentTicketIndex((prev) =>
                          prev < tickets.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketView;
