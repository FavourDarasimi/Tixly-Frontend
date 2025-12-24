// types/event.ts
// Shared type definitions for events across the application

export type Organizer = {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  avatar?: string;
};

export type TicketTier = {
  id: number;
  name: string;
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
  description: string;
  image?: string;
  category: string;

  // Dates
  date: string;
  time?: string;
  startDateTime?: string;
  endDateTime?: string;

  // Location
  location: string;
  latitude?: number;
  longitude?: number;

  // Pricing
  min_price?: number;
  max_price?: number;
  price?: number;
  currency?: string;

  // Tickets
  available_tickets?: number;
  ticket_tiers?: TicketTier[];

  // Status
  status?: "draft" | "published" | "cancelled" | "completed";

  // Relations
  organizer: Organizer;

  // Featured & Trending
  is_featured?: boolean;
  isFeatured?: boolean;
  featured_priority?: number;
  is_trending?: boolean;
  trending_score?: number;

  // Metrics
  views_count?: number;
  ticket_sales_count?: number;
  saved_count?: number;

  // Timestamps
  created_at?: string;
  updated_at?: string;
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
