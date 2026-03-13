import { useState } from "react";
import { useTranslation } from "react-i18next";
import CountdownStrip from "../BridgertonCountdown";
import FlowerSlider from "../Slider";
import { styles } from "./styles";

export default function CardContent({
  onDecline,
  onRSVP,
}: {
  onDecline: () => void;
  onRSVP: () => void;
}) {
  const { t } = useTranslation();
  const [sliderKey, setSliderKey] = useState(0);

  return (
    <>
      <style>{styles}</style>

      <div className="card-outer">
        <div className="card">
          {/* Double inner borders */}
          <div className="inner-border" />

          {/* Corner flourishes — exact from BridgertonInvitation */}
          <div className="corner-flourish tl">❧</div>
          <div className="corner-flourish tr">❧</div>
          <div className="corner-flourish bl">❧</div>
          <div className="corner-flourish br">❧</div>

          <div className="content">
            {/* Eyebrow — "By Order of the Ton" style */}
            <p className="eyebrow">{t("card.honor")}</p>

            {/* Monogram line */}
            <div className="monogram-wrap">
              <div className="mono-line" />
              <span className="monogram">A & L</span>
              <div className="mono-line right" />
            </div>

            {/* Together text */}
            <p className="together-text">
              request the honour of your presence at the marriage of
            </p>

            {/* Names — Pinyon Script stacked */}
            <div className="names">
              <span className="name-primary">Abir Bhattacharyya</span>
              <span className="name-ampersand">&</span>
              <span className="name-primary">Lena Tuchtenhagen</span>
            </div>

            {/* Divider ornament */}
            <div className="divider-ornament">
              <div className="line" />
              <span className="flourish">✦</span>
              <span className="flourish" style={{ animationDelay: "1.5s" }}>
                ✿
              </span>
              <span className="flourish" style={{ animationDelay: "0.8s" }}>
                ✦
              </span>
              <div className="line" />
            </div>

            {/* Celebration + Reception */}
            <p className="celebration-text">{t("card.celebration")}</p>
            <p className="reception-text">{t("card.reception")}</p>

            {/* Details block */}
            <div className="details-grid">
              {/* Date row */}
              <div style={{ textAlign: "center", marginBottom: "0.3rem" }}>
                <span className="detail-label">{t("card.saturday")}</span>
                <span className="detail-main">6 December 2026</span>
              </div>

              {/* Venue + Time side by side */}
              <div className="venue-time-grid">
                <div style={{ textAlign: "center", paddingRight: "0.5rem" }}>
                  <span className="detail-label">{t("card.venue")}</span>
                  <span className="detail-main">Jorhat</span>
                </div>
                <div className="venue-time-divider" />
                <div style={{ textAlign: "center", paddingLeft: "0.5rem" }}>
                  <span className="detail-label">{t("card.time")}</span>
                  <span className="detail-main">5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Petal row */}
            <div className="petal-row-inner">
              <span className="petal-a">✿</span>
              <span style={{ color: "#AF944D" }} className="petal-b">
                ✦
              </span>
              <span className="petal-c">✿</span>
              <span style={{ color: "#AF944D" }} className="petal-a">
                ✦
              </span>
              <span className="petal-b">✿</span>
            </div>

            {/* FlowerSlider + Decline — untouched logic */}
            <div className="action-slot">
              <div
                style={{
                  width: "100%",
                  transform: "scale(0.95)",
                  transformOrigin: "center",
                }}
              >
                <FlowerSlider key={sliderKey} onRSVP={onRSVP} />
              </div>

              <button
                className="decline-btn"
                onClick={() => {
                  setSliderKey((k) => k + 1);
                  onDecline();
                }}
              >
                {t("card.cantMakeIt")}
              </button>
            </div>

            {/* CountdownStrip — untouched */}
            <div className="countdown-slot">
              <CountdownStrip />
            </div>

            {/* Footer flourish */}
            <div className="footer-flourish">
              <div className="footer-petal-row">
                <span>✿</span>
                <span>✦</span>
                <span>✿</span>
                <span>✦</span>
                <span>✿</span>
              </div>
              <p className="footer-text">
                "In every walk with nature, one receives far more than he
                seeks."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
