import { useState, useRef, useEffect } from "react";
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
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // open state + open reason (hover vs click)
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryOpenBy, setCategoryOpenBy] = useState(null);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageOpenBy, setLanguageOpenBy] = useState(null);

  const [focusArea, setFocusArea] = useState(null);

  // refs
  const inputRef = useRef(null);
  const searchBarRef = useRef(null);
  const categoryRef = useRef(null);
  const languageRef = useRef(null);

  // timeout refs for hover delay
  const categoryTimeoutRef = useRef(null);
  const languageTimeoutRef = useRef(null);

  const focusInputNextTick = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        (searchBarRef.current && searchBarRef.current.contains(target)) ||
        (categoryRef.current && categoryRef.current.contains(target)) ||
        (languageRef.current && languageRef.current.contains(target))
      ) {
        return;
      }
      setFocusArea(null);
      setCategoryOpen(false);
      setCategoryOpenBy(null);
      setLanguageOpen(false);
      setLanguageOpenBy(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Category handlers with delay
  const handleCategoryMouseEnter = () => {
    clearTimeout(categoryTimeoutRef.current);
    if (!categoryOpen || categoryOpenBy !== "click") {
      setCategoryOpen(true);
      setCategoryOpenBy("hover");
    }
  };
  const handleCategoryMouseLeave = () => {
    clearTimeout(categoryTimeoutRef.current);
    categoryTimeoutRef.current = setTimeout(() => {
      if (categoryOpenBy === "hover") {
        setCategoryOpen(false);
        setCategoryOpenBy(null);
      }
    }, 250); // 250ms delay
  };
  const handleCategoryClick = () => {
    clearTimeout(categoryTimeoutRef.current);
    if (categoryOpen && categoryOpenBy === "click") {
      setCategoryOpen(false);
      setCategoryOpenBy(null);
    } else {
      setCategoryOpen(true);
      setCategoryOpenBy("click");
    }
    setFocusArea("category");
  };

  // Language handlers with delay
  const handleLanguageMouseEnter = () => {
    clearTimeout(languageTimeoutRef.current);
    if (!languageOpen || languageOpenBy !== "click") {
      setLanguageOpen(true);
      setLanguageOpenBy("hover");
    }
  };
  const handleLanguageMouseLeave = () => {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(() => {
      if (languageOpenBy === "hover") {
        setLanguageOpen(false);
        setLanguageOpenBy(null);
      }
    }, 250);
  };
  const handleLanguageClick = () => {
    clearTimeout(languageTimeoutRef.current);
    if (languageOpen && languageOpenBy === "click") {
      setLanguageOpen(false);
      setLanguageOpenBy(null);
    } else {
      setLanguageOpen(true);
      setLanguageOpenBy("click");
    }
  };

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
            <div
              ref={categoryRef}
              className="relative hidden sm:flex"
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <button
                onClick={handleCategoryClick}
                className="flex items-center px-3 py-3 text-white rounded-l-md text-base border-r-4 border-white w-24 truncate hover:bg-blue-400"
                aria-expanded={categoryOpen}
                aria-haspopup="menu"
                type="button"
              >
                <span className="truncate" title={selectedCategory.name}>
                  {selectedCategory.name}
                </span>
                <ChevronDownIcon
                  className={`ml-1 h-6 w-5 flex-shrink-0 transition-transform duration-200 ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 mt-13 w-46 bg-white border border-blue-500 rounded-md shadow-lg max-h-64 overflow-y-auto z-50 text-blue-500 no-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCategoryOpen(false);
                        setCategoryOpenBy(null);
                        setFocusArea("searchbar");
                        focusInputNextTick();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-400"
                      type="button"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Products..."
              onFocus={() => setFocusArea("searchbar")}
              className="flex-1 px-4 py-3 border-r-4   border-r-white hover:bg-blue-400 bg-transparent placeholder-white focus:outline-none"
            />

            {/* Search Button */}
            <button
              onClick={() => setFocusArea("button")}
              className={`px-5 bg-blue-500 hover:bg-blue-400 text-white rounded-r-md transition-all ${
                focusArea === "button" ? "ring-2 ring-white ring-offset-1" : ""
              }`}
              type="button"
            >
              <MagnifyingGlassIcon className="h-8 w-8 cursor-pointer" />
            </button>
          </div>

          {/* Language Dropdown */}
          <div
            ref={languageRef}
            className="relative w-25"
            onMouseEnter={handleLanguageMouseEnter}
            onMouseLeave={handleLanguageMouseLeave}
          >
            <button
              onClick={handleLanguageClick}
              className="inline-flex gap-1 items-center w-full justify-end hover:text-blue-200"
              aria-expanded={languageOpen}
              aria-haspopup="menu"
              type="button"
            >
              {selectedLang.name}
              <ChevronDownIcon
                className={`h-6 w-5 transition-transform duration-200 ${
                  languageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-4 w-32 bg-white border border-blue-500 rounded-md shadow-lg max-h-80 overflow-y-auto text-blue-500 z-50 no-scrollbar">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLanguageOpen(false);
                      setLanguageOpenBy(null);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-blue-100"
                    type="button"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
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
