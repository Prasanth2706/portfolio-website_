import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { resumeData } from "../Data";

const Home = () => {
  return (
    <section id="home" className="home" style={{ backgroundColor: "#e0e0e0", padding: "2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontSize: "3rem", color: "#4a47a3", marginBottom: "1rem" }}>
          Welcome to My Portfolio
        </h1>
        <p style={{ fontSize: "1.5rem", color: "#444", marginBottom: "2rem" }}>
          Hi, I'm {resumeData.name}, a passionate {resumeData.role}.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4a47a3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to="projects"
            smooth={true}
            duration={500}
            offset={-50}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            View My Work
          </Link>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Home;