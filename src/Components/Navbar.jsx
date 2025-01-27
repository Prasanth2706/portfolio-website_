import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <motion.div
          className="navbar-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="home" smooth={true} duration={500}>
            My Portfolio
          </Link>
        </motion.div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu Items */}
        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="home" smooth={true} duration={500} onClick={toggleMenu}>
              Home
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="about" smooth={true} duration={500} onClick={toggleMenu}>
              About
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="projects" smooth={true} duration={500} onClick={toggleMenu}>
              Projects
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="contact" smooth={true} duration={500} onClick={toggleMenu}>
              Contact
            </Link>
          </motion.li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;