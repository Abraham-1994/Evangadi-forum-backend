import React from "react";
import logo from "../assets/evangadi-logo-footer.png";
import { Link } from "react-router-dom";
import { LuFacebook } from "react-icons/lu";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-section">
        <div className="logo-wrapper">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi Logo"
          />
        </div>
        <div className="social-links">
          <Link to={"https://www.facebook.com/evangaditech/"}>
            <LuFacebook />
          </Link>
          <Link to={"https://www.instagram.com/evangaditech/?hl=en"}>
            <FaInstagram />
          </Link>
          <Link to={"https://www.youtube.com/@EvangadiTech"}>
            <AiOutlineYoutube />
          </Link>
        </div>
      </div>
      <div className="footer-links-section">
        <h1>Useful Link</h1>
        <div className="links">
          <a href="https://www.evangadi.com/explained/">How it works</a>
          <a href="https://www.evangadi.com/legal/terms/">Terms of Service</a>
          <a href="https://www.evangadi.com/legal/privacy/">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-contact-section">
        <h1>Contact Info</h1>
        <div className="contact-info">
          <a href="/">Evangadi Networks</a>
          <p>support@evangadi.com</p>
          <p>+1 202 386 2702</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
