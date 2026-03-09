import EnvelopeIntro from "./components/EnvelopeIntro"
import LanguageSwitcher from "./components/LanguageSwitcher"

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#faf7f2]">
      <LanguageSwitcher />
      <EnvelopeIntro />
    </div>
  )
}

export default App