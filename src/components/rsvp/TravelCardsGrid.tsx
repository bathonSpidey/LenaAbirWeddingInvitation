import InfoCard from "./InfoCard";
import { type CountryKey, TRAVEL_DATA } from "./types";

interface TravelCardsGridProps {
  country: CountryKey;
  onOpenGuide: () => void;
  onDiscoverAssam: () => void;
}

export default function TravelCardsGrid({
  country,
  onOpenGuide,
  onDiscoverAssam,
}: TravelCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <InfoCard
        title="Planning your Journey?"
        body="We've curated a complete guide for our international guests—covering flights from Germany & China, local stays, and visa requirements."
        buttonLabel="Open Travel Guide"
        onButtonClick={onOpenGuide}
      />
      <InfoCard
        title="Must Do Activities"
        body={TRAVEL_DATA[country].activities}
        buttonLabel="Discover Assam"
        onButtonClick={onDiscoverAssam}
      />
    </div>
  );
}
