import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const EMAILJS_SERVICE_ID = "wedding";
const EMAILJS_TEMPLATE_ID = "template_l3v4gsa";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function GuidedBookingCTA() {
  const { t } = useTranslation();
  const [guestEmail, setGuestEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReachOut = async () => {
    if (!isValidEmail(guestEmail) || sending) return;
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: guestEmail.trim(),
          to_email: "abir.bhattacharyya22@gmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setGuestEmail("");
    } catch {
      alert("Something went wrong — please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-16 bg-[#FCFBFA] border border-stone-200 rounded-sm shadow-sm p-10 md:p-16 text-center relative overflow-hidden"
    >
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-stone-100 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-stone-100 pointer-events-none" />

      {/* Floating Envelope Icon */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center mb-6"
      >
        {/* <div className="p-3 rounded-full border border-[#c9a961]/20">
          <Mail className="w-5 h-5 text-[#c9a961] stroke-[1px]" />
        </div> */}
      </motion.div>

      <h6 className="font-['Cinzel'] text-[10px] tracking-[0.4em] uppercase text-[#c9a961] font-bold mb-4">
        {t("travelPortal.needHand")}
      </h6>

      <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#1a2849] mb-10 max-w-lg mx-auto leading-relaxed">
        {t("travelPortal.guidedBooking")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
        <div className="flex-1 w-full border-b border-stone-300 focus-within:border-[#c9a961] transition-all duration-500 pb-1">
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => {
              setGuestEmail(e.target.value);
              setSent(false);
            }}
            placeholder="Your email address..."
            className="w-full bg-transparent px-2 py-3 font-['Cormorant_Garamond'] text-lg italic text-stone-600 placeholder:text-stone-300 focus:outline-none"
          />
        </div>

        <motion.button
          disabled={!isValidEmail(guestEmail) || sending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReachOut}
          className="w-full sm:w-auto px-8 py-3 text-[10px] font-['Cinzel'] tracking-[0.3em] uppercase transition-all whitespace-nowrap disabled:opacity-30 text-[#1a2849] font-bold border border-[#1a2849]/10 sm:border-none"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={sending ? "sending" : sent ? "sent" : "idle"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {sending
                ? "Sending Correspondence..."
                : sent
                  ? "Letter Sent ✓"
                  : t("travelPortal.reachOut")}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <p className="mt-8 font-['Cinzel'] text-[8px] tracking-[0.3em] text-stone-400 uppercase opacity-60">
        Personal assistance for your grand tour
      </p>
    </motion.div>
  );
}
