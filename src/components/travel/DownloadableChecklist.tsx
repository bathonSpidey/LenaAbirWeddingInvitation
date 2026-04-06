import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVY_PRIMARY } from "./TravelConstants";
import { useTranslation } from "react-i18next";

export default function DownloadableChecklist() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklistData = t("preparations.checklist", {
    returnObjects: true,
  }) as Record<string, string[]>;

  useEffect(() => {
    const saved = localStorage.getItem("assam-checklist");
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  const toggleItem = (item: string) => {
    const newState = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(newState);
    localStorage.setItem("assam-checklist", JSON.stringify(newState));
  };

  const handlePrint = () => window.print();

  // Capitalise the key for display: "visa" → "Visa"
  const formatCategory = (key: string) =>
    key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <>
      <style>{`
        .ledger-scrollbar::-webkit-scrollbar { width: 3px; }
        .ledger-scrollbar::-webkit-scrollbar-track { background: #FDFBF7; }
        .ledger-scrollbar::-webkit-scrollbar-thumb { background: #AF944D; border-radius: 10px; }

        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area {
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: auto;
            background: white !important;
            display: block !important;
          }
          .flex-1.overflow-y-auto { overflow: visible !important; height: auto !important; max-height: none !important; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div className="mt-20 p-8 border border-[#AF944D]/30 bg-white/40 rounded-sm relative text-center">
        <h3
          className={`font-['Cormorant_Garamond'] text-3xl italic ${NAVY_PRIMARY} mb-6`}
        >
          {t("preparations.prepareHeading")}
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-[#AF944D] text-white font-['Cinzel'] text-[10px] tracking-[0.2em] uppercase shadow-md"
          >
            {t("preparations.openLedger")}
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={handlePrint}
            className="px-8 py-3 border border-[#2A3F5C] text-[#2A3F5C] font-['Cinzel'] text-[10px] tracking-[0.2em] uppercase"
          >
            {t("preparations.downloadPdf")}
          </motion.button>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-[#2A3F5C]/40 backdrop-blur-md no-print"
              />

              <motion.div
                id="print-area"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl max-h-[85vh] bg-[#FDFBF7] shadow-2xl overflow-hidden flex flex-col border-[12px] border-[#FDFBF7]"
                style={{
                  boxShadow: "0 0 0 1px #AF944D, 0 20px 50px rgba(0,0,0,0.3)",
                }}
              >
                {/* Header */}
                <div className="p-8 pb-4 text-center border-b border-[#AF944D]/20">
                  <span className="font-['Cinzel'] text-[10px] tracking-[0.4em] text-[#AF944D]">
                    Your Personal
                  </span>
                  <h2
                    className={`font-['Pinyon_Script'] text-5xl ${NAVY_PRIMARY} mt-2`}
                  >
                    Travel Ledger
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 font-['Cinzel'] text-xl no-print"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-8 pt-4 ledger-scrollbar">
                  {Object.entries(checklistData).map(([categoryKey, items]) => (
                    <div key={categoryKey} className="mb-10">
                      <h4 className="font-['Cinzel'] text-[11px] tracking-[0.3em] text-[#AF944D] border-b border-[#AF944D]/10 pb-2 mb-4 uppercase font-bold">
                        {formatCategory(categoryKey)}
                      </h4>
                      <div className="grid gap-3">
                        {items.map((item) => (
                          <div
                            key={item}
                            onClick={() => toggleItem(item)}
                            className="flex items-center gap-4 cursor-pointer"
                          >
                            <div
                              className={`w-5 h-5 border border-[#AF944D] flex items-center justify-center transition-colors ${
                                checkedItems[item]
                                  ? "bg-[#AF944D]"
                                  : "bg-transparent"
                              }`}
                            >
                              {checkedItems[item] && (
                                <span className="text-white text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <span
                              className={`font-['Cormorant_Garamond'] text-lg ${
                                checkedItems[item]
                                  ? "text-stone-400 line-through italic"
                                  : "text-[#2A3F5C]"
                              }`}
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 bg-[#FDFBF7] border-t border-[#AF944D]/20 text-center">
                  <p className="font-['Cormorant_Garamond'] text-sm italic text-stone-500">
                    "Safe travels are the best gift you can give us."
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
