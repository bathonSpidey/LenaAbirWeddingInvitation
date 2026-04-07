import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  onDiscoverActivities: () => void;
  onBackToStory: () => void;
  onNavigateToTravel: () => void;
  onWhatToExpect: () => void;
}

export default function RSVPSection({
  innerRef,
  onDiscoverActivities,
  onBackToStory,
  onNavigateToTravel,
  onWhatToExpect,
}: RSVPSectionProps) {
  const [country, setCountry] = useState<CountryKey>("Germany");
  const { t } = useTranslation();

  return (
    <div
      ref={innerRef}
      /* CHANGE 1: Swapped yellowish bg for a clean white-pink to match SaveTheDatePanel */
      className="min-h-screen w-full bg-[#FFF9F9] flex flex-col md:flex-row snap-start overflow-hidden"
    >
      <SaveTheDatePanel
        country={country}
        onCountryChange={setCountry}
        onWhatToExpect={onWhatToExpect}
      />

      {/* CHANGE 2: Removed the tan bg ([#f5ead4]/30) and reduced padding from p-4 to p-2 */}
      <div className="w-full md:w-2/3 p-2 md:p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={country}
            initial={{ opacity: 0, y: 10 }} // Slight vertical slide feels more premium
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-10 flex flex-col" // Added flex-col to control stacking
          >
            {/* CHANGE 3: Tightened the label spacing */}
            <p
              className={`${S.sectionLabel} mt-4 mb-2 text-center opacity-80 font-bold relative z-10`}
            >
              {t("rsvp.travelGuide")}
            </p>

            {/* THE TRAVEL GRID */}
            <div className="mb-0 pb-0">
              <TravelCardsGrid
                onOpenGuide={onNavigateToTravel}
                onDiscoverAssam={onDiscoverActivities}
              />
            </div>

            {/* THE VENUE SECTION: Now snuggled right up to the grid */}
            <div className="-mt-8 md:-mt-12">
              <VenueSection />
            </div>

            <NavFooter onOurStory={onBackToStory} />
          </motion.div>
        </AnimatePresence>

        {/* CHANGE 4: The "JORHAT" watermark - switched to Rose Quartz color */}
        <div className="absolute bottom-[-5%] right-[-5%] opacity-[0.03] pointer-events-none select-none text-[#B98C8C]">
          <h1 className="text-[180px] font-['Cinzel'] leading-none">JORHAT</h1>
        </div>
      </div>
    </div>
  );
}
