import React, { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import BackButton from "./Button/BackButton";
import Footer from "./Footer/Footer";
import styles from "./ContactUs.module.css";

export default function ContactUs() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm("service_k0np36h", "template_2661vcn", e.target, "4BHkR2Tf-F7GH6JZS")
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message sent!",
          showConfirmButton: false,
          timer: 1500,
          background: "#161616",
          color: "#ffffff",
        });
        e.target.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
          background: "#161616",
          color: "#ffffff",
        });
      })
      .finally(() => setSending(false));
  }

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <BackButton />
      </div>

      <div className={styles.card}>
        <p className={styles.title}>06 // CONTACT</p>
        <h1 className={styles.heading}>Get in touch.</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              name="to_name"
              placeholder="Your name"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="What's on your mind?"
              required
            />
          </div>

          <button className={styles.submit} type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send message →"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
