import { FaPhone } from "react-icons/fa";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

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
  const [selected, setSelected] = useState(languages[0]);

  return (
    <header className={`w-full py-4 shadow-md  ${className}`}>
      <div className="bg-green-700 p-2 flex justify-between items-center text-sm">
        <div className="flex gap-2 pl-5">
          <FaPhone className="text-white w-5 h-5" />
          <span className="text-white">+919857422223</span>
        </div>
        <div className="hidden sm:flex text-white">
          Get 50% off on selected items <span className="px-2">|</span> Shop Now
        </div>
        <div className="pr-5">
          <Menu as="div" className="relative ">
            <MenuButton className="flex items-center gap-1 p-2 focus:outline-none text-sm text-white w-20">
              {selected.name}
              <ChevronDownIcon className="size-5" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-y-auto scrollbar-hide">
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  as="button"
                  onClick={() => setSelected(lang)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-green-700"
                >
                  {lang.name}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
      {/* You can add your main header content here instead of the empty divs */}
    </header>
  );
};

export default Header;
