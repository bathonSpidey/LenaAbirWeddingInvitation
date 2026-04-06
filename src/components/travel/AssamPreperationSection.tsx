import PreparationCard from "./PreparationCard";
import DownloadableChecklist from "./DownloadableChecklist";
import { SAGE_LEAF, NAVY_PRIMARY } from "./TravelConstants";
import { useTranslation } from "react-i18next";

interface PreparationItem {
  id: string;
  label: string;
  frontDesc: string;
}

const ITEM_COLORS: Record<string, string> = {
  attire: "#b98c8c",
  health: "#B0CCA8",
  tempo: "#AF944D",
};

const ITEM_NOTES: Record<string, { notesTitle: string; notesContent: string }> =
  {
    attire: {
      notesTitle: "assamPrep.attireNotesTitle",
      notesContent: "assamPrep.attireNotesDesc",
    },
    health: {
      notesTitle: "assamPrep.healthNotesTitle",
      notesContent: "assamPrep.healthNotesDesc",
    },
    tempo: {
      notesTitle: "assamPrep.tempoNotesTitle",
      notesContent: "assamPrep.tempoNotesDesc",
    },
  };

export default function AssamPreparationSection() {
  const { t } = useTranslation();

  const preparationItems = t("preparations.items", {
    returnObjects: true,
  }) as PreparationItem[];

  return (
    <section className="bg-[#FAF3E8]/60 backdrop-blur-sm border-y border-[#B0CCA8]/20 py-24 px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h4
            className={`font-['Cinzel'] text-[10px] tracking-[0.6em] uppercase ${SAGE_LEAF} font-bold mb-4`}
          >
            {t("preparations.label")}
          </h4>
          <p className={`font-['Pinyon_Script'] text-6xl ${NAVY_PRIMARY}`}>
            {t("preparations.heading")}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
          {preparationItems.map((item, index) => {
            const notes = ITEM_NOTES[item.id];
            if (!notes) return null;
            return (
              <PreparationCard
                key={item.id}
                delay={index * 0.1}
                label={item.label}
                frontDesc={item.frontDesc}
                color={ITEM_COLORS[item.id] ?? "#c9a961"}
                notesTitle={t(notes.notesTitle)}
                notesContent={t(notes.notesContent)}
              />
            );
          })}
        </div>

        <DownloadableChecklist />
      </div>
    </section>
  );
}
