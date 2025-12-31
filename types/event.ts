// types/event.ts
// Shared type definitions for events across the application

export type Organizer = {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
};

export type Speaker = {
  id: number;
  name: string;
  title: string;
  image: string;
  profile_image: string;
  email: string;
};

export type Schedule = {
  id: string; // UUID

  title: string;
  description: string;

  session_type:
    | "keynote"
    | "talk"
    | "panel"
    | "workshop"
    | "break"
    | "networking"
    | "lunch"
    | "registration"
    | "other";
  date: string;
  start_time: string;
  end_time: string;
  order: number;
  speakers: Speaker[];
  event_day: EventDay | null;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
};

export type EventDay = {
  id: string;
  title: string;
  description: string;
  dayNumber: number;
  date: string;
  startTime: string;
  endTime: string;
  schedules: Schedule[];
  createdAt: string;
  updatedAt: string;
};

export type TicketTier = {
  id: number;
  name: string;
  short_description: string;
  price: number;
  event: number;
  total_tickets: number;
  available_tickets: number;
  salesStart: string;
  saleEnd: string;
  created_at?: string;
  updated_at?: string;
};

export type Event = {
  id: number;

  title: string;
  short_description: string;
  description: string;
  category: string;
  image: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  created_at: string;
  organizer: Organizer;
  ticket_tiers: TicketTier[];
  available_tickets: number;
  min_price: number | null;
  max_price: number | null;
  status: "draft" | "published" | "cancelled" | "completed";
  is_multi_day: boolean;
  duration_days: number;
  is_currently_happening: boolean;
  has_schedule: boolean;
  schedule_count: number;
  latitude: string;
  longitude: string;
  event_days: EventDay[];
  speakers: Speaker[];
  schedules: Schedule[];
};

export type EventListResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: Event[];
};

export type EventCardProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  currency: string;
  category: string;
  image?: string;
  organizer: {
    name: string;
    avatar: string;
  };
  isFeatured: boolean;
};
