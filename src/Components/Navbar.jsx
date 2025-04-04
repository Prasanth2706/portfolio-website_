import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full bg-primary text-white shadow-md z-50">
      <div className="navbar-container flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <motion.div
          className="navbar-logo text-xl font-bold cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="home" smooth={true} duration={500} className="cursor-pointer">
             Portfolio
          </Link>
        </motion.div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="menu-icon md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu Items */}
        <ul className="nav-menu hidden md:flex gap-6 text-lg">
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={item} smooth={true} duration={500} className="cursor-pointer">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-primary text-white p-6 flex flex-col items-center gap-6 md:hidden"
          >
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to={item} smooth={true} duration={500} onClick={toggleMenu} className="cursor-pointer text-lg">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
