import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer style={{
      backgroundColor: "var(--background-color)",
      padding: "3rem 1rem",
      borderTop: "1px solid rgba(0,0,0,0.1)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            marginBottom: "2rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}
        >
          <FaArrowUp style={{ color: "white" }}/>
        </motion.button>
        
        {/* Navigation links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}
        >
          {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "var(--primary-color)" }}
              transition={{ duration: 0.2 }}
              style={{
                textDecoration: "none",
                color: "var(--text-color)",
                fontWeight: "500"
              }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
        
        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}
        >
          {[
            { icon: <FaGithub />, link: "https://github.com/yourusername" },
            { icon: <FaLinkedin />, link: "https://linkedin.com/in/yourprofile" },
            { icon: <FaTwitter />, link: "https://twitter.com/yourhandle" },
            { icon: <FaEnvelope />, link: "mailto:youremail@example.com" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "var(--primary-color)" }}
              transition={{ duration: 0.2 }}
              style={{
                color: "var(--text-color)",
                fontSize: "1.25rem"
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        
        {/* Copyright and additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center"
          }}
        >
          <p style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
            &copy; {currentYear} My Portfolio. All rights reserved.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-color)", opacity: 0.8 }}>
            Designed and built with <span style={{ color: "#e25555" }}>♥</span> using React & Framer Motion
          </p>
        </motion.div>
        
        {/* Optional: Skills or tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1.5rem"
          }}
        >
          {["React", "JavaScript", "CSS", "Framer Motion", "Node.js"].map((tech, index) => (
            <span
              key={index}
              style={{
                fontSize: "0.8rem",
                padding: "0.25rem 0.75rem",
                backgroundColor: "var(--white)",
                borderRadius: "20px",
                color: "var(--text-color)",
                opacity: 0.8
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;  