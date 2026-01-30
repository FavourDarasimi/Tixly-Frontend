"use client";
import Link from "next/link";

export default function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {currentYear} Tixly. All rights reserved.</p>
        
        <div className="flex items-center gap-6">
          <Link href="/help" className="hover:text-gray-900 transition-colors">
            Help Center
          </Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
