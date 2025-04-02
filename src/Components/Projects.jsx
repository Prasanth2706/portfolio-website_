import React from "react";
import { motion } from "framer-motion";
import { resumeData } from "../Data";

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 style={{ marginBottom: "2rem", color: "#6c63ff" }}>Projects</h2>
        <div className="project-list">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              style={{
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                marginBottom: "2rem",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{ color: "#333", marginBottom: "1rem" }}>{project.title}</h3>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>{project.description}</p>
              {project.title === "Shopping Application Clone" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="project-button"
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <a
                    href="https://demo-shoppoing-app.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    View Project
                  </a>
                </motion.button>
              )}
              {project.title === "Job Tracker (An Intuitive Job Application Management Tool - Personal Project)" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="project-button"
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <a
                    href="https://job-tracker-sand.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    View Project
                  </a>
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;