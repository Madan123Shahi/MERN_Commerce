import { useState, useRef, useEffect } from "react";

// Example categories
const categories = [
  "All",
  "Electronics",
  "Books",
  "Fashion",
  "Toys",
  "Home & Kitchen",
  "Sports",
];

// Example suggestions (in real scenario, fetch from API)
const suggestionsData = [
  "iPhone",
  "iPad",
  "AirPods",
  "MacBook",
  "Samsung Galaxy",
  "Sony Headphones",
  "Kindle",
  "Harry Potter Book",
];

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestionsData.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
    setActiveIndex(-1);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setQuery(filteredSuggestions[activeIndex]);
      }
      handleSearch();
    }
  };

  const handleSearch = () => {
    alert(`Search for "${query}" in category "${selectedCategory}"`);
    setShowSuggestions(false);
  };

  return (
    <div className="flex">
      {/* Category Dropdown */}
      <div className="relative ">
        <button
          onClick={() => setShowSuggestions(false)}
          className="bg-gray-200 px-4 py-2 border-r hover:bg-gray-300 truncate"
        >
          <span className="truncate">{selectedCategory} ▼</span>
        </button>
        <div className="absolute z-10 bg-white shadow-lg">
          {categories.map((cat) => (
            <div
              key={cat}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="relative flex-grow">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search Amazon"
          className="w-full p-2 outline-none border-t border-b"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute w-full bg-white border shadow-lg max-h-60 overflow-auto z-20">
            {filteredSuggestions.map((s, index) => (
              <li
                key={s}
                className={`p-2 cursor-pointer ${
                  activeIndex === index ? "bg-gray-200" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setQuery(s);
                  handleSearch();
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-yellow-500 px-4 py-2 font-semibold hover:bg-yellow-600"
      >
        🔍
      </button>
    </div>
  );
}
