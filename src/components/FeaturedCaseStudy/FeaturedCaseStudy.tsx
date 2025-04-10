// 📂 src/components/FeaturedCaseStudy/FeaturedCaseStudy.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedCaseStudy.module.css';

const CASE_STUDIES = [
  {
    id: 'cibc-leadership',
    title: 'Building Commitment in a Two-Day Leadership Event',
    subtitle: 'CIBC Executive Alignment',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/f1bf/650c/01c0bb4294b3954a8be0e9b277d0a9e7?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GPEKskoFbudkHb0X8r0R22FfEM9giwmWXWRR6KffnFk3VvjSEeDGUdrQQj4Wen0ULm8az6fMjx~MyKWt4s5I02f1UcAvGpZr~yWAIOen6ZnSr0~e-SRwr3lYqYxxytznHhAuN4N30cH~NiMOfTgKR90oFf4YJM0lmmWaitviCcbUpHv8sFqW9ImP4JaoQJbVnpDH4hZhy-5kHzA4FMNw7Uq467bZ8yMyZk~v-TUsg0WwU1own-pgyDTzfYdrfzo0MWrRNpIQcfTtyYIcBUTv5xPLx1uV84Ju0Tgo0pmKoFkfJlh2v8UmfAdt5Wa4TCU78LAuqCGTZEF92uRQUxIinQ__',
    link: '/case-study/cibc-leadership',
  },
  {
    id: 'london-drugs-keynote',
    title: 'Turning Condensed Research into a Playful Keynote Experience',
    subtitle: 'London Drugs',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/63e7/6afe/619603351473690deba1aaada9ffcc33?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ew9a-69jSVlTLKcVJPn~zmR0HMMusB4DxgXThHRXZeOE7FASOKyASpnS30ljdRazvXEWSYPYw~o8oiyq8sM0mS-cRNN3tKduWREoedbq3Zyxt4BNC2kMuoDi3w29IpBiZLzi~B6nzHDQIZB9DKQQsXbw0T1iIl9VPz~i2MmBePrvlChm-cX3jiknKjzidAvHhAED7SsDXYGo8FFCPU9GEbGvNmiE2V5f7Evr0c59O5IOnSKHBEv4KuIJK2wm0uSl2LfJvA8sB33m9mgITH0RfwDRwNJHxuSN7a10Uyy-iz9gS6xE5ux64F3eEBK0WfWoFAhyvDqSOpbr8PMx785hNQ__',
    link: '/case-study/london-drugs-keynote',
  },
];

const FeaturedCaseStudy = () => {
  // Active index: 0 means first card is active; 1 means second card is active.
  const [activeIndex, setActiveIndex] = useState(0);

  // Track window width so that we can disable sliding on mobile.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define sliding animation variants only for desktop.
  const containerVariants = isMobile
    ? {} // On mobile, no sliding.
    : {
        animate: {
          x: activeIndex === 0 ? '0%' : '-22.6%',
          transition: { duration: 0.5, ease: 'easeInOut' },
        },
      };

  // Define opacity for desktop only.
  const activeOpacity = 1;
  const inactiveOpacity = 0.5;

  if (isMobile) {
    // On mobile, render the cards as a stacked list (each full width).
    return (
      <div className={styles.featuredSectionWrapper}>
        <section className={styles.featuredSection}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <h2>Featured Case Study</h2>
            </div>
            <div className={styles.headerRight}>
              <p>
                Explore how our projects redefine interactive experiences and create lasting impacts.
              </p>
              <Link to="/case-studies" className={styles.exploreButton}>
                Explore All Case Studies →
              </Link>
            </div>
          </div>
          <div className={styles.stackedCards}>
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className={styles.card}>
                <div
                  className={styles.cardBackground}
                  style={{ backgroundImage: `url(${study.imageUrl})` }}
                />
                <div className={styles.cardOverlay}>
                  <div className={styles.cardOverlayText}>
                    <h3>{study.title}</h3>
                    <p>{study.subtitle}</p>
                    <Link to={study.link} className={styles.caseStudyButton}>
                      View Full Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // For desktop, render with sliding interaction.
  return (
    <div className={styles.featuredSectionWrapper}>
      <section className={styles.featuredSection}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2>Featured Case Study</h2>
          </div>
          <div className={styles.headerRight}>
            <p>
              Explore how our projects redefine interactive experiences and create lasting impacts.
            </p>
            <Link to="/case-studies" className={styles.exploreButton}>
              Explore All Case Studies →
            </Link>
          </div>
        </div>

        {/* Sliding Container */}
        <motion.div
          className={styles.slidingContainer}
          variants={containerVariants}
          animate="animate"
          initial={{ x: '0%' }}
        >
          {/* First Card */}
          <div
            className={`${styles.card} ${activeIndex === 0 ? styles.activeCard : styles.inactiveCard}`}
            style={{
              opacity: activeIndex === 0 ? activeOpacity : inactiveOpacity,
            }}
            onClick={() => {
              if (activeIndex !== 0) setActiveIndex(0);
            }}
          >
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${CASE_STUDIES[0].imageUrl})` }}
            />
            <div className={styles.cardOverlay}>
              <div className={styles.cardOverlayText}>
                <h3>{CASE_STUDIES[0].title}</h3>
                <p>{CASE_STUDIES[0].subtitle}</p>
                {activeIndex === 0 && (
                  <Link to={CASE_STUDIES[0].link} className={styles.caseStudyButton}>
                    View Full Case Study →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div
            className={`${styles.card} ${activeIndex === 1 ? styles.activeCard : styles.inactiveCard}`}
            style={{
              opacity: activeIndex === 1 ? activeOpacity : inactiveOpacity,
            }}
            onClick={() => {
              if (activeIndex !== 1) setActiveIndex(1);
            }}
          >
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${CASE_STUDIES[1].imageUrl})` }}
            />
            <div className={styles.cardOverlay}>
              <div className={styles.cardOverlayText}>
                <h3>{CASE_STUDIES[1].title}</h3>
                <p>{CASE_STUDIES[1].subtitle}</p>
                {activeIndex === 1 && (
                  <Link to={CASE_STUDIES[1].link} className={styles.caseStudyButton}>
                    View Full Case Study →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FeaturedCaseStudy;