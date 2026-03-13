import React, { useEffect } from "react";
import TravelTexture from "../../assets/travel-texture.png";
import TravelPortalHeader from "./TravelPortalHeader";
import FlightSection from "./FlightSection";
import TajMahalSection from "./TajMahalSection";
import AssamPreparationSection from "./AssamPreperationSection";
import StaysAndVisaGrid from "./StayAndVisaGrid";
import GuidedBookingCTA from "./Guidedbookingcta";
import TravelPortalFooter from "./TravelFooter";

export default function TravelPortal({
  innerRef,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      ref={innerRef}
      className="min-h-screen w-full bg-[#f0f4f7] py-20 px-6 md:px-20 snap-start relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${TravelTexture})`,
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <TravelPortalHeader />

        <div className="space-y-24">
          {/* SECTION 1: THE FLIGHT JOURNEY */}
          <FlightSection />

          {/* SECTION 2: THE TAJ MAHAL RECOMMENDATION */}
          <TajMahalSection />

          {/* SECTION 3: ASSAM PREPARATION */}
          <AssamPreparationSection />

          {/* STAYS & VISA GRID */}
          <StaysAndVisaGrid />
        </div>

        {/* GUIDED BOOKING CTA */}
        <GuidedBookingCTA />

        {/* FOOTER */}
        <TravelPortalFooter />
      </div>
    </div>
  );
}
