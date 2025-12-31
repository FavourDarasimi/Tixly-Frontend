"use client";
import { Event, Schedule, Speaker } from "@/types/event";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Mic2,
  Presentation,
  Users2,
  Hammer,
  Coffee,
  Handshake,
  Utensils,
  ClipboardCheck,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";

type EventDetails = {
  data: Event;
};

const EventContent = ({ data }: EventDetails) => {
  const [dayNumber, setDayNumber] = useState(1);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    if (data.is_multi_day) {
      setSchedules(
        data.schedules.filter(
          (schedule) => schedule.event_day?.dayNumber == dayNumber
        )
      );
    } else {
      setSchedules(data.schedules);
    }
  }, []);

  const getScheuleForEventDay = (day: number) => {
    const daySchedules = data.schedules.filter(
      (schedule) => schedule.event_day?.dayNumber == day
    );
    setSchedules(daySchedules);
    setDayNumber(day);
  };

  const formatTime = (timeString: string) => {
    const today = new Date().toISOString().split("T")[0];
    const time = new Date(`${today}T${timeString}`);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(time);
    return formattedTime;
  };

  const SESSION_ICON_MAP: Record<string, LucideIcon> = {
    keynote: Mic2,
    talk: Presentation,
    panel: Users2,
    workshop: Hammer,
    break: Coffee,
    networking: Handshake,
    lunch: Utensils,
    registration: ClipboardCheck,
    other: MoreHorizontal,
  };
  const SessionIcon = ({ type }: { type: string }) => {
    const Icon = SESSION_ICON_MAP[type.toLowerCase()] || MoreHorizontal;
    return (
      <Icon
        className={`w-5 h-5  ${
          type == "keynote" ? "tex-white" : "text-[#FF5722]"
        }`}
      />
    );
  };

  return (
    <div className="">
      <div>
        <h1 className="text-[27px] font-semibold">About the Event</h1>
        <p className="pt-5 whitespace-pre-line leading-snug text-gray-600 text-[19px]">
          {data.description}
        </p>
      </div>
      <div className="mt-10">
        <h1 className="text-[27px] font-semibold">Speakers</h1>
        <div className="mt-5 flex gap-5">
          {data.speakers.map((speaker, index) => (
            <div key={index} className="text-center w-fit">
              <div className="relative h-[120px] w-[120px] rounded-full overflow-hidden">
                <Image
                  src={speaker.profile_image}
                  fill
                  alt={speaker.name}
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-xl font-semibold">{speaker.name}</p>
                <p className="text-gray-500 text-[15px]">{speaker.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-[27px] font-semibold">
            {data.is_multi_day ? `Day ${dayNumber} Schedule` : "Schedule"}
          </h1>
          <div className="flex gap-5">
            {data.event_days.map((day, index) => (
              <h1
                key={index}
                onClick={() => getScheuleForEventDay(day.dayNumber)}
                className={`rounded-full px-4 py-1 cursor-pointer transition-colors duration-[400ms] ${
                  dayNumber == day.dayNumber
                    ? "bg-[#FF5722] border border-transparent text-white"
                    : "border border-gray-300"
                }`}
              >
                Day {day.dayNumber}
              </h1>
            ))}
          </div>
        </div>
        <div>
          {/* {data.is_multi_day ?}
          {schedules.map((schedule, index) => (
            <div key={index} className="bg-white rounded-4xl mb-5 w-[35%] p-5">
              <div className="flex justify-between items-center">
                <p className="text-[#FF5722] font-semibold">
                  {formatTime(schedule.start_time)}
                </p>
                <p className="text-[#757E8B] bg-gray-200/70 px-2 rounded-full tx-[15px]">
                  {schedule.session_type}
                </p>
              </div>
              <h1 className="text-[18px] font-semibold my-1 line-clamp-1">
                {schedule.title}
              </h1>
              <h3 className=" text-[#757E8B] font-medium">
                {schedule.description}
              </h3>
            </div>
          ))} */}

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[43%] top-0 bottom-0 w-[2px] bg-gray-200"></div>

            {/* Schedule Items */}
            {schedules.map((schedule, index) => {
              // Alternate between left and right
              const isLeft = index % 2 === 0;

              return (
                <div key={schedule.id} className="relative mb-8">
                  {isLeft ? (
                    // LEFT SIDE LAYOUT (Time on right, content on left)
                    <div className="flex items-start gap-4">
                      {/* Content Card - LEFT */}
                      <div className="w-[40%]">
                        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-[#FF5722] text-[15px] font-semibold">
                              {formatTime(schedule.start_time)}
                            </p>
                          </div>
                          <h3 className="text-[18px] font-semibold text-gray-900 mb-1">
                            {schedule.title}
                          </h3>
                          <p className="text-[#757E8B] text-sm font-medium">
                            {schedule.description}
                          </p>
                          {schedule.speakers &&
                            schedule.speakers.length > 0 && (
                              <div className="flex items-center gap-2 mt-3">
                                {schedule.speakers.map((speaker) => (
                                  <div key={speaker.id}>
                                    {speaker.profile_image ? (
                                      <img
                                        src={speaker.profile_image}
                                        alt={speaker.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                        {speaker.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ${
                            schedule.session_type === "keynote"
                              ? "bg-[#FF5722] text-white shadow-lg"
                              : "bg-white border-2 border-[#FF5722]"
                          }`}
                        >
                          <SessionIcon type={schedule.session_type} />
                        </div>
                      </div>

                      {/* Empty space - RIGHT */}
                      <div className="w-[40%]"></div>
                    </div>
                  ) : (
                    // RIGHT SIDE LAYOUT (Time on left, content on right)
                    <div className="flex items-start gap-4">
                      {/* Empty space - LEFT */}
                      <div className="w-[40%]"></div>

                      {/* Center Dot */}
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ${
                            schedule.session_type === "keynote"
                              ? "bg-[#FF5722] text-white shadow-lg"
                              : "bg-white border-2 border-[#FF5722]"
                          }`}
                        >
                          {<SessionIcon type={schedule.session_type} />}
                        </div>
                      </div>

                      {/* Content Card - RIGHT */}
                      <div className="w-[40%]">
                        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-[#FF5722] text-[15px] font-semibold">
                              {formatTime(schedule.start_time)}
                            </p>
                          </div>
                          <h3 className="text-[18px] font-semibold text-gray-900 mb-1">
                            {schedule.title}
                          </h3>
                          <p className="text-[#757E8B] text-sm font-medium">
                            {schedule.description}
                          </p>

                          {schedule.speakers &&
                            schedule.speakers.length > 0 && (
                              <div className="flex items-center gap-2 mt-3">
                                {schedule.speakers.map((speaker) => (
                                  <div key={speaker.id}>
                                    {speaker.profile_image ? (
                                      <img
                                        src={speaker.profile_image}
                                        alt={speaker.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                        {speaker.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventContent;
