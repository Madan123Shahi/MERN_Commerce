import { Link } from "react-router-dom";
import logo from "../images/E-Commerce.jpg";
import { useState, useRef, useEffect, useCallback } from "react";

const categories = {
  electronics: {
    "Mobiles & Accessories": [
      "Smartphones",
      "Feature Phones",
      "Mobile Cases",
      "Chargers",
      "Power Banks",
      "Screen Protectors",
    ],
    Laptops: [
      "Gaming Laptops",
      "Business Laptops",
      "2-in-1 Laptops",
      "Laptop Bags",
      "Laptop Accessories",
    ],
    Tablets: ["Android Tablets", "iPads", "Tablet Keyboards", "Stylus Pens"],
    Cameras: [
      "DSLR",
      "Mirrorless",
      "Action Cameras",
      "Camera Lenses",
      "Tripods",
    ],
    Wearables: ["Smartwatches", "Fitness Bands", "VR Headsets"],
    Televisions: ["LED", "Smart TVs", "4K Ultra HD", "OLED TVs"],
    "Home Appliances": [
      "Air Conditioners",
      "Refrigerators",
      "Washing Machines",
      "Microwaves",
      "Vacuum Cleaners",
    ],
  },
  fashion: {
    "Men's Clothing": [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Jackets",
      "Suits",
    ],
    "Women's Clothing": [
      "Tops",
      "Dresses",
      "Sarees",
      "Kurtas",
      "Jeans",
      "Skirts",
    ],
    "Kid's Clothing": [
      "T-Shirts",
      "Frocks",
      "Shorts",
      "Ethnic Wear",
      "School Uniforms",
    ],
    Shoes: ["Sneakers", "Formal Shoes", "Sandals", "Heels", "Boots"],
    Jewelry: ["Necklaces", "Earrings", "Rings", "Bracelets"],
    Accessories: ["Watches", "Belts", "Hats", "Sunglasses", "Bags"],
  },
  home: {
    Furniture: ["Sofas", "Beds", "Tables", "Chairs", "Wardrobes"],
    "Home Decor": ["Paintings", "Clocks", "Wall Art", "Vases"],
    "Kitchen & Dining": [
      "Cookware",
      "Dinner Sets",
      "Storage Containers",
      "Cutlery",
    ],
    Bedding: ["Bedsheets", "Pillows", "Blankets", "Curtains"],
    Lighting: ["Ceiling Lights", "Table Lamps", "LED Bulbs"],
    "Tools & Hardware": ["Drills", "Screwdrivers", "Wrenches", "Tool Kits"],
  },
  beauty: {
    Makeup: ["Lipstick", "Foundation", "Eyeliner", "Mascara"],
    Skincare: ["Moisturizers", "Sunscreen", "Face Wash", "Serums"],
    Haircare: ["Shampoo", "Conditioner", "Hair Oil", "Hair Color"],
    Fragrances: ["Perfumes", "Deodorants", "Body Mists"],
    "Health & Wellness": ["Vitamins", "Supplements", "Ayurvedic Products"],
  },
  sports: {
    "Fitness Equipment": [
      "Treadmills",
      "Dumbbells",
      "Exercise Bikes",
      "Resistance Bands",
    ],
    Outdoor: ["Camping Gear", "Tents", "Hiking Backpacks"],
    Cricket: ["Bats", "Balls", "Pads", "Gloves"],
    Football: ["Football Shoes", "Football Kits", "Goal Nets"],
    Cycling: ["Bicycles", "Helmets", "Cycling Gloves"],
  },
  books: {
    Fiction: ["Novels", "Short Stories", "Fantasy", "Thrillers"],
    "Non-fiction": ["Biographies", "Self-help", "History", "Science"],
    "Children's Books": ["Picture Books", "Story Books", "Activity Books"],
    Educational: ["Textbooks", "Reference Books", "Exam Guides"],
    Comics: ["Manga", "Superhero", "Graphic Novels"],
  },
  grocery: {
    "Fruits & Vegetables": ["Fresh Fruits", "Leafy Vegetables", "Herbs"],
    Beverages: ["Juices", "Soft Drinks", "Tea", "Coffee"],
    Snacks: ["Chips", "Biscuits", "Nuts", "Chocolates"],
    Dairy: ["Milk", "Cheese", "Butter", "Yogurt"],
    "Meat & Seafood": ["Chicken", "Mutton", "Fish", "Prawns"],
    "Household Essentials": ["Detergents", "Cleaners", "Toilet Paper"],
  },
  toys: {
    "Action Figures": ["Superheroes", "Cartoon Characters", "Collectibles"],
    "Board Games": ["Chess", "Ludo", "Scrabble", "Monopoly"],
    Dolls: ["Barbie", "Fashion Dolls", "Dollhouses"],
    "Remote Control Toys": ["Cars", "Drones", "Boats"],
    "Educational Toys": ["STEM Kits", "Puzzles", "Building Blocks"],
  },
  automotive: {
    "Car Accessories": [
      "Seat Covers",
      "Car Mats",
      "Phone Holders",
      "Car Chargers",
    ],
    "Bike Accessories": ["Helmets", "Gloves", "Bike Covers"],
    "Oils & Fluids": ["Engine Oil", "Brake Oil", "Coolants"],
    "Tools & Equipment": ["Jacks", "Wrenches", "Tyre Inflators"],
  },
  pets: {
    "Pet Food": ["Dog Food", "Cat Food", "Fish Food"],
    "Pet Toys": ["Chew Toys", "Balls", "Interactive Toys"],
    "Pet Grooming": ["Shampoos", "Combs", "Trimmers"],
    "Aquarium Supplies": ["Tanks", "Filters", "Decorations"],
  },
};

const Header = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isInSub, setIsInSub] = useState(false);
  const dropdownRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  const capitalize = (s) =>
    typeof s === "string" && s.length > 0
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setHoveredCategory(null);
        setIsInSub(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMain = useCallback((main) => {
    setSelectedCategory(capitalize(main));
    setShowSuggestions(false);
    setHoveredCategory(null);
    setIsInSub(false);
  }, []);

  const handleSelectItem = (main, sub, item) => {
    setSelectedCategory(`${capitalize(main)} → ${sub} → ${item}`);
    setShowSuggestions(false);
    setHoveredCategory(null);
    setIsInSub(false);
  };

  const handleSearch = () => {
    console.log("Search clicked:", selectedCategory, searchInput);
    // Add search logic here
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!showSuggestions) return;

      const mainCategories = Object.keys(categories);
      const currentMain = mainCategories[highlightedIndex];
      const subCategories = hoveredCategory
        ? Object.keys(categories[hoveredCategory])
        : [];

      const flatSub = subCategories.flatMap((sub) =>
        categories[currentMain][sub].map((item) => ({ sub, item }))
      );

      if (!isInSub) {
        if (event.key === "ArrowDown") {
          setHighlightedIndex((prev) => {
            const next = prev + 1 < mainCategories.length ? prev + 1 : 0;
            setHoveredCategory(mainCategories[next]);
            return next;
          });
        } else if (event.key === "ArrowUp") {
          setHighlightedIndex((prev) => {
            const next = prev - 1 >= 0 ? prev - 1 : mainCategories.length - 1;
            setHoveredCategory(mainCategories[next]);
            return next;
          });
        } else if (
          (event.key === "ArrowRight" || event.key === "ArrowDown") &&
          flatSub.length > 0
        ) {
          setIsInSub(true);
          setSubIndex(0);
        } else if (event.key === "Enter") {
          handleSelectMain(currentMain);
        }
      } else {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          setSubIndex((prev) => (prev + 1 < flatSub.length ? prev + 1 : 0));
        } else if (event.key === "ArrowUp") {
          setSubIndex((prev) =>
            prev - 1 >= 0 ? prev - 1 : flatSub.length - 1
          );
        } else if (event.key === "ArrowLeft") {
          if (subIndex === 0) setIsInSub(false);
          else setSubIndex((prev) => prev - 1);
        } else if (event.key === "Enter") {
          const { sub, item } = flatSub[subIndex];
          handleSelectItem(currentMain, sub, item);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showSuggestions,
    highlightedIndex,
    subIndex,
    isInSub,
    hoveredCategory,
    handleSelectMain,
  ]);

  useEffect(() => {
    if (isInSub && showSuggestions) {
      const el = document.getElementById(`sub-item-${subIndex}`);
      if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [subIndex, isInSub, showSuggestions]);

  return (
    <div className="w-full flex items-center gap-6 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3 shadow-lg">
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 border-2 border-emerald-400"
        />
      </Link>

      {/* Unified search bar: dropdown + input + button */}
      <div
        className="flex flex-1 max-w-2xl rounded-lg shadow-lg"
        ref={dropdownRef}
      >
        {/* Categories dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSuggestions((s) => !s)}
            className="flex items-center gap-2 px-4 py-3 bg-emerald-600 border border-emerald-500 border-r-0 rounded-l-lg font-semibold cursor-pointer hover:bg-emerald-500 text-white outline-none transition-colors duration-200 min-w-[160px] justify-between"
          >
            <span className="truncate">{selectedCategory}</span>
            <span
              className={`text-xs transition-transform duration-200 ${
                showSuggestions ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {showSuggestions && (
            <div
              className="absolute top-full left-0 mt-1 rounded-lg shadow-xl z-20 flex max-h-[470px] overflow-hidden border border-gray-200"
              onMouseLeave={() => {
                setHoveredCategory(null);
                setIsInSub(false);
              }}
            >
              {/* Left column: main categories */}
              <div className="w-56 bg-white font-semibold border-r border-gray-100">
                {Object.keys(categories).map((cat, index) => (
                  <div
                    key={cat}
                    onMouseEnter={() => {
                      setHoveredCategory(cat);
                      setHighlightedIndex(index);
                    }}
                    onClick={() => handleSelectMain(cat)}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 border-l-2 ${
                      highlightedIndex === index && !isInSub
                        ? "bg-emerald-50 text-emerald-700 border-l-emerald-500 font-bold"
                        : "border-l-transparent hover:bg-gray-50 text-gray-700"
                    } ${hoveredCategory === cat ? "bg-gray-50" : ""}`}
                  >
                    {capitalize(cat)}
                  </div>
                ))}
              </div>

              {/* Right column: subcategories + items */}
              {hoveredCategory && (
                <div className="w-[500px] bg-white p-4 max-h-[470px] overflow-auto">
                  {Object.keys(categories[hoveredCategory]).map(
                    (sub, subIdx) => (
                      <div key={sub} className="mb-6">
                        <div className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-b border-gray-100 pb-2">
                          {sub}
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          {categories[hoveredCategory][sub].map((item, idx) => {
                            const globalIndex =
                              Object.keys(categories[hoveredCategory])
                                .slice(0, subIdx)
                                .reduce(
                                  (acc, s) =>
                                    acc + categories[hoveredCategory][s].length,
                                  0
                                ) + idx;

                            return (
                              <div
                                key={item}
                                id={`sub-item-${globalIndex}`}
                                className={`truncate cursor-pointer px-2 py-1 rounded transition-colors duration-150 ${
                                  isInSub && subIndex === globalIndex
                                    ? "bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                                onClick={() =>
                                  handleSelectItem(hoveredCategory, sub, item)
                                }
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for products, brands and more..."
          className="flex-1 p-3 border border-gray-300 border-l-0 bg-white text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-emerald-600 px-6 py-3 border border-emerald-500 border-l-0 rounded-r-lg font-semibold hover:bg-emerald-500 cursor-pointer text-white transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
