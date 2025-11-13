import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import logo from "../images/Logo.svg"; // your uploaded logo path

const Header = () => {
  return (
    <header className="bg-[#2C4BA7] text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="">
          <img src={logo} alt="Shopping Duniya" className="size-20" />
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          {["Men", "Women", "Kids", "Home", "Beauty"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="hover:text-[#E4A52B] transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search for products"
              className="pl-10 pr-4 py-1.5 rounded-md text-black w-60 focus:ring-2 focus:ring-[#E4A52B] outline-none"
            />
            <Search className="absolute top-2 left-3 h-4 w-4 text-gray-500" />
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-1 hover:text-[#E4A52B] transition"
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Profile</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-[#E4A52B] transition"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
