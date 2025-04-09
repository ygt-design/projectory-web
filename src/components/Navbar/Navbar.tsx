// 📂 src/components/Navbar/Navbar.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.svg';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import HeartIconSVG from '../../assets/images/heartIcon.svg';

// Slide-in menu
import SlideInMenu from '../SlideInMenu/SlideInMenu';
// Liked products context
import { useLikedProducts } from '../../context/LikedProductsContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSlideInOpen, setIsSlideInOpen] = useState(false);

  const { likedProducts } = useLikedProducts();
  const hasLikedProducts = likedProducts.length > 0;

  // Toggle the mobile menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Projectory Logo" className={styles.logoImage} />
        </Link>

        {/* 🖥 Desktop Menu */}
        <ul className={styles.desktopNav}>
          <li><Link to="/who-we-are">Who We Are</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/case-studies">Case Studies</Link></li>
          <li>
            <Link to="/get-started" className={styles.ctaButton}>
              Get Started
            </Link>
          </li>
          {/* Heart icon only if liked products exist */}
          <li>
            <button
              className={styles.slideInToggleBtn}
              onClick={() => setIsSlideInOpen(true)}
              style={{ display: hasLikedProducts ? 'block' : 'none' }}
            >
              {/* 
                🔹 Heart icon wrapper (relative) 
                with a badge showing the count
              */}
              <div className={styles.heartIconWrapper}>
                <img
                  className={styles.heartIcon}
                  src={HeartIconSVG}
                  alt="Liked Products"
                />
                {/* If likedProducts > 0, show a badge */}
                {hasLikedProducts && (
                  <span className={styles.heartBadge}>
                    {likedProducts.length}
                  </span>
                )}
              </div>
            </button>
          </li>
        </ul>

        {/* 🔹 Mobile toggles */}
        <div className={styles.mobileMenuWrapper}>
          <button
            className={styles.slideInToggleBtnMobile}
            onClick={() => {
              setMenuOpen(false);
              setIsSlideInOpen(true);
            }}
            style={{ display: hasLikedProducts ? 'block' : 'none' }}
          >
            <div className={styles.heartIconWrapper}>
              <img
                className={styles.heartIcon}
                src={HeartIconSVG}
                alt="Liked Products"
              />
              {hasLikedProducts && (
                <span className={styles.heartBadge}>
                  {likedProducts.length}
                </span>
              )}
            </div>
          </button>

          <button className={styles.menuToggle} onClick={toggleMenu}>
            {menuOpen ? <FiX className={styles.menuIcon} /> : <FiMenu className={styles.menuIcon} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <li>
            <Link to="/who-we-are" onClick={() => setMenuOpen(false)}>
              Who We Are
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/case-studies" onClick={() => setMenuOpen(false)}>
              Case Studies
            </Link>
          </li>
          <li>
            <Link
              to="/get-started"
              className={styles.mobileCtaButton}
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://ca.linkedin.com/company/theprojectory"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a
            href="https://www.youtube.com/@projectorylive/playlists?app=desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={styles.icon} />
          </a>
          <a
            href="https://www.instagram.com/projectory.live/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram className={styles.icon} />
          </a>
        </div>
      </div>

      {/* 🔹 Slide-In Menu */}
      <SlideInMenu
        isOpen={isSlideInOpen}
        onClose={() => setIsSlideInOpen(false)}
      />
    </nav>
  );
};

export default Navbar;