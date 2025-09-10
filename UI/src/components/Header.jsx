<div className="flex items-center justify-between px-6 gap-6 bg-blue-700 text-white text-sm py-3 shadow">
  {/* Logo */}
  <div>
    <a>
      <img className="h-12 brightness-0 invert" src={logo} alt="logo" />
    </a>
  </div>

  {/* Nav */}
  <nav className="hidden md:flex text-sm gap-6">
    <a href="#" className="hover:text-orange-300">
      Deals
    </a>
    <a href="#" className="hover:text-orange-300">
      What's New
    </a>
    <a href="#" className="hover:text-orange-300">
      Delivery
    </a>
  </nav>

  {/* Search Bar */}
  <div className="flex flex-1 max-w-3xl rounded-md bg-white/20 backdrop-blur-sm border border-white/30">
    <input
      type="text"
      placeholder="Search products..."
      className="flex-1 px-4 py-3 bg-transparent placeholder-white/60 text-white focus:outline-none"
    />
    <button className="px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-r-md focus:ring-2 focus:ring-orange-400">
      <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
    </button>
  </div>

  {/* Account & Cart */}
  <div className="flex items-center gap-4 whitespace-nowrap">
    <a href="#" className="hover:text-orange-300">
      Account
    </a>
    <a href="#" className="hover:text-orange-300 pr-2">
      Cart
    </a>
  </div>
</div>;
