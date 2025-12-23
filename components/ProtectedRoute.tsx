"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("attendee" | "organizer")[];
}

const ProtectedRoute = ({
  children,
  allowedRoles = ["attendee", "organizer"],
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // Authenticated but wrong role - redirect to appropriate page
      if (
        user &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
      ) {
        if (user.role === "attendee") {
          router.push("/home");
        } else if (user.role === "organizer") {
          router.push("/dashboard");
        }
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
