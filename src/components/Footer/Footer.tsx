// src/components/Footer/Footer.tsx

import { useState } from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import logo from '../../assets/images/logo.svg';

const WEB3FORMS_ACCESS_KEY = '1c3fa95b-e42f-4bc0-b339-025a18bc51eb';

const Footer = () => {
  const [introDeckEmail, setIntroDeckEmail] = useState('');
  const [introDeckStatus, setIntroDeckStatus] = useState('');

  const handleIntroDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIntroDeckStatus('Sending...');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: 'Intro deck request',
          email: introDeckEmail,
          message: 'Request for Projectory intro deck (from website footer).',
        }),
      });
      const result = await response.json();
      if (response.ok && result.success !== false) {
        setIntroDeckStatus('Thanks! We\'ll share the deck with you soon.');
        setIntroDeckEmail('');
      } else {
        setIntroDeckStatus('Something went wrong. Please try again.');
      }
    } catch {
      setIntroDeckStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Top row: Logo + tagline */}
      <div className={styles.footerTop}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Projectory" className={styles.logo} />
        </Link>
        <p className={styles.tagline}>The audience engagement company</p>
      </div>

      {/* Five columns */}
      <div className={styles.footerColumns}>
        {/* Column 1: Addresses */}
        <div className={styles.footerColumn}>
          <div className={styles.addressBlock}>
            <h4>Toronto</h4>
            <p>11 Hillsboro Av</p>
            <p>ON, M5R1S6</p>
          </div>
          <div className={styles.addressBlock}>
            <h4>Austin</h4>
            <p>4616 Rosedale Ave</p>
            <p>Austin, TX 78756</p>
          </div>
          <div className={styles.addressBlock}>
            <h4>Chicago</h4>
            <p>1401 Morse Avenue, Elk</p>
            <p>Grove Village IL 60007</p>
          </div>
        </div>

        {/* Column 2: Products */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Products</h4>
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

        {/* Column 3: Case Studies + Overview */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Case Studies</h4>
          <Link to="/case-study/cibc-global-leadership-summit">Leadership Summit</Link>
          <Link to="/case-study/surescripts-sales-kickoff">Sales Kick-Off</Link>
          <Link to="/case-study/pcma-2024-cema-summit">Industry Event</Link>
          <Link to="/case-study/deloitte-connect-2024">User conference</Link>

          <h4 className={`${styles.columnHeading} ${styles.subHeading}`}>Overview</h4>
          <Link to="/who-we-are">Who we are</Link>
          <a href="https://www.youtube.com/watch?v=PCTFEtSYBlo&list=PLYVC91DsScUjsTvrMjYc2HR96rjkNg_SP" target="_blank" rel="noopener noreferrer">Testimonials</a>
        </div>

        {/* Column 4: Get Started */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Get Started</h4>
          <Link to="/get-started-form">Product finder</Link>
          <Link to="/get-started#faq">FAQ</Link>
          <Link to="/get-started#contact-form">Contact us</Link>
          <Link to="/get-started#schedule-demo">Schedule a demo</Link>
          <Link to="/rfp">Add us to your RFP</Link>
        </div>

        {/* Column 5: Intro deck + Contact & Support */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Get an intro deck</h4>
          <form className={styles.introDeck} onSubmit={handleIntroDeckSubmit}>
            <input
              type="email"
              name="email"
              placeholder=""
              className={styles.emailInput}
              aria-label="Enter your email for intro deck"
              value={introDeckEmail}
              onChange={(e) => setIntroDeckEmail(e.target.value)}
              required
            />
            <p className={styles.inputHelper}>
              Enter your email and we&apos;ll share with you our pitch deck
            </p>
            <button type="submit" className={styles.submitBtn} disabled={introDeckStatus === 'Sending...'}>
              Submit
            </button>
            {introDeckStatus && (
              <p className={styles.introDeckStatus}>{introDeckStatus}</p>
            )}
          </form>

          <h4 className={`${styles.columnHeading} ${styles.subHeading}`}>Contact &amp; support</h4>
          <a href="tel:18556663330" className={styles.contactLink}>+1 (855) 666-3330</a>
          <a href="mailto:info@projectory.live" className={styles.contactLink}>info@projectory.live</a>

          <div className={styles.socialIcons}>
            <a href="https://wa.me/16474552051" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaWhatsapp />
            </a>
            <a href="https://www.youtube.com/@projectorylive/playlists?app=desktop" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/projectory.live/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FiInstagram />
            </a>
            <a href="https://ca.linkedin.com/company/theprojectory" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLeft}>
          <p className={styles.copyright}>
            Copyright &copy; 2026 <strong>Projectory.live inc.</strong> All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/terms">Terms and conditions</Link>
            <span className={styles.legalDivider}>|</span>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
