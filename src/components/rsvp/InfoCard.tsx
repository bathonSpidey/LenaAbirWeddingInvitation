import { motion } from "framer-motion";
import { S } from "./styles";

interface InfoCardProps {
  title: string;
  body: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export default function InfoCard({ title, body, buttonLabel, onButtonClick }: InfoCardProps) {
  return (
    <section className={S.cardShell}>
      <div>
        <h4 className={S.cardTitle}>{title}</h4>
        <p className={S.cardBody}>{body}</p>
      </div>
      <div className="flex justify-center">
        <motion.button
          onClick={onButtonClick}
          whileHover={{ scale: 1.05, backgroundColor: "#2D241E", color: "#fdf8ec" }}
          className={S.ghostBtn}
        >
          {buttonLabel}
        </motion.button>
      </div>
    </section>
  );
}
