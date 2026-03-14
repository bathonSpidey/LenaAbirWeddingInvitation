import PreparationCard from "./PreparationCard";
import { SAGE_LEAF, NAVY_PRIMARY } from "./TravelConstants";
import { useTranslation } from "react-i18next";

export default function AssamPreparationSection() {
  const { t } = useTranslation();

  // Define preparation items inside the component
  const preparationItems = [
    {
      label: "Attire",
      frontDesc:
        "Light linens for the day, a soft pashmina for the cool river evenings.",
      color: "#b98c8c", // Dusty Rose
      notesTitle: t("assamPrep.attireNotesTitle"), // e.g., "The River Pashmina"
      notesContent: t("assamPrep.attireNotesDesc"), // e.g., "Muga silk is famous for its natural gold sheen; pashminas make the perfect keepsake."
    },
    {
      label: "Health",
      frontDesc:
        "Assam is lush; ensure you have your tropical essentials and bug repellent.",
      color: "#B0CCA8", // Sage Leaf
      notesTitle: t("assamPrep.healthNotesTitle"), // e.g., "The Tea Botanical"
      notesContent: t("assamPrep.healthNotesDesc"), // e.g., "Assam tea (Camellia sinensis) is often used in local balms and traditional remedies."
    },
    {
      label: "Tempo",
      frontDesc:
        "Life by the river moves slowly. Prepare to disconnect and embrace 'Lahe Lahe'.",
      color: "#AF944D", // Antique Gold
      notesTitle: t("assamPrep.tempoNotesTitle"), // e.g., "Embracing 'Lahe Lahe'"
      notesContent: t("assamPrep.tempoNotesDesc"), // e.g., "This Assamese phrase, 'slowly, slowly,' is your invitation to savor a single moment, not a busy itinerary."
    },
  ];

  return (
    <section className="bg-[#FAF3E8]/60 backdrop-blur-sm border-y border-[#B0CCA8]/20 py-24 px-8 relative overflow-hidden">
      {/* 1. Convex (Tea Leaf) Background Removed */}

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h4
            className={`font-['Cinzel'] text-[10px] tracking-[0.6em] uppercase ${SAGE_LEAF} font-bold mb-4`}
          >
            {t("assamPrep.label")}
          </h4>
          <p className={`font-['Pinyon_Script'] text-6xl ${NAVY_PRIMARY}`}>
            {t("assamPrep.heading")}
          </p>
        </header>

        {/* Changed grid gap for card spacing */}
        <div className="grid md:grid-cols-3 gap-10">
          {preparationItems.map((item, index) => (
            <PreparationCard
              key={item.label}
              delay={index * 0.1}
              label={item.label}
              frontDesc={item.frontDesc}
              color={item.color}
              notesTitle={item.notesTitle}
              notesContent={item.notesContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
