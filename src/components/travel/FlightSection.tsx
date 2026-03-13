import FlightGuide from "./FlightGuide";
import { ANTIQUE_GOLD } from "./TravelConstants";

export default function FlightSection() {
  return (
    <section>
      <div className="flex items-center">
        <span className={`font-['Cinzel'] text-sm ${ANTIQUE_GOLD}`}></span>
      </div>
      <div className="bg-white/60 backdrop-blur-sm border border-[#5B8DB8]/20 p-8 md:p-12 shadow-sm">
        <FlightGuide />
      </div>
    </section>
  );
}
