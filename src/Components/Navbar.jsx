import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if user prefers dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" }
  ];

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="home" smooth={true} duration={500}>
            <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Portfolio</span>
          </Link>
        </motion.div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <motion.li
              key={link.to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link 
                to={link.to} 
                smooth={true} 
                duration={500} 
                offset={-70}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={toggleDarkMode} className="dark-mode-toggle" aria-label="Toggle dark mode">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </motion.li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;