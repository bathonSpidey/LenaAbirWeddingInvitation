import { motion } from "framer-motion";
/* Ensure these icons are imported correctly from your icon file */
// import { EdelweissIcon, LotusIcon } from "./Icons";

export const CulturalBridge = () => {
  return (
    <>
      {/* SVG Filter Definition - This creates the torn edge effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="my-32 bg-[#F8F0E0] text-[#b98c8c] rounded-sm px-10 py-16 text-center shadow-[0_25px_60px_rgba(185,140,140,0.4)] relative overflow-hidden ring-1 ring-inset ring-[#b98c8c]/20"
      >
        {/* Crumpled paper texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='5' seed='3' stitchTiles='stitch' result='n'/%3E%3CfeDiffuseLighting in='n' lighting-color='white' surfaceScale='4'%3E%3CfeDistantLight azimuth='45' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23c)'/%3E%3C/svg%3E")`,
            backgroundSize: "500px 500px",
            backgroundRepeat: "repeat",
            opacity: 0.35,
            mixBlendMode: "multiply",
          }}
        />

        {/* Radial vignette — dark edges, bright parchment center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(139,90,80,0.18) 100%)",
          }}
        />

        <div className="relative z-10">
          {/* PROMOTED HERO EYEBROW */}
          <div className="mb-10">
            <p className="font-['Cinzel'] text-[11px] tracking-[0.3em] uppercase text-[#b98c8c]/50 mb-3 flex items-center justify-center gap-3">
              {/* <EdelweissIcon className="w-3.5 h-3.5" /> */}A story woven
              across two worlds
              {/* <LotusIcon className="w-3.5 h-3.5" /> */}
            </p>
            <h2 className="font-['Cinzel'] text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#b98c8c]">
              Two Continents · One Heart
            </h2>
          </div>

          <div className="space-y-8">
            {/* HERO — German */}
            <p className="font-['Cormorant_Garamond'] text-3xl md:text-5xl italic leading-tight">
              <span lang="de">
                "Zwei Welten, ein Herz — von den Alpen bis zum Brahmaputra."
              </span>
            </p>

            {/* Divider — now visible */}
            <div className="flex justify-center items-center gap-4">
              <div className="h-[0.5px] w-16 bg-[#b98c8c]/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#b98c8c]/40" />
              <div className="h-[0.5px] w-16 bg-[#b98c8c]/40" />
            </div>

            {/* SECONDARY — Assamese */}
            <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic text-[#b98c8c]/80 max-w-2xl mx-auto leading-relaxed">
              <span lang="as">
                দুই পৃথিৱী, এটি হৃদয় — আল্পছৰ পৰা ব্ৰহ্মপুত্ৰলৈ।
              </span>
            </p>

            {/* WHISPER CAPTION — English */}
            <p className="font-['Cormorant_Garamond'] text-[14px] tracking-widest italic text-[#b98c8c]/50">
              Two worlds, one heart — from the Alps to the Brahmaputra.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
