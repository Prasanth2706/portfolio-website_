import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_you0t9j", // Replace with your EmailJS service ID
        "template_37nowwf", // Replace with your EmailJS template ID
        form.current,
        "KuAKchVGYo1zr4Xaj" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          setStatusMessage("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          setStatusMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Contact Me</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" placeholder="Name" required />
          <input type="email" name="user_email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            Send
          </motion.button>
        </form>
        {statusMessage && <p style={{ marginTop: "1rem" }}>{statusMessage}</p>}
      </motion.div>
    </section>
  );
};

export default Contact;