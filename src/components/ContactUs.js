import React from "react";
import "./ContactUs.css";

/**
 * This posts directly to Shopify, which sends the email to your store's contact email.
 * Replace the shop domain below if different.
 * Example: https://YOUR-SHOP.myshopify.com/contact#contact_form
 */
const SHOPIFY_CONTACT_URL = "https://delan1.myshopify.com/contact#contact_form";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions, please fill out the form below and our team
        will get back to you as soon as possible.
      </p>

      {/* IMPORTANT: HTML POST to Shopify (no fetch), with required hidden fields */}
      <form method="post" action={SHOPIFY_CONTACT_URL} className="contact-form">
        {/* Required by Shopify */}
        <input type="hidden" name="form_type" value="contact" />
        <input type="hidden" name="utf8" value="✓" />

        {/* Honeypot to reduce bots (Shopify ignores unknown fields) */}
        <input type="text" name="contact[website]" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

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
