// 📂 src/components/Intro/Intro.tsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Intro.module.css';
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
  buttonText?: string;
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
    // Randomly select 4 shapes from the pool
    const shuffledShapes = [...shapePool].sort(() => 0.5 - Math.random()).slice(0, 4);
    setSelectedShapes(shuffledShapes);
  }, []);

  return (
    <section className={styles.introWrapper}>
      {/* Animated container wrapping the shapes */}
      <motion.div
        className={styles.shapesContainer}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{
          scale: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }
        }}
      >
        {selectedShapes.map((shape, index) => (
          <img
            key={index}
            src={shape}
            alt={`Background Shape ${index}`}
            className={`${styles.shape} ${styles[`shape${index + 1}`]}`}
          />
        ))}
      </motion.div>

      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{description}</p>
        {buttonText &&
          (buttonLink ? (
            <Link to={buttonLink} className={styles.ctaButton}>
              {buttonText}
            </Link>
          ) : (
            <button className={styles.ctaButton} onClick={scrollToNext}>
              {buttonText}
            </button>
          ))}
      </div>
    </section>
  );
};

export default Intro;