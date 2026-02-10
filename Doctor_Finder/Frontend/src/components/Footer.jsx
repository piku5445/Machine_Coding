import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>🏥 Doctor Finder</h3>
          <p>
            Helping you find the best doctors near you quickly and easily.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Specialities</li>
            <li>Settings</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@doctorfinder.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Doctor Finder. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
