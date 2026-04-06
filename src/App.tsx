import { useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import EnvelopeIntro from "./components/EnvelopeIntro";
import LanguageSwitcher from "./components/LanguageSwitcher";
import i18n from "./i18n";

const SUPPORTED_LANGUAGES = ["en", "de", "as"];

function AppContent() {
  const { lang } = useParams<{ lang: string }>();

  if (!SUPPORTED_LANGUAGES.includes(lang!)) {
    return <Navigate to="/en" replace />;
  }

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#faf7f2]">
      <LanguageSwitcher />
      <EnvelopeIntro />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang/*" element={<AppContent />} />
    </Routes>
  );
}

export default App;
