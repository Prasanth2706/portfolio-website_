import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-opacity-100"
      }`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="home" smooth={true} duration={500}>
            <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "var(--primary-color)" }}>
              Portfolio
            </span>
          </Link>
        </motion.div>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  zIndex: 10,
                }}
              />
              <motion.ul
                className="nav-menu active"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "70%",
                  height: "100%",
                  backgroundColor: "var(--primary-color)",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={toggleMenu}
                      style={{ color: "white", fontSize: "1.2rem" }}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={toggleDarkMode}
                    className="dark-mode-toggle"
                    aria-label="Toggle dark mode"
                    style={{
                      backgroundColor: "white",
                      color: "var(--primary-color)",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>
                </motion.li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop">
          {navLinks.map((link) => (
            <motion.li
              key={link.to}
              whileHover={{ scale: 1.1, color: "var(--secondary-color)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={link.to} smooth={true} duration={500} offset={-70}>
                {link.name}
              </Link>
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </motion.li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
