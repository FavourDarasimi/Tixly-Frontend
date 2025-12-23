"use client";

import AttendeeNavbar from "@/components/attendee/AttendeeNavbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AttendeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute allowedRoles={["attendee"]}>
      <section className="flex flex-col min-h-screen">
        <AttendeeNavbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </section>
    </ProtectedRoute>
  );
}
