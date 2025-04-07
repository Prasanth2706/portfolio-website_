import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheck, FaTimes, FaSpinner, FaDownload } from "react-icons/fa";
import "./contact.css"; // Import the CSS file

const Contact = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState({
    type: "", // success, error, loading
    message: ""
  });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({
    type: "",
    message: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle resume download
  const handleDownloadResume = async () => {
    try {
      setDownloadStatus({ type: "loading", message: "Preparing download..." });

      // Create an anchor element with a direct link to the PDF
      const link = document.createElement('a');

      // Set the href to the PDF location (in public folder)
      link.href = `${process.env.PUBLIC_URL}/Prasanth_S.pdf`;

      // Force download attribute
      link.setAttribute('download', 'Prasanth_S.pdf');

      // Force content type
      link.type = 'application/pdf';

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStatus({
        type: "success",
        message: "Resume downloaded successfully!"
      });
    } catch (error) {
      console.error("Download error:", error);
      setDownloadStatus({
        type: "error",
        message: "Download failed. Please try again."
      });
    } finally {
      // Clear message after delay
      setTimeout(() => {
        setDownloadStatus({ type: "", message: "" });
      }, 3000);
    }
  };

  // Validate form data
  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.user_name.trim()) errors.user_name = "Name is required";
    if (!formData.user_email.trim()) errors.user_email = "Email is required";
    else if (!emailRegex.test(formData.user_email)) errors.user_email = "Please enter a valid email";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({
      type: "loading",
      message: "Sending message..."
    });

    const data = new FormData(event.target);
    data.append("access_key", "10b7e1e2-d4f6-44d8-9cd9-52e5cad41893");

    const object = Object.fromEntries(data);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon."
        });
        setFormData({
          user_name: "",
          user_email: "",
          subject: "",
          message: ""
        });
      } else {
        setFormStatus({
          type: "error",
          message: "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-dismiss success/error message after 5 seconds
  useEffect(() => {
    if (formStatus.type === "success" || formStatus.type === "error") {
      const timer = setTimeout(() => {
        setFormStatus({ type: "", message: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <section id="contact" className="contact">
      <motion.div
        className="section-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </motion.h2>

        <motion.p
          className="contact-intro"
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a question or want to work together? Feel free to reach out!
        </motion.p>

        {/* Resume Download Button */}
        <motion.div
          className="resume-download"
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
          >
            <FaDownload /> Download Resume
          </motion.button>
        </motion.div>

        {/* Download Status Message */}
        <AnimatePresence>
          {downloadStatus.message && (
            <motion.div
              className={`status-message ${downloadStatus.type}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="status-content">
                {downloadStatus.type === "success" && <FaCheck />}
                {downloadStatus.type === "error" && <FaTimes />}
                {downloadStatus.type === "loading" && <FaSpinner className="spinner" />}
                <span>{downloadStatus.message}</span>
              </div>

              <motion.button
                className="close-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDownloadStatus({ type: "", message: "" })}
              >
                ×
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="contact-container"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form ref={form} onSubmit={onSubmit} style={{ padding: "2rem", borderRadius: "var(--border-radius)", boxShadow: "var(--box-shadow)" }}>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Your name"
                className={formErrors.user_name ? "error" : ""}
                style={{ border: formErrors.user_name ? "1px solid var(--secondary-color)" : "1px solid #ddd" }}
              />
              {formErrors.user_name && (
                <p className="error-message">{formErrors.user_name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={formErrors.user_email ? "error" : ""}
              />
              {formErrors.user_email && (
                <p className="error-message">{formErrors.user_email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject (Optional)</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={5}
                className={formErrors.message ? "error" : ""}
              ></textarea>
              {formErrors.message && (
                <p className="error-message">{formErrors.message}</p>
              )}
            </div>

            <div className="form-submit">
              <motion.button
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Status Message */}
          <AnimatePresence>
            {formStatus.message && (
              <motion.div
                className={`form-status ${formStatus.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="status-content">
                  {formStatus.type === "success" && <FaCheck />}
                  {formStatus.type === "error" && <FaTimes />}
                  {formStatus.type === "loading" && <FaSpinner className="spinner" />}
                  <span>{formStatus.message}</span>
                </div>

                <motion.button
                  className="close-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormStatus({ type: "", message: "" })}
                >
                  ×
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="contact-info"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactInfoItem
            icon="📧"
            title="Email"
            content="prasanth270627@gmail.com"
          />

          <ContactInfoItem
            icon="💼"
            title="LinkedIn"
            link="https://www.linkedin.com/in/prasanth-s-7a4027212?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Br1%2BrJR5VRXq7YDWhnTF7jQ%3D%3D"
          />

          <ContactInfoItem
            icon="🐱"
            title="GitHub"
            link="https://github.com/Prasanth2706"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Contact Info Item Component
const ContactInfoItem = ({ icon, title, content, link }) => {
  return (
    <motion.a
      href={link || `mailto:${content}`}
      target="_blank"
      rel="noopener noreferrer"
      className="info-item"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    >
      <div className="info-icon">{icon}</div>
      <h3 className="info-title">{title}</h3>
      <p className="info-content">{content}</p>
    </motion.a>
  );
};

export default Contact;