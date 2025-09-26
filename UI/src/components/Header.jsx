import { Link } from "react-router-dom";
import logo from "../images/E-Commerce.jpg";
import { useState, useRef, useEffect } from "react";

const categories = {
  electronics: {
    "Mobiles & Accessories": ["Smartphones", "Feature Phones", "Mobile Cases", "Chargers", "Power Banks", "Screen Protectors"],
    Laptops: ["Gaming Laptops", "Business Laptops", "2-in-1 Laptops", "Laptop Bags", "Laptop Accessories"],
    Tablets: ["Android Tablets", "iPads", "Tablet Keyboards", "Stylus Pens"],
    Cameras: ["DSLR", "Mirrorless", "Action Cameras", "Camera Lenses", "Tripods"],
    Wearables: ["Smartwatches", "Fitness Bands", "VR Headsets"],
    Televisions: ["LED", "Smart TVs", "4K Ultra HD", "OLED TVs"],
    "Home Appliances": ["Air Conditioners", "Refrigerators", "Washing Machines", "Microwaves", "Vacuum Cleaners"],
  },
  fashion: {
    "Men's Clothing": ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Suits"],
    "Women's Clothing": ["Tops", "Dresses", "Sarees", "Kurtas", "Jeans", "Skirts"],
    "Kid's Clothing": ["T-Shirts", "Frocks", "Shorts", "Ethnic Wear", "School Uniforms"],
    Shoes: ["Sneakers", "Formal Shoes", "Sandals", "Heels", "Boots"],
    Jewelry: ["Necklaces", "Earrings", "Rings", "Bracelets"],
    Accessories: ["Watches", "Belts", "Hats", "Sunglasses", "Bags"],
  },
  home: {
    Furniture: ["Sofas", "Beds", "Tables", "Chairs", "Wardrobes"],
    "Home Decor": ["Paintings", "Clocks", "Wall Art", "Vases"],
    "Kitchen & Dining": ["Cookware", "Dinner Sets", "Storage Containers", "Cutlery"],
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
    "Fitness Equipment": ["Treadmills", "Dumbbells", "Exercise Bikes", "Resistance Bands"],
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
    "Car Accessories": ["Seat Covers", "Car Mats", "Phone Holders", "Car Chargers"],
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);

  const capitalize = (s) =>
    typeof s === "string" && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMain = (main) => {
    setSelectedCategory(capitalize(main));
    setShowSuggestions(false);
    setHoveredCategory(null);
  };

  const handleSelectSub = (main, sub) => {
    setSelectedCategory(`${capitalize(main)} → ${sub}`);
    setShowSuggestions(false);
    setHoveredCategory(null);
  };

  const handleSelectItem = (main, sub, item) => {
    setSelectedCategory(`${capitalize(main)} → ${sub} → ${item}`);
    setShowSuggestions(false);
    setHoveredCategory(null);
  };

  return (
    <div className="w-full flex items-center gap-8 bg-blue-500 px-4 py-2">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full shadow-md cursor-pointer tilt-animation hover:scale-110"
        />
      </Link>

      <div className="relative" ref={dropdownRef}>
        <div className="p-3 bg-white rounded-full">
          <button
            onClick={() => setShowSuggestions((s) => !s)}
            className="cursor-pointer flex items-center gap-2.5"
            aria-expanded={showSuggestions}
          >
            <span className="font-semibold">{selectedCategory}</span>
            <span className="text-sm text-blue-500">{String.fromCharCode(9660)}</span>
          </button>
        </div>

        {showSuggestions && (
          <div
            className="absolute top-full left-0 mt-2 bg-white border rounded shadow-md z-20 flex max-h-[420px] overflow-hidden"
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Left column: main categories */}
            <div className="w-56 overflow-auto">
              {Object.keys(categories).map((cat) => (
                <div
                  key={cat}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onClick={() => handleSelectMain(cat)}
                  className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                    hoveredCategory === cat ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {capitalize(cat)}
                </div>
              ))}
            </div>

            {/* Right column: only shows when hovered */}
            {hoveredCategory && (
              <div className="w-[500px] border-l overflow-auto bg-gray-50 p-3">
                {Object.keys(categories[hoveredCategory]).map((sub) => (
                  <div key={sub} className="mb-4">
                    <div
                      onClick={() => handleSelectSub(hoveredCategory, sub)}
                      className="font-semibold cursor-pointer mb-2"
                    >
                      {sub}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                      {categories[hoveredCategory][sub].map((item) => (
                        <div
                          key={item}
                          className="truncate hover:underline cursor-pointer"
                          onClick={() =>
                            handleSelectItem(hoveredCategory, sub, item)
                          }
                        >
                          {item}
                        </div>
                      ))}
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
