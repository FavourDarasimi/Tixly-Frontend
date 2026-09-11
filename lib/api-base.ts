// lib/api-base.ts
// Single source of truth for the backend API base URL.
// Set NEXT_PUBLIC_API_URL in .env.local for staging/production, e.g.
// NEXT_PUBLIC_API_URL=https://api.tixly.com/api

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
