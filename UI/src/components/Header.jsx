import { useState, useRef, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import logo from "../images/Logo.png";

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
  const [focusArea, setFocusArea] = useState(null); // "category" | "searchbar" | "button"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inputRef = useRef(null);
  const searchBarRef = useRef(null);

  // helper to move focus to input after category select
  const focusInputNextTick = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setFocusArea(null); // reset rings
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 ${className}`}>
      {/* Top Banner */}
      <div className="bg-white text-sm text-blue-500 font-semibold flex items-center justify-between px-8 py-2">
        <div className="flex gap-1 items-center">
          <PhoneIcon className="h-5 w-5" />
          <span>+919857422223</span>
        </div>
        <div className="hidden sm:flex items-center">
          Get 50% off on selected items <span className="px-2">|</span>
          <a href="#" className="hover:text-blue-400 ml-1">
            Shop Now
          </a>
        </div>

        {/* Language Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="inline-flex gap-1 items-center hover:text-blue-400 w-40 justify-end">
            {selected.name}
            <ChevronDownIcon className="h-4 w-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-47 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto text-gray-800 no-scrollbar">
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                as="button"
                onClick={() => setSelected(lang)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-blue-500 hover:text-blue-400"
              >
                {lang.name}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 gap-6 bg-blue-500 text-white font-semibold text-base py-3">
        {/* Logo */}
        <div>
          <a>
            <img
              className="h-8 sm:h-10 md:h-12 brightness-0 invert cursor-pointer transition-transform duration-300 hover:rotate-2 hover:scale-105 rounded-lg"
              src={logo}
              alt="logo"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex text-base gap-6">
          <a href="#" className="hover:text-blue-100">
            Deals
          </a>
          <a href="#" className="hover:text-blue-100">
            What's New
          </a>
          <a href="#" className="hover:text-blue-100">
            Delivery
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white ml-2"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>

        {/* Search Bar */}
        <div
          ref={searchBarRef}
          className={`flex w-full sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-md border border-white/30 transition-all
            ${
              focusArea === "searchbar" ? "ring-2 ring-white ring-offset-1" : ""
            }`}
        >
          {/* Category Dropdown */}
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <MenuButton
                  onClick={() => setFocusArea("category")}
                  className={`hidden sm:flex items-center px-3 py-3 text-white rounded-l-md text-base border-r border-white/30
                    ${
                      focusArea === "category"
                        ? "ring-2 ring-white ring-offset-1 hover:bg-blue-400"
                        : ""
                    }`}
                >
                  {selectedCategory}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </MenuButton>

                <MenuItems className="absolute left-0 mt-1 w-48 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto z-50 text-blue-500">
                  {categories.map((category) => (
                    <MenuItem
                      key={category.name}
                      as="button"
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setFocusArea("searchbar"); // highlight whole search bar
                        focusInputNextTick();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-400"
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </MenuItems>
              </>
            )}
          </Menu>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            onFocus={() => setFocusArea("searchbar")}
            className="flex-1 px-4 py-3 border-r border-r-white/30 hover:bg-blue-400 bg-transparent placeholder-white focus:outline-none"
          />

          {/* Search Button */}
          <button
            onClick={() => setFocusArea("button")}
            className={`px-5 bg-blue-500 hover:bg-blue-400 text-white rounded-r-md transition-all
              ${
                focusArea === "button" ? "ring-2 ring-white ring-offset-1" : ""
              }`}
          >
            <MagnifyingGlassIcon className="h-8 w-8 cursor-pointer" />
          </button>
        </div>

        {/* Account & Cart */}
        <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
          <a href="#" className="hover:text-blue-100">
            Account
          </a>
          <a href="#" className="hover:text-blue-100 pr-2">
            Cart
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-2 text-sm sm:text-base">
          <a href="#" className="block py-2 hover:text-blue-100">
            Deals
          </a>
          <a href="#" className="block py-2 hover:text-blue-100">
            What's New
          </a>
          <a href="#" className="block py-2 hover:text-blue-100">
            Delivery
          </a>
          <a href="#" className="block py-2 hover:text-blue-100">
            Account
          </a>
          <a href="#" className="block py-2 hover:text-blue-100">
            Cart
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
