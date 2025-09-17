import { useState, useRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

const categories = [
  { name: "All" },
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
  { name: "Shoes" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const inputRef = useRef(null);

  // Refocus search input after choosing category
  const focusInputNextTick = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  return (
    <header className="p-4 bg-blue-700 text-white flex items-center justify-between">
      {/* Search bar with Category dropdown */}
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        {/* Category Dropdown */}
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <div
                onMouseEnter={(e) =>
                  e.currentTarget.querySelector("button")?.click()
                }
                onMouseLeave={(e) => {
                  if (open) e.currentTarget.querySelector("button")?.click();
                }}
              >
                <MenuButton className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-400 text-xs text-white rounded-l-md border-r border-white/30 focus:outline-none truncate w-32">
                  <span className="truncate">{selectedCategory.name}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </MenuButton>
              </div>

              <MenuItems
                static
                className="absolute left-0 mt-1 w-52 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto z-50 text-gray-800"
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.name}
                    as="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      focusInputNextTick();
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-500"
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </MenuItems>
            </>
          )}
        </Menu>

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 text-sm text-gray-700 outline-none w-64"
        />

        {/* Search button */}
        <button className="px-3 py-2 bg-blue-600 text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Language Dropdown */}
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <div
              onMouseEnter={(e) =>
                e.currentTarget.querySelector("button")?.click()
              }
              onMouseLeave={(e) => {
                if (open) e.currentTarget.querySelector("button")?.click();
              }}
            >
              <MenuButton className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-400 rounded-md text-sm">
                {selectedLanguage.name}
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </MenuButton>
            </div>

            <MenuItems
              static
              className="absolute right-0 mt-1 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50 text-gray-800"
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  as="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-blue-500"
                >
                  {lang.name}
                </MenuItem>
              ))}
            </MenuItems>
          </>
        )}
      </Menu>
    </header>
  );
}
