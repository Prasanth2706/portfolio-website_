import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { resumeData } from "../Data";
// import "./particles.css";

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="home" className="home">
      <div className="home-container">
        <motion.div
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="home-title">
            Hello, I'm <span style={{ color: "var(--secondary-color)" }}>{resumeData.name}</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="home-subtitle">
            {resumeData.role}
          </motion.h2>

          <motion.p variants={itemVariants} className="home-description">
            {resumeData.bio || "Passionate developer focused on creating intuitive, accessible, and responsive web applications that solve real-world problems."}
          </motion.p>

          <motion.div variants={itemVariants} className="home-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button"
            >
              <Link to="projects" smooth={true} duration={500} offset={-70} style={{ display: "flex", alignItems: "center" }}>
                View My Work <FaArrowDown style={{ marginLeft: "0.5rem" }} />
              </Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="accent-button"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <Link to="contact" smooth={true} duration={500} offset={-70}>
                Get In Touch
              </Link>
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="social-links"
            style={{ gap: "1.5rem", marginTop: "2rem" }}
          >
            <motion.a
              href={resumeData.github || "https://github.com/Prasanth2706"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1, color: "var(--accent-color)" }}
              whileTap={{ scale: 0.9 }}
              // aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href={resumeData.linkedin || "https://www.linkedin.com/in/prasanth-s-7a4027212"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              // aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;