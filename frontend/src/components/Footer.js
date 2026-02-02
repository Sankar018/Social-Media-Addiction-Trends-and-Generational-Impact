import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">Addiction Prediction System</h2>
        <p className="footer-subtitle">
          An AI-based tool to predict addiction tendencies and promote healthy digital habits.
        </p>

        <div className="footer-team">
          <h4>Developed By:</h4>
          <ul>
            <li><a
                href="https://www.linkedin.com/in/sankar-bhunia-2a7ab12a6/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sankar Bhunia
              </a></li>
            <li><a
                href="https://www.linkedin.com/in/mili-parua-658376310/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mili Parua
              </a></li>
            <li><a
                href="https://www.linkedin.com/in/sayantanghosh29/"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                Sayantan Ghosh
              </a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Final Year Project | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
