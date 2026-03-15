import PreparationCard from "./PreparationCard";
import DownloadableChecklist from "./DownloadableChecklist"; // Import new component
import { SAGE_LEAF, NAVY_PRIMARY } from "./TravelConstants";
import { useTranslation } from "react-i18next";

export default function AssamPreparationSection() {
  const { t } = useTranslation();

  const preparationItems = [
    {
      label: "Attire",
      frontDesc:
        "Light linens for the day, a soft pashmina for the cool river evenings.",
      color: "#b98c8c",
      notesTitle: t("assamPrep.attireNotesTitle"),
      notesContent: t("assamPrep.attireNotesDesc"),
    },
    {
      label: "Health",
      frontDesc:
        "Assam is lush; ensure you have your tropical essentials and bug repellent.",
      color: "#B0CCA8",
      notesTitle: t("assamPrep.healthNotesTitle"),
      notesContent: t("assamPrep.healthNotesDesc"),
    },
    {
      label: "Tempo",
      frontDesc:
        "Life by the river moves slowly. Prepare to disconnect and embrace 'Lahe Lahe'.",
      color: "#AF944D",
      notesTitle: t("assamPrep.tempoNotesTitle"),
      notesContent: t("assamPrep.tempoNotesDesc"),
    },
  ];

  return (
    <section className="bg-[#FAF3E8]/60 backdrop-blur-sm border-y border-[#B0CCA8]/20 py-24 px-8 relative overflow-hidden">
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

        {/* The new Checklist Section */}
        <DownloadableChecklist />
      </div>
    </section>
  );
}
