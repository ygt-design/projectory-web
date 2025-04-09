import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ClientLogos.module.css';

// Import logo images
import logo1 from '../../assets/images/logos/cibc.png';
import logo2 from '../../assets/images/logos/thomsonReuters.png';
import logo3 from '../../assets/images/logos/canadianMedicalAssociation.png';
import logo4 from '../../assets/images/logos/deloitte.webp';
import logo5 from '../../assets/images/logos/enmax.png';
import logo6 from '../../assets/images/logos/oracle.png';
import logo7 from '../../assets/images/logos/pcma.png'
import logo8 from '../../assets/images/logos/royalCanadianMint.svg'


const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

const ClientLogos = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [oneSetWidth, setOneSetWidth] = useState<number>(0);

  // Calculate the exact width of one set of logos
  const calculateOneSetWidth = () => {
    if (marqueeRef.current) {
      const images = marqueeRef.current.querySelectorAll('img');
      let total = 0;
      images.forEach((img, index) => {
        if (index < logos.length) {
          total += img.clientWidth;
          const style = window.getComputedStyle(img);
          const marginRight = parseFloat(style.marginRight) || 0;
          total += marginRight;
        }
      });
      setOneSetWidth(Math.round(total));
    }
  };

  useEffect(() => {
    // Delay measurement to allow images to load
    const timeout = setTimeout(calculateOneSetWidth, 200);
    window.addEventListener('resize', calculateOneSetWidth);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', calculateOneSetWidth);
    };
  }, []);

  const speed = 100;
  const duration = oneSetWidth ? oneSetWidth / speed : 5;

  return (
    <section className={styles.clientLogosWrapper}>
      <h2>
        Our clients love us.<br /> You will too.
      </h2>
      <div className={styles.marquee}>
        <motion.div
          ref={marqueeRef}
          className={styles.marqueeInner}
          animate={{ x: oneSetWidth ? [`0px`, `-${oneSetWidth}px`] : '0px' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: duration,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client Logo ${index + 1}`}
              className={styles.logo}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;