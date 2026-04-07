import { useTranslation } from "react-i18next";
import InfoCard from "./InfoCard";
import TeaIcon from "../../assets/TeaIcon.png";
import Map from "../../assets/Map.png";

interface TravelCardsGridProps {
  onOpenGuide: () => void;
  onDiscoverAssam: () => void;
}

export default function TravelCardsGrid({
  onOpenGuide,
  onDiscoverAssam,
}: TravelCardsGridProps) {
  const { t } = useTranslation();

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 px-4 max-w-6xl mx-auto">
      {/* CARD 1: The Journey */}
      <InfoCard
        variant="champagne"
        icon={Map} // Placeholder for your upcoming custom Compass icon
        title={t("travelCards.journeyTitle")}
        body={t("travelCards.journeyBody")}
        buttonLabel={t("travelCards.openTravelGuide")}
        onButtonClick={onOpenGuide}
      />

      {/* CARD 2: Discover Assam */}
      <InfoCard
        variant="champagne"
        icon={TeaIcon} // Placeholder for your upcoming custom Tea Leaf icon
        title={t("travelCards.activitiesTitle")}
        body={t("travelCards.teaTasting")}
        buttonLabel={t("travelCards.discoverAssam")}
        onButtonClick={onDiscoverAssam}
      />

      {/* Vertical Decorative Divider (Desktop Only) */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none" />
    </div>
  );
}
