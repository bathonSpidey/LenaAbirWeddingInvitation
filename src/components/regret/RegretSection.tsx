import React from "react";
import { useTranslation } from "react-i18next";
import PaperTexture from "../../assets/Paper.jpg";
import BackButton from "./BackButton";
import SectionHeading from "./SectionHeading";
import SectionQuote from "./SectionQuote";
import ActionButton from "./ActionButton";
import ButtonGroup from "./ButtonGroup";
import TextureSection from "./TextureSection";

interface RegretsSectionProps {
  innerRef: React.RefObject<HTMLDivElement>;
  onBack: () => void;
  onOurStory: () => void;
  onDiscover: () => void;
}

const RegretsSection: React.FC<RegretsSectionProps> = ({
  innerRef,
  onBack,
  onOurStory,
  onDiscover,
}) => {
  const { t } = useTranslation();

  return (
    <TextureSection ref={innerRef} backgroundImage={PaperTexture}>
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <BackButton onClick={onBack} label={t("common.backToInvitation")} />
      </div>

      <div className="max-w-2xl text-center px-4">
        {/* Added a small thematic flourish */}
        {/* <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          src={VisaStamp}
          className="w-16 h-16 mx-auto mb-8 mix-blend-multiply grayscale"
          alt="decorative stamp"
        /> */}

        <SectionHeading className="mb-6 text-[#2A3F5C]">
          {t("regrets.heading")}
        </SectionHeading>

        <SectionQuote className="mb-12">{t("regrets.quote")}</SectionQuote>

        <ButtonGroup>
          <ActionButton onClick={onOurStory} variant="secondary">
            {t("regrets.knowStory")}
          </ActionButton>

          <ActionButton onClick={onDiscover} variant="primary">
            {t("regrets.seeWhatMissing")}
          </ActionButton>
        </ButtonGroup>
      </div>

      {/* Subtle footer credit */}
      <p className="absolute bottom-12 font-['Cinzel'] text-[8px] tracking-widest text-stone-400 uppercase">
        With Love, Abir & Lena
      </p>
    </TextureSection>
  );
};

export default RegretsSection;
