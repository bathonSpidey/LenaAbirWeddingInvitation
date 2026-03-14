import { useState, useRef } from "react";
import OurStory from "./ourstory/OurStory";
import RegretsSection from "./RegretSection";
import DiscoverAssam from "./discover/DiscoverAssam";
import RSVPSection from "./RSVPSection";
import TravelPortal from "./travel/TravelPortal";
import EnvelopeStage from "./envelope/EnvelopeStage";
import Activities from "./Activities";
import Expectations from "./expectations/Expectations";
import { useEnvelopeAnimation } from "../hooks/useEnvelopeAnimation";

// ── Add this to your index.html <head>:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap"/>

export default function EnvelopeIntro() {
  const { phase, flapZIndex, envelopeAnim, letterAnim, handleSeal } =
    useEnvelopeAnimation();

  // ── Section visibility ──────────────────────────────────
  const [showRegrets, setShowRegrets] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);

  // ── Scroll targets ──────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const regretsRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  const storyRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const expectationsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current || !containerRef.current) return;
    const container = containerRef.current;
    const element = ref.current;
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollTop =
      container.scrollTop + (elementRect.top - containerRect.top);
    container.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  // ── Card action handlers ────────────────────────────────
  const handleDecline = () => {
    setShowRSVP(false);
    setShowRegrets(true);
    setTimeout(() => scrollTo(regretsRef), 150);
  };

  const handleRSVPClick = () => {
    setShowRegrets(false);
    setShowRSVP(true);
    setTimeout(() => scrollTo(rsvpRef), 150);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto snap-y snap-proximity bg-[#f5ead4]"
      style={{ scrollBehavior: "smooth", overscrollBehavior: "contain" }}
    >
      {/* ── Section 1: Envelope scene ── */}
      <EnvelopeStage
        phase={phase}
        flapZIndex={flapZIndex}
        envelopeAnim={envelopeAnim}
        letterAnim={letterAnim}
        onSeal={handleSeal}
        onDecline={handleDecline}
        onRSVP={handleRSVPClick}
      />

      {/* ── Section 2A: Declined path ── */}
      {showRegrets && (
        <>
          <RegretsSection
            innerRef={regretsRef}
            onBack={() =>
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }
            onOurStory={() => scrollTo(storyRef)}
            onDiscover={() => scrollTo(discoverRef)}
          />

          <div ref={storyRef} className="snap-start">
            <OurStory
              onBack={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            />
          </div>

          <div ref={discoverRef} className="snap-start">
            <DiscoverAssam
              onBack={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            />
          </div>
        </>
      )}

      {/* ── Section 2B: RSVP path ── */}
      {showRSVP && (
        <>
          <div ref={rsvpRef} className="snap-start">
            <RSVPSection
              innerRef={rsvpRef as React.RefObject<HTMLDivElement>}
              onBackToDiscover={() => scrollTo(discoverRef)}
              onDiscoverActivities={() => scrollTo(activitiesRef)}
              onBackToStory={() => scrollTo(storyRef)}
              onNavigateToTravel={() => scrollTo(travelRef)}
              onWhatToExpect={() => scrollTo(expectationsRef)}
            />
          </div>
          <TravelPortal
            innerRef={travelRef as React.RefObject<HTMLDivElement>}
          />

          <div ref={storyRef} className="snap-start">
            <OurStory
              onBack={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            />
          </div>

          <Expectations
            innerRef={expectationsRef as React.RefObject<HTMLDivElement>}
            onBack={() => scrollTo(rsvpRef)}
          />

          <div ref={discoverRef} className="snap-start">
            <DiscoverAssam
              onBack={() =>
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
            />
          </div>

          <div ref={activitiesRef} className="snap-start">
            <Activities onBack={() => scrollTo(rsvpRef)} />
          </div>
        </>
      )}
    </div>
  );
}
