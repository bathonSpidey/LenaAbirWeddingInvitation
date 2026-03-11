export const S = {
  sectionLabel:
    "font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase text-[#B98C8C] font-bold mb-2 text-center opacity-90", // COMPACT: Reduced mb-6 to mb-2, changed color to Rose
    
  cardShell:
    "bg-[#FFF9F9] p-6 border border-[#B98C8C]/20 rounded-sm text-center shadow-[0_4px_20px_-5px_rgba(185,140,140,0.15)] relative overflow-hidden", // COMPACT: p-8 to p-6
    
  cardTitle:
    "font-['Cinzel'] text-[12px] font-bold mb-3 tracking-widest uppercase text-[#A67C7C]", // THEME: Rose text
    
  cardBody:
    "font-['Cormorant_Garamond'] text-[1.1rem] italic text-stone-600 mb-6 leading-tight flex-1", // COMPACT: Reduced text size and mb-8 to mb-6
    
  ghostBtn:
    "border border-[#B98C8C] py-2 px-10 text-[9px] font-['Cinzel'] tracking-[0.4em] text-[#B98C8C] hover:bg-[#B98C8C] hover:text-white transition-all duration-500 uppercase",
    
  goldText: 
    "text-[#B98C8C] font-bold", // Changed from amber/gold to Rose Quartz
} as const;