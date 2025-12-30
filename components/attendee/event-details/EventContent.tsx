import { Event } from "@/types/event";

type EventDetails = {
  data: Event;
};

const EventContent = ({ data }: EventDetails) => {
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-semibold">About the Event</h1>
        <p className="pt-5 whitespace-pre-line leading-snug text-gray-600 text-[19px]">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default EventContent;
