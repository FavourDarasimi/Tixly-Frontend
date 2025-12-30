"use client";
import Button from "@/components/Button";
import { Event } from "@/types/event";
import { constants } from "fs";
import { useState } from "react";

type EventDetails = {
  data: Event;
};
const EventBookingSideBar = ({ data }: EventDetails) => {
  const [tierSelected, setTierSelected] = useState(0);
  const [tierSelectedPrice, setTierSelectedPrice] = useState(0);

  const tierClick = (index: number, price: number) => {
    setTierSelected(index);
    setTierSelectedPrice(price);
  };
  return (
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
            <p className="text-gray-500">Total</p>
            <h1 className="font-semibold text-[26px]">${tierSelectedPrice}</h1>
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
  );
};

export default EventBookingSideBar;
