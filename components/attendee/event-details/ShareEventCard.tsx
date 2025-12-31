// components/ShareEventCard.tsx
"use client";

import { useState } from "react";
import { Link2, Check, MessageCircle, X, Facebook } from "lucide-react";

interface ShareEventCardProps {
  eventTitle: string;
  eventUrl: string;
}

const ShareEventCard = ({ eventTitle, eventUrl }: ShareEventCardProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out this event: ${eventTitle}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      eventUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n${eventUrl}`
    )}`,
  };

  const openShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
      {/* Title */}
      <h3 className="font-semibold text-xl mb-6">Share this event</h3>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {/* Facebook - FB */}
        <button
          onClick={() => openShare(shareUrls.facebook)}
          className="flex items-center justify-center min-w-[72px] h-12 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full font-bold text-sm transition-colors px-6"
        >
          <Facebook />
        </button>

        {/* Twitter - TW */}
        <button
          onClick={() => openShare(shareUrls.twitter)}
          className="flex items-center justify-center min-w-[72px] h-12 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-full font-bold text-sm transition-colors px-6"
        >
          <X />
        </button>

        {/* WhatsApp - WA */}
        <button
          onClick={() => openShare(shareUrls.whatsapp)}
          className="flex items-center justify-center min-w-[72px] h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-sm transition-colors px-6"
        >
          <MessageCircle />
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Link2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {copied && <p className="text-sm text-green-600 mt-3">✓ Link copied!</p>}
    </div>
  );
};

export default ShareEventCard;
