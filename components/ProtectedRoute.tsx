"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("attendee" | "organizer")[];
}

const DEFAULT_ROLES: ("attendee" | "organizer")[] = ["attendee", "organizer"];

const ProtectedRoute = ({
  children,
  allowedRoles = DEFAULT_ROLES,
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const path = usePathname();
  // Stabilize the array identity so the effect below doesn't re-run every render
  const allowedRolesKey = useMemo(() => allowedRoles.join(","), [allowedRoles]);

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      if (user && isAuthenticated && path == "/") {
        router.push(user.role === "organizer" ? "/dashboard" : "/home");
      }

      // Authenticated but wrong role - redirect to appropriate page
      const allowed = allowedRolesKey.split(",") as ("attendee" | "organizer")[];
      if (user && allowed.length > 0 && !allowed.includes(user.role)) {
        if (user.role === "attendee") {
          router.push("/home");
        } else if (user.role === "organizer") {
          router.push("/dashboard");
        }
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRolesKey, router, path]);

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

  // Show a message while redirecting (instead of a blank screen)
  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting…</p>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
