// src/components/Footer/Footer.tsx

import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>

          <div className={styles.footerColumn}>
            <h4>Products</h4>
            <Link to="/products">All products</Link>
            <Link to="/products?tag=Networking#tagContent">Networking</Link>
            <Link to="/products?tag=Peer%20Learning#tagContent">Peer Learning</Link>
            <Link to="/products?tag=Explore%20Priorities#tagContent">Explore Priorities</Link>
            <Link to="/products?tag=Ideas%20to%20Action#tagContent">Ideas to Action</Link>
            <Link to="/products?tag=Reflect%20%26%20Synthesize#tagContent">Reflect &amp; Synthesize</Link>
            <Link to="/products?tag=Build%20Alignment#tagContent">Build Alignment</Link>
            <Link to="/products?tag=Inspire%20Creativity#tagContent">Inspire Creativity</Link>
            <Link to="/products?tag=Visualize%20Insights#tagContent">Visualize Insights</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Use cases</h4>
            <Link to="/use-cases/leadership-summit">Leadership Summit</Link>
            <Link to="/use-cases/sales-kick-off">Sales Kick-Off</Link>
            <Link to="/use-cases/industry-event">Industry event</Link>
            <Link to="/use-cases/user-conference">User conference</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Overview</h4>
            <Link to="/who-we-are">Who we are</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Get Started</h4>
            <Link to="/get-started">Product finder</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/get-started#contact-form">Contact us</Link>
            <Link to="/schedule-demo">Schedule a demo</Link>
          </div>

        </div>

        <div className={styles.footerRight}>
          <div className={styles.socialIcons}>
            <a href="https://ca.linkedin.com/company/theprojectory" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={styles.icon} />
            </a>
            <a href="https://www.youtube.com/@projectorylive/playlists?app=desktop" target="_blank" rel="noopener noreferrer">
              <FaYoutube className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/projectory.live/" target="_blank" rel="noopener noreferrer">
              <FiInstagram className={styles.icon} />
            </a>
          </div>
          <p className={styles.email}>info@projectory.live</p>
          <p className={styles.copyright}>© Projectory 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;