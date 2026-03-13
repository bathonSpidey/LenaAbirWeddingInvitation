import { useState } from "react";
import { motion } from "framer-motion";
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
      transition={{ duration: 0.7, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-10 bg-white/80 border border-blue-100 rounded-sm shadow-sm p-8 md:p-12 text-center"
    >
      <p className="font-['Cinzel'] text-[10px] tracking-widest uppercase text-[#8B5E3C] font-bold mb-3">
        {t("travelPortal.needHand")}
      </p>
      <p className="font-['Cormorant_Garamond'] text-xl italic text-stone-600 mb-6">
        {t("travelPortal.guidedBooking")}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => {
            setGuestEmail(e.target.value);
            setSent(false);
          }}
          placeholder="your@email.com"
          className="flex-1 border border-[#2D3E50]/30 rounded-sm px-4 py-3 font-['Cormorant_Garamond'] text-base italic text-stone-600 placeholder:text-stone-300 focus:outline-none focus:border-[#8B5E3C] transition-colors bg-white"
        />
        <motion.button
          disabled={!isValidEmail(guestEmail) || sending}
          whileHover={
            isValidEmail(guestEmail) && !sending
              ? { backgroundColor: "#2D3E50", color: "#fff" }
              : {}
          }
          onClick={handleReachOut}
          className="border border-[#2D3E50] px-6 py-3 text-[9px] font-['Cinzel'] tracking-widest uppercase transition-all whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {sending ? "Sending…" : sent ? "Sent ✓" : t("travelPortal.reachOut")}
        </motion.button>
      </div>
    </motion.div>
  );
}
