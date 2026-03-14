import { useTranslation } from "react-i18next";
import ExpectationTexture from "../../assets/ExpectTexture.jpeg";
import ExpectationsHeader from "./ExpectationsHeader";
import ExpectationsGrid from "./ExpectationsGrid";
import BackButton from "./BackButton";
import { useExpectationsItems } from "./ExpectationItems";

interface ExpectationsProps {
  innerRef: React.RefObject<HTMLDivElement>;
  onBack: () => void;
}

export default function Expectations({ innerRef, onBack }: ExpectationsProps) {
  const { t } = useTranslation();
  const items = useExpectationsItems();

  return (
    <section
      ref={innerRef}
      className="min-h-screen w-full snap-start relative overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(253, 248, 236, 0.2), rgba(253, 248, 236, 0.2)), url(${ExpectationTexture})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle vignette to help readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-24 relative z-10">
        <ExpectationsHeader
          label={t("expectations.label")}
          heading={t("expectations.heading")}
          subtitle={t("expectations.subtitle")}
        />
        <ExpectationsGrid items={items} />

        <BackButton label={t("common.backToDetails")} onClick={onBack} />
      </div>
    </section>
  );
}
