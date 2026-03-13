import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TravelPortalFooter() {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-16 text-center"
    >
      <p className="font-['Cormorant_Garamond'] text-2xl italic text-[#2D3E50]">
        {t("travelPortal.footer")}
      </p>
    </motion.footer>
  );
}
