import { useRef, useEffect, useState } from 'react';
import styles from './Home.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactButton from '../../components/Buttons/ContactButton/ContactButton';
import '../../styles/global.css';
import icon1 from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.svg';
import icon2 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.svg';
import icon3 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_5.svg';
import icon4 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_6.svg';

const Home = () => {
  const secondSectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and disable animations on mobile
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll animations (Disabled on Mobile)
  const { scrollYProgress } = useScroll();
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], isMobile ? [1, 1] : [1, 0]);
  const slidesScale = useTransform(scrollYProgress, [0, 0.3], isMobile ? [1, 1] : [1.2, 0.4]);
  const iconScale = useTransform(scrollYProgress, [0, 0.3], isMobile ? [1, 1] : [5, 1]);

  // Second section scroll animations (Always active)
  const { scrollYProgress: secondScrollProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start start', 'end start'],
  });

  const textColor1 = useTransform(secondScrollProgress, [0, 0.2, 0.3], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor2 = useTransform(secondScrollProgress, [0.2, 0.3, 0.4], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor3 = useTransform(secondScrollProgress, [0.3, 0.4, 0.5], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor4 = useTransform(secondScrollProgress, [0.4, 0.5, 0.6], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor5 = useTransform(secondScrollProgress, [0.5, 0.6, 0.7], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor6 = useTransform(secondScrollProgress, [0.6, 0.7, 0.8], ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']);
  const textColor7 = useTransform(secondScrollProgress, [0.7, 0.8], ['var(--background-dark-gray)', 'transparent']);
  const textShadow7 = useTransform(secondScrollProgress, [0.7, 0.8], ['0.1px 0.1px 0 var(--background-dark-gray), -0.1px 0.1px 0 var(--background-dark-gray),-0.1px -0.1px 0 var(--background-dark-gray),0.1px -0.1px 0 var(--background-dark-gray)', 'none']);

  return (
    <>
      {/* 🔹 First Section (Scroll animations disabled on mobile) */}
      <div className={styles.wrapper}>
        <motion.div className={styles.homeSection}>
          <motion.div className={styles.content} style={{ opacity: contentOpacity }}>
            <h1>
              Less Talking Heads, <br /> More Heads Talking
            </h1>
            <ContactButton />
          </motion.div>

          <motion.div className={styles.videoSlides} style={{ scale: slidesScale }}>
            <div className={styles.videoSlide} style={{ backgroundColor: 'rgb(40,40,40)' }}></div>
            <div className={styles.videoSlide} style={{ backgroundColor: 'rgb(100,100,100)' }}></div>
            <div className={styles.videoSlide} style={{ backgroundColor: 'rgb(160,160,160)' }}></div>
          </motion.div>

          <motion.div className={styles.iconShapes} style={{ scale: iconScale }}>
            <img src={icon1} alt="Icon 1" className={styles.icon} />
            <img src={icon2} alt="Icon 2" className={styles.icon} />
            <img src={icon3} alt="Icon 3" className={styles.icon} />
            <img src={icon4} alt="Icon 4" className={styles.icon} />
          </motion.div>
        </motion.div>
      </div>

      {/* 🔹 Second Section */}
      <div ref={secondSectionRef} className={styles.secondWrapper}>
        <motion.div className={styles.secondSection}>
          <motion.p className={styles.text} style={{ color: textColor1 }}>Most corporate events just blast information.</motion.p>
          <motion.p className={styles.text} style={{ color: textColor2 }}>Then, everyone returns to their day-to-day</motion.p>
          <motion.p className={styles.text} style={{ color: textColor3 }}>usually without clear next steps.</motion.p>
          <motion.p className={styles.text} style={{ color: textColor4 }}>What if events sparked real action and dialogue</motion.p>
          <motion.p className={styles.text} style={{ color: textColor5 }}>— even after they ended?</motion.p>
          <motion.p className={styles.text} style={{ color: textColor6 }}>We know exactly why this isn’t the norm.</motion.p>
          <motion.p className={`${styles.text} ${styles.gradientText}`} style={{ color: textColor7, textShadow: textShadow7 }}>
            And we’re here to change that.
          </motion.p>
        </motion.div>
      </div>

      {/* 🔹 Main Video Section */}
      <div className={styles.mainSizzleWrapper}>
        <div className={styles.mainSizzle}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/bboIrd3BMWM?autoplay=1&mute=1&loop=1&playlist=bboIrd3BMWM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* 🔹 Secondary Section */}
      <div className={styles.secondarySizzleWrapper}>
        <div className={styles.secondarySizzle}>
          <div className={styles.secondarySizzleTitle}>
            <h5> What We Do </h5>
            <h2> Interactive. Integrated <br /> Unexpected. </h2>
            <h4>
              Projectory creates tangible, data-rich experiences that enhance in-person events, 
              helping organizers extend the value of their programs and make info-dense events, 
              well, less boring.
            </h4>
            <ContactButton />
          </div>
          <div className={styles.secondarySizzleVideo}></div>
        </div>
      </div>
    </>
  );
};

export default Home;