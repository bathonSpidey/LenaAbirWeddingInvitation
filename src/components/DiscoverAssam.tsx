import { motion } from "framer-motion";

// Updated assets based on your imports
import TeaGarden from "../assets/tea.png";
import Silk from "../assets/silk.webp";
import Rhinos from "../assets/kaziranga.jpeg";
import AssamTexture from "../assets/assam-texture.jpeg";

const TEXT_PRIMARY = "text-[#2D241E]"; // Deep Espresso for high contrast
const TEXT_ACCENT = "text-[#8B5E3C]"; // Burnt Sienna for sub-labels

const FeatureCard = ({
  title,
  desc,
  img,
  delay,
}: {
  title: string;
  desc: string;
  img?: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="flex flex-col gap-4"
  >
    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-stone-200 shadow-2xl border-[4px] border-white/90">
      <img src={img} alt={title} className="w-full h-full object-cover" />
    </div>
    <h2
      className={`font-['Cinzel']  tracking-[0.3em] ${TEXT_ACCENT} mt-2 uppercase font-bold`}
    >
      {title}
    </h2>
    <p
      className={`font-['Cormorant_Garamond'] text-lg italic ${TEXT_PRIMARY} leading-tight`}
    >
      {desc}
    </p>
  </motion.div>
);

export default function DiscoverAssam({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen w-full py-20 px-6 md:px-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${AssamTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 1. THE READABILITY OVERLAY */}
      {/* This ensures the gold texture doesn't swallow your text */}
      <div className="absolute inset-0 bg-[#fdf8ec]/40 pointer-events-none" />

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 -translate-y-1/4">
        <h1 className="text-[300px] font-['Cinzel'] select-none">ASSAM</h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          className={`${TEXT_ACCENT} mb-16 flex items-center gap-2 hover:text-amber-900 transition-colors cursor-pointer uppercase tracking-widest text-[10px] font-bold`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span>←</span> Back to Invitation
        </motion.button>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="md:pr-10">
            <h2
              className={`${TEXT_PRIMARY} mb-8 leading-tight`}
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(50px, 7vw, 82px)", // Responsive size
                textShadow: "1px 1px 0px rgba(255,255,255,0.5)",
              }}
            >
              A Land of Blue Hills
            </h2>
            <p
              className={`font-['Cormorant_Garamond'] text-2xl ${TEXT_PRIMARY} leading-relaxed italic mb-8 opacity-90`}
            >
              Beyond the wedding bells lies a gateway to the mystic East. From
              the rolling emerald tea estates of Jorhat to the ancient rhythms
              of the Brahmaputra, we invite you to see the world through our
              eyes.
            </p>
            <div className="h-px w-24 bg-[#8B5E3C]/40" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              delay={0.2}
              title="The Heritage"
              desc="Muga silk, woven with stories of generations."
              img={Silk}
            />
            <div className="pt-16">
              <FeatureCard
                delay={0.4}
                title="The Wild"
                desc="A dawn safari in Kaziranga, home to the Rhino."
                img={Rhinos}
              />
            </div>
          </div>
        </div>

        {/* Highlight Section - Using the Deep Espresso for the box to ground the page */}
        <div className="bg-[#2D241E] text-[#fdf8ec] p-12 md:p-20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="font-['Cinzel'] text-[10px] tracking-[0.5em] uppercase mb-6 text-amber-400/80">
              The Experience
            </h3>
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-4xl italic leading-snug">
              "Lush green tea gardens, and fresh river breezes. A place where
              time slows down, and every moment feels like a sip of serenity."
            </p>
          </div>
          <div
            className="absolute inset-0 opacity-50 bg-cover bg-center" // removed grayscale class
            style={{ backgroundImage: `url(${TeaGarden})` }}
          />
        </div>

        <div className="mt-20 text-center">
          <div className="flex justify-center gap-3 mb-4 opacity-30">
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
            <div className="w-1 h-1 rotate-45 bg-stone-800" />
          </div>
          <p
            className={`font-['Cinzel'] text-[9px] tracking-[0.5em] ${TEXT_ACCENT} uppercase font-bold`}
          >
            We truly wish you could be there with us
          </p>
        </div>
      </div>
    </div>
  );
}
