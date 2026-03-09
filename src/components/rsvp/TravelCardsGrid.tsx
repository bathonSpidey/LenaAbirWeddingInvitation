import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <InfoCard
        title={t("travelCards.journeyTitle")}
        body={t("travelCards.journeyBody")}
        buttonLabel={t("travelCards.openTravelGuide")}
        onButtonClick={onOpenGuide}
      />
      <InfoCard
        title={t("travelCards.activitiesTitle")}
        body={TRAVEL_DATA[country].activities}
        buttonLabel={t("travelCards.discoverAssam")}
        onButtonClick={onDiscoverAssam}
      />
    </div>
  );
}
