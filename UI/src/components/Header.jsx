import { FaPhone } from "react-icons/fa";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "ur", name: "Urdu" },
  { code: "fa", name: "Persian (Farsi)" },
  { code: "id", name: "Indonesian" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "ms", name: "Malay" },
  { code: "sw", name: "Swahili" },
  { code: "uk", name: "Ukrainian" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
  { code: "tr", name: "Turkish" },
];

const Header = ({ className = "" }) => {
  const [selected, setSelected] = useState("en");
  return (
    <header className={`w-full py-4  shadow-md  ${className}`}>
      <div className="bg-green-700 p-2 flex justify-between text-sm">
        <div className="flex gap-2 pl-5 items-center">
          <FaPhone className="text-white w-5 h-5" />
          <span className="text-white">+919857422223</span>
        </div>
        <div className="text-white text-center hidden sm:block">
          Get 50% off on selected items <span className="px-2">|</span> Shop Now
        </div>
        <div className="flex items-center gap-2 pr-5">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="text-white focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-black">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
