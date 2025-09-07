import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon } from "@heroicons/react/24/solid";

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

const categories = [
  { name: "Mobiles & Tablets" },
  { name: "Fashion" },
  { name: "Electronics" },
  { name: "Home & Furniture" },
  { name: "TVs & Appliances" },
  { name: "Beauty & Personal Care" },
  { name: "Grocery" },
];

const Header = ({ className = "" }) => {
  const [selected, setSelected] = useState(languages[0]);
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  return (
    <header className={`w-full shadow-md ${className}`}>
      <div className="bg-green-400 text-sm text-white flex items-center justify-between px-6 py-2">
        <div className="flex gap-1 items-center">
          <PhoneIcon className="size-5" />
          <span>+919857422223</span>
        </div>
        <div className="hidden sm:flex items-center">
          Get 50% off on selected items <span className="px-2">|</span>
          <a href="#" className="hover:text-green-100 ml-1">
            Shop Now
          </a>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex gap-1 items-center hover:text-green-100 w-40 justify-end">
            {selected.name}
            <ChevronDownIcon className="size-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2  w-44 origin-top-right bg-green-400 border border-green-500 rounded-md shadow-lg focus:outline-none transition duration-100 ease-out z-50 max-h-60 overflow-y-auto no-scrollbar">
            {languages.map((lang) => (
              <MenuItem key={lang.code}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => setSelected(lang)}
                    className={`${
                      focus ? "bg-green-500 text-white" : ""
                    } block w-full px-4 py-2 text-left text-sm  ${
                      selected.code === lang.code ? "font-bold" : ""
                    }`}
                    aria-current={
                      selected.code === lang.code ? "true" : "false"
                    }
                  >
                    {lang.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">Logo</div>
        <div className="hidden md:flex gap-6">
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex gap-1 items-center">
              {selectedCategory}
              <ChevronDownIcon className="size-4" />
            </MenuButton>
            <MenuItems
              transition
              className="absolute left-0 mt-2 w-48 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none transition duration-100 ease-out z-50"
            >
              {categories.map((category) => (
                <MenuItem key={category.name}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(category.name)}
                      className={`${
                        focus ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      {category.name}
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <a href="#" className="hover:text-green-500">
            Deals
          </a>
          <a href="#" className="hover:text-green-500">
            What's New
          </a>
          <a href="#" className="hover:text-green-500">
            Delivery
          </a>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-green-500">
            Account
          </a>
          <a href="#" className="hover:text-green-500">
            Cart
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
