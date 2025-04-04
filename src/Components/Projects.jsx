import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { resumeData } from "../Data";

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search term
  const filteredProjects = resumeData.projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.technologies && project.technologies.some(tech => 
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const projectVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="section-container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2>My Projects</h2>
        
        {/* Search Bar */}
        <motion.div 
          className="search-container"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ 
            maxWidth: "500px", 
            margin: "2rem auto",
            position: "relative" 
          }}
        >
          <FaSearch style={{ 
            position: "absolute", 
            left: "1rem", 
            top: "50%", 
            transform: "translateY(-50%)",
            color: "var(--primary-color)"
          }} />
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              border: "1px solid #ddd",
              borderRadius: "30px",
              fontSize: "1rem",
              backgroundColor: "var(--white)",
              color: "var(--text-color)"
            }}
          />
        </motion.div>
        
        {/* Project Grid */}
        <motion.div 
          className="project-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index}
                setSelectedId={setSelectedId}
              />
            ))
          ) : (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "var(--background-color)",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3>No projects found matching "{searchTerm}"</h3>
              <p>Try a different search term</p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedId !== null && (
            <ProjectDetail 
              project={resumeData.projects[selectedId]} 
              onClose={() => setSelectedId(null)} 
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, setSelectedId }) => {
  // Default technologies if not provided
  const technologies = project.technologies || ["React", "CSS", "JavaScript"];
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.5, delay: index * 0.1 }
        }
      }}
      className="project-card"
      style={{
        backgroundColor: "var(--white)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Project Image Placeholder */}
      <div 
        className="project-image" 
        style={{
          height: "180px",
          backgroundColor: `hsl(${(index * 40) % 360}, 70%, 80%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          color: "white"
        }}
      >
        {project.title.charAt(0)}
      </div>
      
      <div className="project-content" style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ marginBottom: "0.75rem", color: "var(--primary-color)" }}>{project.title}</h3>
        
        <p style={{ marginBottom: "1rem", flex: 1 }}>
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description}
        </p>
        
        <div className="tech-stack" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {technologies.map((tech, i) => (
            <span 
              key={i}
              style={{
                padding: "0.25rem 0.75rem",
                backgroundColor: "var(--background-color)",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "500"
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="project-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedId(index)}
            style={{
              backgroundColor: "var(--primary-color)",
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            More Details
          </motion.button>
          
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "var(--secondary-color)",
                padding: "0.5rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--white)"
              }}
            >
              View Live <FaExternalLinkAlt />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Project Detail Modal Component
const ProjectDetail = ({ project, onClose }) => {
  // Default technologies if not provided
  const technologies = project.technologies || ["React", "CSS", "JavaScript"];
  
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem"
      }}
    >
      <motion.div
        className="modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--background-color)",
          borderRadius: "12px",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "2rem",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "transparent",
            color: "var(--text-color)",
            fontSize: "1.5rem",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem"
          }}
        >
          ×
        </button>
        
        <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>{project.title}</h2>
        
        {/* Project Image Placeholder */}
        <div 
          style={{
            height: "200px",
            backgroundColor: "var(--primary-color)",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "3rem"
          }} 
        >
          {project.title.charAt(0)}
        </div>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>Description</h3>
          <p>{project.description}</p>
        </div>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>Technologies</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {technologies.map((tech, i) => (
              <span 
                key={i}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "0.9rem"
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "var(--secondary-color)",
                padding: "0.75rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--white)",
                borderRadius: "5px"
              }}
            >
              View Live <FaExternalLinkAlt />
            </motion.a>
          )}
          
          {project.githubUrl && (
  <motion.a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      backgroundColor: "var(--primary-color)",
      padding: "0.75rem 1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "var(--white)",
      borderRadius: "5px"
    }}
  >
    GitHub <FaGithub />
  </motion.a>
)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;