import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const LANGS = [
  { code: "en", label: "EN", title: "English" },
  { code: "de", label: "DE", title: "Deutsch" },
  { code: "as", label: "অস", title: "অসমীয়া" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const current = lang ?? i18n.language;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10"
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {LANGS.map(({ code, label, title }) => (
        <button
          key={code}
          title={title}
          onClick={() => navigate(`/${code}`)}
          className={`text-[9px] tracking-widest px-2 py-1 rounded-full transition-colors cursor-pointer ${
            current === code
              ? "bg-amber-500/80 text-white"
              : "text-white/60 hover:text-white"
          }`}
          style={{ fontFamily: code === "as" ? "inherit" : "'Cinzel', serif" }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
