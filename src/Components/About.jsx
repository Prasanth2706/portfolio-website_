import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode, FaDownload } from "react-icons/fa";
import { resumeData } from "../Data";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  
  const tabVariants = {
    active: { 
      backgroundColor: "var(--primary-color)", 
      color: "var(--white)",
      scale: 1.05
    },
    inactive: { 
      backgroundColor: "transparent", 
      color: "var(--text-color)",
      scale: 1
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleDownloadResume = () => {
    // Create a link to your resume file
    const link = document.createElement('a');
    link.href = ''; // Update with your actual resume path
    link.download = 'Prasanth-S-Software_Engineer2'; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="section-container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2>About Me</h2>
        
        <motion.div 
          className="about-bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            maxWidth: "800px", 
            margin: "0 auto 3rem",
            textAlign: "center",
            lineHeight: 1.8
          }}
        >
          <p>{resumeData.aboutMe || "I am a passionate developer with expertise in modern web technologies. I love creating responsive, user-friendly applications and am constantly learning new skills to improve my craft."}</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            style={{ 
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <FaDownload /> Download Resume
          </motion.button>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="tabs" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <motion.button
            variants={tabVariants}
            animate={activeTab === "education" ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("education")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaGraduationCap /> Education
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            animate={activeTab === "experience" ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("experience")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaBriefcase /> Experience
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            animate={activeTab === "skills" ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("skills")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <FaCode /> Skills
          </motion.button>
        </div>
        
        {/* Tab Content */}
        <AnimatedTabContent activeTab={activeTab} />
      </motion.div>
    </section>
  );
};

// Component to handle tab content with animations
const AnimatedTabContent = ({ activeTab }) => {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (activeTab === "education") {
    return (
      <motion.div 
        className="education"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={index}
            className="card"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            style={{ 
              position: "relative",
              borderLeft: "4px solid var(--primary-color)"
            }}
          >
            <h4>{edu.institution}</h4>
            <p style={{ fontWeight: "500" }}>{edu.degree}</p>
            <p style={{ 
              display: "flex", 
              justifyContent: "space-between",
              color: "var(--secondary-color)",
              fontStyle: "italic" 
            }}>
              <span>{edu.duration}</span>
              <span>{edu.score}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }
  
  if (activeTab === "experience") {
    return (
      <motion.div 
        className="experience"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={index}
            className="card"
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            style={{ 
              position: "relative",
              borderLeft: "4px solid var(--secondary-color)"
            }}
          >
            <h4>{exp.company}</h4>
            <p style={{ 
              fontWeight: "500", 
              color: "var(--primary-color)",
              marginBottom: "0.5rem" 
            }}>
              {exp.role} | {exp.duration}
            </p>
            <ul style={{ paddingLeft: "1.5rem", textAlign: "left" }}>
              {exp.description.map((desc, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    );
  }
  
  if (activeTab === "skills") {
    // Assuming skills are in resumeData or create mock data
    const skills = resumeData.skills || [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "TypeScript", level: 65 }
    ];
    
    return (
      <motion.div 
        className="skills"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem" 
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="skill-card"
            style={{ 
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              backgroundColor: "var(--white)"
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{skill.name}</p>
            <div style={{ 
              height: "10px", 
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "5px",
              overflow: "hidden"
            }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                  height: "100%",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "5px"
                }}
              />
            </div>
            <p style={{ textAlign: "right", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              {skill.level}%
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  }
  
  return null;
};

export default About;