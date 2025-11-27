"use client";

import { useEffect } from "react";

export default function KnowcapPitchPage() {
  useEffect(() => {
    // Set page title
    document.title = "Knowcap Pitch Deck | Knowcap.ai";
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        src="/knowcap-pitch.html"
        className="w-full h-full border-0"
        title="Knowcap Pitch Deck"
      />
    </div>
  );
}
