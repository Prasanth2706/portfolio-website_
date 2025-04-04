import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "10b7e1e2-d4f6-44d8-9cd9-52e5cad41893");

    const object = Object.fromEntries(formData);
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
        setStatusMessage("Message sent successfully!");
        event.target.reset();
      } else {
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Contact Me</h2>
        <form ref={form} onSubmit={onSubmit}>
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