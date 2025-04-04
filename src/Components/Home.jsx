import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { resumeData } from "../Data";

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
      <div className="home-container" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
        <motion.div
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: "center" }}
        >
          <motion.h1 variants={itemVariants} className="home-title">
            Hello, I'm <span style={{ color: "var(--secondary-color)" }}>{resumeData.name}</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="home-subtitle" style={{ marginBottom: "1.5rem" }}>
            {resumeData.role}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="home-description" style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
            {resumeData.bio || "Passionate developer focused on creating intuitive, accessible, and responsive web applications that solve real-world problems."}
          </motion.p>
          
          <motion.div variants={itemVariants} className="home-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--secondary-color)" }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Link to="projects" smooth={true} duration={500} offset={-70} style={{ display: "flex", alignItems: "center" }}>
                View My Work <FaArrowRight style={{ marginLeft: "0.5rem" }} />
              </Link>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--accent-color)" }}
              whileTap={{ scale: 0.95 }}
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
            style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", justifyContent: "center" }}
          >
            <motion.a 
              href={resumeData.github || "https://github.com"} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{ fontSize: "1.5rem" }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href={resumeData.linkedin || "https://linkedin.com"} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{ fontSize: "1.5rem" }}
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