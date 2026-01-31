"use client";
import Button from "@/components/Button";
import EventMap from "@/components/EventMap";
import ShareEventCard from "@/components/attendee/event-details/ShareEventCard";
import { Event } from "@/types/event";

import { useState } from "react";
import { Heart, MapPinHouse } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { saveEvent } from "@/lib/event-api/api";

type EventDetails = {
  data: Event;
};
const EventBookingSideBar = ({ data }: EventDetails) => {
  const { isAuthenticated } = useAuth();
  const [tierSelected, setTierSelected] = useState(0);
  const [tierSelectedPrice, setTierSelectedPrice] = useState(
    data.ticket_tiers?.[0]?.price || 0
  );
  
  const [isSaved, setIsSaved] = useState(data.is_saved);

  const handleSave = async () => {
    if (!isAuthenticated) return;
    
    // Optimistic update
    setIsSaved(!isSaved);
    
    try {
        await saveEvent(data.id);
    } catch (error) {
        console.error("Failed to save event", error);
        // Revert on failure
        setIsSaved(isSaved);
    }
  }

  const tierClick = (index: number, price: number) => {
    setTierSelected(index);
    setTierSelectedPrice(price);
  };

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`,
      "_blank"
    );
  };

  return (
    <div className="w-full space-y-10">
      {isAuthenticated ? (
        <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
          <div className=" ">
            <h1 className="font-semibold text-xl mb-6">Select Tickets</h1>
            <div className="space-y-5 ">
              {data.ticket_tiers.map((tier, index) => (
                <div
                  key={index}
                  onClick={() => tierClick(index, tier.price)}
                  className={`flex justify-between items-start py-4 px-4 transition-colors duration-400ms cursor-pointer border ${
                    tierSelected == index
                      ? "border-[#FF5722] bg-[#FF5722]/7"
                      : "border-gray-300"
                  } rounded-3xl`}
                >
                  <div>
                    <h1 className="text-[17px] font-semibold">{tier.name}</h1>
                    <p className="text-gray-500 text-sm ">
                      {tier.short_description}
                    </p>
                  </div>
                  <p className="text-[#FF5722] text-[17px] font-semibold ">
                    ${tier.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-t-gray-200 my-8" />
            <div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Total :</p>
                <h1 className="font-semibold text-[26px]">
                  ${tierSelectedPrice}
                </h1>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full rounded-full mt-3"
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : null}

      {isAuthenticated && (
         <div 
          onClick={handleSave}
          className={`w-full py-4 rounded-full mt-3 border flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${isSaved ? 'border-[#FF5722] text-[#FF5722] bg-[#FF5722]/5' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span className="font-semibold text-lg">{isSaved ? "Saved" : "Save Event"}</span>
        </div>
      )}

      <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <MapPinHouse className="text-[#FF5722] w-6 h-6" />
          <h1 className="font-semibold text-xl ">Venue</h1>
        </div>
        <div>
          {data.latitude && data.longitude && (
            <EventMap
              latitude={data.latitude}
              longitude={data.longitude}
              eventName={data.title}
            />
          )}
        </div>
        <p className="mt-3 text-[18px] font-semibold">{data.location}</p>
        <p
          onClick={openDirections}
          className="text-[#FF5722] font-semibold mt-3"
        >
          Get Directions
        </p>
      </div>

      <ShareEventCard eventTitle={data.title} eventUrl={window.location.href} />
    </div>
  );
};

export default EventBookingSideBar;
