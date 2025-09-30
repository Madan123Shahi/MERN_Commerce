import { Link } from "react-router-dom";
import logo from "../images/E-Commerce.jpg";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
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
  // 🔹 Mega-dropdown states
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isInSub, setIsInSub] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Search bar states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const capitalize = (s) =>
    typeof s === "string" && s.length > 0
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;

  const handleSearch = () => {
    alert(
      `Searching for "${searchTerm}" in ${selectedCategory}${
        selectedSubCategory ? " → " + selectedSubCategory : ""
      }${selectedItem ? " → " + selectedItem : ""}`
    );
  };

  // 🔹 Dropdown outside click close
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

  // 🔹 Mega dropdown select
  const handleSelectMain = useCallback((main) => {
    setSelectedCategory(capitalize(main));
    setShowSuggestions(false);
    setHoveredCategory(null);
    setIsInSub(false);
    setSelectedSubCategory("");
    setSelectedItem("");
  }, []);

  const handleSelectItem = (main, sub, item) => {
    setSelectedCategory(capitalize(main));
    setSelectedSubCategory(sub);
    setSelectedItem(item);
    setShowSuggestions(false);
    setHoveredCategory(null);
    setIsInSub(false);
  };

  // 🔹 Keyboard navigation for mega dropdown
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
          setIsInSub(false);
          setSubIndex(0);
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

  // 🔹 Auto-scroll for sub items
  useEffect(() => {
    if (isInSub && showSuggestions) {
      const el = document.getElementById(`sub-item-${subIndex}`);
      if (el) {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [subIndex, isInSub, showSuggestions]);

  // 🔹 Build options for search dropdowns
  const mainOptions = ["All", ...Object.keys(categories).map(capitalize)];
  const subOptions =
    selectedCategory !== "All" && categories[selectedCategory.toLowerCase()]
      ? Object.keys(categories[selectedCategory.toLowerCase()])
      : [];
  const itemOptions =
    selectedCategory !== "All" &&
    selectedSubCategory &&
    categories[selectedCategory.toLowerCase()] &&
    categories[selectedCategory.toLowerCase()][selectedSubCategory]
      ? categories[selectedCategory.toLowerCase()][selectedSubCategory]
      : [];

  return (
    <div className="w-full flex items-center gap-8 bg-blue-500 px-4 py-2">
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full shadow-md cursor-pointer tilt-animation hover:scale-110"
        />
      </Link>

      {/* 🔹 Amazon-style Search Bar */}
      <div className="flex flex-1 max-w-5xl">
        {/* Main Category */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("");
            setSelectedItem("");
          }}
          className="px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          {mainOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        {subOptions.length > 0 && (
          <select
            value={selectedSubCategory}
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              setSelectedItem("");
            }}
            className="px-3 py-2 border border-gray-300 text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <option value="">All Subcategories</option>
            {subOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        {/* Item */}
        {itemOptions.length > 0 && (
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="px-3 py-2 border border-gray-300 text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <option value="">All Items</option>
            {itemOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Amazon.in"
          className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          className="px-4 bg-yellow-400 border border-yellow-500 rounded-r-md hover:bg-yellow-500 flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* 🔹 Mega dropdown button (still works with hover/keyboard) */}
      <div className="relative" ref={dropdownRef}>
        <div className="p-3 bg-white rounded-full">
          <button
            onClick={() => setShowSuggestions((s) => !s)}
            className="cursor-pointer flex items-center gap-2.5 outline-none"
            aria-expanded={showSuggestions}
          >
            <span className="font-semibold">{selectedCategory}</span>
            <span className="text-sm text-blue-500">
              {String.fromCharCode(9660)}
            </span>
          </button>
        </div>

        {showSuggestions && (
          <div
            className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md z-20 flex max-h-[470px] overflow-hidden"
            onMouseLeave={() => {
              setHoveredCategory(null);
              setIsInSub(false);
            }}
          >
            {/* Left col */}
            <div className="w-56 no-scrollbar">
              {Object.keys(categories).map((cat, index) => (
                <div
                  key={cat}
                  onMouseEnter={() => {
                    setHoveredCategory(cat);
                    setHighlightedIndex(index);
                  }}
                  onClick={() => handleSelectMain(cat)}
                  className={`px-4 py-3 cursor-pointer ${
                    highlightedIndex === index && !isInSub
                      ? "bg-gray-200 font-bold"
                      : ""
                  } ${
                    hoveredCategory === cat ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {capitalize(cat)}
                </div>
              ))}
            </div>

            {/* Right col */}
            {hoveredCategory && (
              <div className="w-[500px] border-l overflow-auto bg-gray-50 p-3 max-h-[470px]">
                {Object.keys(categories[hoveredCategory]).map((sub, subIdx) => (
                  <div key={sub} className="mb-4">
                    <div className="font-semibold mb-2">{sub}</div>
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
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
                            className={`truncate cursor-pointer ${
                              isInSub && subIndex === globalIndex
                                ? "bg-yellow-200 font-semibold"
                                : "hover:underline"
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
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
