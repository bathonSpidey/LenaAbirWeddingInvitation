import { motion } from "framer-motion";

const C = {
  parchment: "#F8F0E0",
  gold: "#C9A84C",
  rose: "#b98c8c",
  roseMuted: "rgba(185,140,140,0.8)",
  roseHint: "rgba(185,140,140,0.5)",
  roseFaint: "rgba(185,140,140,0.4)",
} as const;

const PAPER_TEXTURE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='5' seed='3' stitchTiles='stitch' result='n'/%3E%3CfeDiffuseLighting in='n' lighting-color='white' surfaceScale='4'%3E%3CfeDistantLight azimuth='45' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23c)'/%3E%3C/svg%3E")`;

const OrnamentalDivider = () => (
  <div className="flex justify-center items-center gap-4">
    <div className="h-px w-16 bg-[#b98c8c]/60" />{" "}
    {/* ✦ fix 4: 40→60% opacity */}
    <div className="w-1.5 h-1.5 rotate-45 bg-[#b98c8c]/60" />
    <div className="h-px w-16 bg-[#b98c8c]/60" />
  </div>
);

export const CulturalBridge = () => (
  <motion.section
    aria-label="Cultural bridge between Germany and Assam"
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="my-32 px-10 py-16 text-center rounded-sm relative overflow-hidden
               ring-1 ring-inset ring-[#b98c8c]/20
               shadow-[0_25px_60px_rgba(185,140,140,0.4)]"
    style={{ background: C.parchment, color: C.rose }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: PAPER_TEXTURE_SVG,
        backgroundSize: "500px 500px",
        opacity: 0.35,
        mixBlendMode: "multiply",
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(139,90,80,0.18) 100%)",
      }}
    />

    <div className="relative z-10 space-y-10">
      {/* ✦ fix 2: hairline border-bottom separates header zone from body */}
      <header className="pb-6 border-b border-[#b98c8c]/15">
        <p
          className="font-['Cinzel'] text-[11px] tracking-[0.3em] uppercase mb-3"
          style={{ color: C.gold }}
        >
          A story woven across two worlds
        </p>
        <h2
          className="font-['Cinzel'] text-2xl md:text-3xl tracking-[0.15em] uppercase"
          style={{ color: C.rose }}
        >
          Two Continents · One Heart
        </h2>
      </header>

      <div className="space-y-8">
        {/* ✦ fix 1: larger scale — was text-3xl md:text-5xl, now text-4xl md:text-6xl */}
        {/* ✦ fix 3: intentional line break after em-dash */}
        <p className="font-['Cormorant_Garamond'] text-4xl md:text-6xl italic leading-tight">
          <span lang="de">
            "Zwei Welten, ein Herz — <br className="hidden sm:block" />
            von den Alpen bis zum Brahmaputra."
          </span>
        </p>

        <OrnamentalDivider />

        {/* ✦ fix 1: middle tier unchanged — its relative size now reads correctly */}
        <p
          className="font-['Cormorant_Garamond'] text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed"
          style={{ color: C.roseMuted }}
        >
          <span lang="as">
            দুই পৃথিৱী, এটি হৃদয় — আল্পছৰ পৰা ব্ৰহ্মপুত্ৰলৈ।
          </span>
        </p>

        {/* ✦ fix 1: whisper tier pulled smaller — was text-[14px], now text-[12px] + looser tracking */}
        <p
          className="font-['Cormorant_Garamond'] text-[12px] tracking-[0.2em] italic"
          style={{ color: C.gold }}
        >
          Two worlds, one heart — from the Alps to the Brahmaputra.
        </p>
      </div>
    </div>
  </motion.section>
);
