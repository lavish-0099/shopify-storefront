import React from "react";
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions, please fill out the form below and our team
        will get back to you as soon as possible.
      </p>

      <form method="post" action="/contact" className="contact-form">
        <label>
          Name:
          <input type="text" name="contact[name]" required />
        </label>

        <label>
          Email:
          <input type="email" name="contact[email]" required />
        </label>

        <label>
          Phone (optional):
          <input type="text" name="contact[phone]" />
        </label>

        <label>
          Message:
          <textarea name="contact[body]" rows="5" required></textarea>
        </label>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
