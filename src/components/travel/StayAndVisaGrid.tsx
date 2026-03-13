import { motion } from "framer-motion";
import VisaCard from "./VisaCard";
import AccommodationCard from "./AccommodationCard";

export default function StaysAndVisaGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-8"
    >
      <VisaCard />
      <AccommodationCard />
    </motion.div>
  );
}
