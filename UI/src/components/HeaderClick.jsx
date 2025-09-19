import { useState, useRef, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowUturnLeftIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import logo from "../images/Logo.png";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "ur", name: "Urdu" },
  { code: "fa", name: "Persian" },
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
  { name: "All Categories" },
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [focusArea, setFocusArea] = useState(null);

  const inputRef = useRef(null);
  const searchBarRef = useRef(null);

  const focusInputNextTick = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setFocusArea(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 ${className}`}>
      <div className="bg-blue-500 text-base text-white font-semibold flex items-center px-8 py-2 gap-6">
        {/* LEFT: Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              className="h-14 w-14 object-contain brightness-0 invert cursor-pointer transition-transform duration-300 hover:rotate-2 hover:scale-105 rounded-lg"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>

        {/* MIDDLE: Search + Language */}
        <div className="flex flex-1 max-w-3xl items-center gap-4 justify-center">
          {/* Search Bar */}
          <div
            ref={searchBarRef}
            className={`flex flex-[3] min-w-[400px] rounded-md border-4 border-white transition-all
              ${
                focusArea === "searchbar"
                  ? "ring-2 ring-white ring-offset-1"
                  : ""
              }`}
          >
            {/* Category Dropdown */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <MenuButton
                    onClick={() => setFocusArea("category")}
                    className={`hidden sm:flex items-center
                       px-3 py-3 text-white rounded-l-md text-base border-r-4 border-white w-22 truncate hover:bg-blue-400
                       focus:outline-none
                      ${focusArea === "category" ? " hover:bg-blue-400" : ""}`}
                  >
                    <span className="truncate " title={selectedCategory.name}>
                      {selectedCategory.name}
                    </span>

                    <ChevronDownIcon
                      className={`ml-1 h-6 w-5 flex shrink-0 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </MenuButton>

                  <MenuItems className="absolute left-0 mt-1.5 w-46 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto z-50 text-blue-500 no-scrollbar ring-2 ring-blue-400 focus:outline-none">
                    {categories.map((category) => (
                      <MenuItem
                        key={category.name}
                        as="button"
                        onClick={() => {
                          setSelectedCategory(category);
                          setFocusArea("searchbar");
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
              placeholder="Search Products..."
              onFocus={() => setFocusArea("searchbar")}
              className="flex-1 px-4 py-3 border-r-4 border-r-white hover:bg-blue-400 bg-transparent placeholder-white focus:outline-none"
            />

            {/* Search Button */}
            <button
              onClick={() => setFocusArea("button")}
              className={`px-5 bg-blue-500 hover:bg-blue-400 text-white rounded-r-md transition-all
                ${
                  focusArea === "button"
                    ? "ring-2 ring-white ring-offset-1"
                    : ""
                }`}
            >
              <MagnifyingGlassIcon className="h-8 w-8 cursor-pointer" />
            </button>
          </div>

          {/* Language Dropdown */}
          <div className="w-25">
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <MenuButton className="inline-flex gap-1 items-center  w-full justify-end hover:text-blue-200 focus:outline-none">
                    {selected.name}
                    <ChevronDownIcon
                      className={`h-6 w-5 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-4 w-32 origin-top-right bg-white border-2 border-blue-500 rounded-md shadow-lg max-h-80 overflow-y-auto text-blue-500 no-scrollbar focus:outline-none">
                    {languages.map((lang) => (
                      <MenuItem
                        key={lang.code}
                        as="button"
                        onClick={() => setSelected(lang)}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-100"
                      >
                        {lang.name}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </>
              )}
            </Menu>
          </div>
        </div>

        {/* RIGHT: Links */}
        <div className="flex items-center gap-6 text-base font-medium">
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-blue-200"
          >
            <UserIcon className="h-5 w-5" />
            <span>Login</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-1 hover:text-blue-200"
          >
            <ArrowUturnLeftIcon className="h-5 w-5" />
            <span>Returns & Orders</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-blue-200"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span>Cart</span>
          </Link>

          <Link
            to="/seller"
            className="flex items-center gap-1 hover:text-blue-200"
          >
            <BuildingStorefrontIcon className="h-5 w-5" />
            <span>Become a Seller</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
