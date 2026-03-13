import { ANTIQUE_GOLD, SAGE_LEAF, NAVY_PRIMARY } from "./TravelConstants";

const preparationItems = [
  {
    label: "Attire",
    description:
      "Light linens for the day, a soft pashmina for the cool river evenings.",
  },
  {
    label: "Health",
    description:
      "Assam is lush; ensure you have your tropical essentials and bug repellent.",
  },
  {
    label: "Tempo",
    description:
      "Life by the river moves slowly. Prepare to disconnect and embrace 'Lahe Lahe'.",
  },
];

export default function AssamPreparationSection() {
  return (
    <section className="bg-[#FAF3E8]/80 border-y border-[#B0CCA8]/30 py-16 px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h4
          className={`font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase ${SAGE_LEAF} font-bold mb-10`}
        >
          Preparing for the Brahmaputra
        </h4>
        <div className="grid sm:grid-cols-3 gap-8">
          {preparationItems.map((item) => (
            <div key={item.label}>
              <p className={`font-['Cinzel'] text-[9px] ${ANTIQUE_GOLD} mb-2`}>
                {item.label}
              </p>
              <p
                className={`font-['Cormorant_Garamond'] text-lg italic ${NAVY_PRIMARY}`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
