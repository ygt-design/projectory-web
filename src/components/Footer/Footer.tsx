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
            <Link to="/products#tagContent">All products</Link>
            <Link to={`/products?tag=${encodeURIComponent('Networking')}#tagContent`}>Networking</Link>
            <Link to={`/products?tag=${encodeURIComponent('Peer learning')}#tagContent`}>Peer Learning</Link>
            <Link to={`/products?tag=${encodeURIComponent('Explore priorities')}#tagContent`}>Explore Priorities</Link>
            <Link to={`/products?tag=${encodeURIComponent('Ideas to action')}#tagContent`}>Ideas to Action</Link>
            <Link to={`/products?tag=${encodeURIComponent('Reflect & synthesize')}#tagContent`}>Reflect &amp; Synthesize</Link>
            <Link to={`/products?tag=${encodeURIComponent('Build alignment')}#tagContent`}>Build Alignment</Link>
            <Link to={`/products?tag=${encodeURIComponent('Inspire creativity')}#tagContent`}>Inspire Creativity</Link>
            <Link to={`/products?tag=${encodeURIComponent('Visualize insights')}#tagContent`}>Visualize Insights</Link>
          </div>

          <div className={styles.footerColumn}>
            <h4>Case Studies</h4>
            <Link to="/case-study/cibc-global-leadership-summit">Leadership Summit</Link>
            <Link to="/case-study/surescripts-sales-kickoff">Sales Kick-Off</Link>
            <Link to="/case-study/pcma-2024-cema-summit"> Industry Event </Link>
            <Link to="/case-study/deloitte-connect-2024">User conference</Link>
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
            <Link to="https://calendly.com/oren-/projectory?month=2025-05">Schedule a demo</Link>
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