// 📂 src/components/Intro/Intro.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Intro.module.css';
import { motion } from 'framer-motion';
import shape1 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_1.png';
import shape2 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_2.png';
import shape3 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.png';
import shape4 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_5.png';
import shape5 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_6.png';
import shape6 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_9.png';
import shape7 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';

const shapePool = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];

interface IntroProps {
  title: string;
  description: string;
  buttonText?: string; // Made optional
  buttonLink?: string;
  scrollToNext?: () => void;
}

const Intro: React.FC<IntroProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  scrollToNext
}) => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);

  useEffect(() => {
    const shuffledShapes = [...shapePool].sort(() => 0.5 - Math.random()).slice(0, 4);
    setSelectedShapes(shuffledShapes);
  }, []);

  return (
    <section className={styles.introWrapper}>
      {/* Shapes */}
      {selectedShapes.map((shape, index) => (
        <motion.img
          key={index}
          src={shape}
          alt={`Background Shape ${index}`}
          className={`${styles.shape} ${styles[`shape${index + 1}`]}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      ))}

      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{description}</p>

        {/* Only render the button if buttonText is provided */}
        {buttonText && (buttonLink ? (
          <Link to={buttonLink} className={styles.ctaButton}>
            {buttonText} <span className={styles.arrow}>→</span>
          </Link>
        ) : (
          <button className={styles.ctaButton} onClick={scrollToNext}>
            {buttonText} <span className={styles.arrow}>→</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Intro;