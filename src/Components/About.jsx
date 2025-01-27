import React from "react";
import { motion } from "framer-motion";
import { resumeData } from "../Data";

const About = () => {
  return (
    <section id="about" className="about">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>About Me</h2>
        <div className="about-content">
          <div className="education">
            <h3>Education</h3>
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h4>{edu.institution}</h4>
                <p>{edu.degree}</p>
                <p>{edu.duration} | {edu.score}</p>
              </motion.div>
            ))}
          </div>
          <div className="experience">
            <h3>Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                className="card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h4>{exp.company}</h4>
                <p>{exp.role} | {exp.duration}</p>
                <ul>
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;