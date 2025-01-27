import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll"; // Import Link from react-scroll
import { resumeData } from "../Data";

const Home = () => {
  return (
    <section id="home" className="home">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="home-content"
      >
        <h1>Welcome to My Portfolio</h1>
        <p>Hi, I'm {resumeData.name}, a passionate {resumeData.role}.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="projects" // Scroll to the Projects section
            smooth={true} // Enable smooth scrolling
            duration={500} // Duration of the scroll animation
            offset={-50} // Offset to account for the Navbar height
          >
            View My Work
          </Link>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;