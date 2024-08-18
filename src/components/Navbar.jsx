import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiMoon, FiSun } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  const { orderTotal, totalPrice } = useSelector((state) => state.orders);
  return (
    <header>
    {/* Top Section */}
    <div className="bg-neutral text-neutral-content px-4 py-2 flex justify-end items-center dark:bg-neutral-dark dark:text-neutral-light">
      <div>
      <div className="text-sm">
        <a href="#" className="mr-4">Sign in / Guest</a>
        <a href="#">Create Account</a>
      </div>
      </div>
    </div>

    {/* Bottom Section */}
    <nav className="bg-base-100 px-4 py-3 flex justify-between items-center shadow-md dark:bg-base-dark">
      <div className="flex items-center space-x-4">
        <button className="btn btn-square btn-primary">
          C
        </button>
        <a href="#" className="btn btn-ghost">Home</a>
        <a href="#" className="btn btn-ghost">About</a>
        <a href="#" className="btn btn-ghost">Products</a>
        <a href="#" className="btn btn-ghost">Cart</a>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="text-xl cursor-pointer">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <div className="relative">
          <FiShoppingCart className="text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full px-1">0</span>
        </div>
      </div>
    </nav>
  </header>
  );
}

export default Navbar;
