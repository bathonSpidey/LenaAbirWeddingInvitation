import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import NavFooter from "./rsvp/NavFooter";
import SaveTheDatePanel from "./rsvp/SaveTheDatePanel";
import { S } from "./rsvp/styles";
import TravelCardsGrid from "./rsvp/TravelCardsGrid";
import type { CountryKey } from "./rsvp/types";
import VenueSection from "./rsvp/VenueSection";

// ─── Root Component ────────────────────────────────────────────────────────────

interface RSVPSectionProps {
  innerRef: React.RefObject<HTMLDivElement>;
  onBackToDiscover: () => void;
  onBackToStory: () => void;
  onNavigateToTravel: () => void;
}

export default function RSVPSection({
  innerRef,
  onBackToDiscover,
  onBackToStory,
  onNavigateToTravel,
}: RSVPSectionProps) {
  const [country, setCountry] = useState<CountryKey>("Germany");

  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#fdf8ec] flex flex-col md:flex-row snap-start"
    >
      <SaveTheDatePanel country={country} onCountryChange={setCountry} />

      <div className="w-full md:w-2/3 p-8 md:p-10 bg-[#f5ead4]/30 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={country}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10"
          >
            <p className={S.sectionLabel}>Travel Guide</p>

            <TravelCardsGrid
              country={country}
              onOpenGuide={onNavigateToTravel}
              onDiscoverAssam={onBackToDiscover}
            />

            <VenueSection />

            <NavFooter onExplore={onBackToDiscover} onOurStory={onBackToStory} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[-10%] right-[-10%] opacity-5 pointer-events-none select-none">
          <h1 className="text-[200px] font-['Cinzel']">JORHAT</h1>
        </div>
      </div>
    </div>
  );
}
