import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userInfo);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between p-4">
        <Link to="/" className="font-bold text-xl">
          Shopping Duniya
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart">Cart ({cart.items.length})</Link>
          {user ? <span>{user.name}</span> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
