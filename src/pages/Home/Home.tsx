// 📂 src/pages/Home/Home.tsx
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactButton from '../../components/Buttons/ContactButton/ContactButton';
import '../../styles/global.css';
import icon1 from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.svg';
import icon2 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.svg';
import icon3 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_5.svg';
import icon4 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_6.svg';

import ClientLogos from '../../components/ClientLogos/ClientLogos';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import BottomCTA from '../../components/BottomCTA/BottomCTA';

// For the product grid section
import { products as allProducts } from '../../pages/ProductPages/productsData';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size to disable animations on mobile
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll animations (disabled on mobile)
  const { scrollYProgress } = useScroll();
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    isMobile ? [1, 1] : [1, 0]
  );
  const slidesScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    isMobile ? [1, 1] : [1.2, 0.4]
  );
  const iconScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    isMobile ? [1, 1] : [5, 1]
  );

  // Second section scroll animations (Always active)
  const { scrollYProgress: secondScrollProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start start', 'end start'],
  });

  // (textColor transforms here remain unchanged)
  const textColor1 = useTransform(
    secondScrollProgress,
    [0, 0.2, 0.3],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor2 = useTransform(
    secondScrollProgress,
    [0.2, 0.3, 0.4],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor3 = useTransform(
    secondScrollProgress,
    [0.3, 0.4, 0.5],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor4 = useTransform(
    secondScrollProgress,
    [0.4, 0.5, 0.6],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor5 = useTransform(
    secondScrollProgress,
    [0.5, 0.6, 0.7],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor6 = useTransform(
    secondScrollProgress,
    [0.6, 0.7, 0.8],
    ['var(--background-dark-gray)', 'white', 'var(--background-dark-gray)']
  );
  const textColor7 = useTransform(
    secondScrollProgress,
    [0.7, 0.8],
    ['var(--background-dark-gray)', 'transparent']
  );
  const textShadow7 = useTransform(
    secondScrollProgress,
    [0.7, 0.8],
    [
      '0.1px 0.1px 0 var(--background-dark-gray), -0.1px 0.1px 0 var(--background-dark-gray), -0.1px -0.1px 0 var(--background-dark-gray), 0.1px -0.1px 0 var(--background-dark-gray)',
      'none'
    ]
  );

  // --------- Product Grid Section (Secondary Section) ---------
  // Select 5 random products from allProducts (without duplicates)
  const randomProducts = [...allProducts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  // Group products into rows following the pattern [3, 3, 2]
  // (For 5 items, this should result in two rows: first with 3 items, second with 2 items)
  const groupProductsByPattern = (items: any[]) => {
    const groups: any[][] = [];
    const pattern = [3, 3, 2];
    let i = 0;
    let patternIndex = 0;
    while (i < items.length) {
      const count = pattern[patternIndex];
      groups.push(items.slice(i, i + count));
      i += count;
      patternIndex = (patternIndex + 1) % pattern.length;
    }
    // If the last group has only 1 item, merge it with the previous group.
    if (groups.length > 1 && groups[groups.length - 1].length === 1) {
      const lastGroup = groups.pop();
      groups[groups.length - 1] = groups[groups.length - 1].concat(lastGroup);
    }
    return groups;
  };

  const groupedProducts = groupProductsByPattern(randomProducts);

  return (
    <>
      {/* ------------------ First Section (with video & shapes) ------------------ */}
      <div className={styles.wrapper}>
        <motion.div className={styles.homeSection}>
          <motion.div className={styles.content} style={{ opacity: contentOpacity }}>
            <h1>
              Less Talking Heads, <br /> More Heads Talking.
            </h1>
            <ContactButton />
          </motion.div>

          <motion.div className={styles.videoSlides} style={{ scale: slidesScale }}>
            {!isMobile && (
              <div className={styles.videoSlide}>
                <video
                  className={styles.videoBackground}
                  src="https://res.cloudinary.com/dazzkestf/video/upload/v1746457021/Flag_Finder_Website_IP_V4_leeta4.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  webkit-playsinline="true"
                />
              </div>
            )}
            <div className={styles.videoSlide}>
              <video
                className={styles.videoBackground}
                src="https://res.cloudinary.com/dazzkestf/video/upload/v1749521690/TopOfThePage_compressed_pgo0a0_lwkirk.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                webkit-playsinline="true"
              />
            </div>
            {!isMobile && (
              <div className={styles.videoSlide}>
                <video
                  className={styles.videoBackground}
                  src="https://res.cloudinary.com/dazzkestf/video/upload/v1746457030/Align_by_Line_Website_IP_V5_Final_Colour_Pass_nzfmxp.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  webkit-playsinline="true"
                />
              </div>
            )}
          </motion.div>

          <motion.div className={styles.iconShapes} style={{ scale: iconScale }}>
            <img src={icon1} alt="Icon 1" className={styles.icon} />
            <img src={icon2} alt="Icon 2" className={styles.icon} />
            <img src={icon3} alt="Icon 3" className={styles.icon} />
            <img src={icon4} alt="Icon 4" className={styles.icon} />
          </motion.div>
        </motion.div>
      </div>

      {/* ------------------ Second Section (Text) ------------------ */}
      <div ref={secondSectionRef} className={styles.secondWrapper}>
        <motion.div className={styles.secondSection}>
          <motion.p className={styles.text} style={{ color: textColor1 }}>
            Event attendees don’t want to just sit and listen.
          </motion.p>
          <motion.p className={styles.text} style={{ color: textColor2 }}>
            Forget stretch breaks and unstructured happy hours.
          </motion.p>
          <motion.p className={styles.text} style={{ color: textColor3 }}>
            Attendees want more meaningful interactions,
          </motion.p>
          <motion.p className={styles.text} style={{ color: textColor4 }}>
            deeper connections, and better conversations.
          </motion.p>
          <motion.p className={styles.text} style={{ color: textColor5 }}>
            They want real engagement – and more of it.
          </motion.p>
          <motion.p className={styles.text} style={{ color: textColor6 }}>
            The future of events is clearly experiential.
          </motion.p>
          <motion.p className={`${styles.text} ${styles.gradientText}`} style={{ color: textColor7, textShadow: textShadow7 }}>
            We’re here to create it with you. Now.
          </motion.p>
        </motion.div>
      </div>

      {/* ------------------ Main Video Section ------------------ */}
      <div className={styles.mainSizzleWrapper}>
        <div className={styles.mainSizzle}>
            <video
            className={styles.mainSizzleVideo}
            src="https://res.cloudinary.com/dazzkestf/video/upload/v1749521688/Website_Testimonials_Dec_2024_V4_jsyqfo_mb8c7q.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
      </div>

      {/* ------------------ Secondary Section (Featured Products Grid & CTA) ------------------ */}
      <div className={styles.secondarySizzleWrapper}>
        <div className={styles.secondarySizzle}>
          <div className={styles.secondarySizzleTitle}>
            <h5> What We Do </h5>
            <h2>
              Interactive. Integrated <br /> Unexpected.
            </h2>
            <h4>
              Projectory creates tangible, data-rich experiences that enhance in-person events,
              helping organizers extend the value of their programs and make info-dense events, well,
              less boring. Find some of our featured products below, or explore all of them in depth.
            </h4>

          </div>

          {/* Modular Product Grid using dynamic pattern (3,3,2) */}
          <div className={styles.productsGrid}>
            {groupedProducts.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className={styles.row}
                style={{ gridTemplateColumns: isMobile ? '1fr' : `repeat(${group.length}, 1fr)` }}
              >
                {group.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ))}
          </div>
           <Link to="/products" className={styles.btnOutlinePrimary}>
             See All Products
           </Link>
        </div>
      </div>

      <div className={styles.clientLogosWrapper}>
          <ClientLogos
            background="transparent"
          />
      </div>

      <TestimonialSizzle 
        videoSrc="https://res.cloudinary.com/dazzkestf/video/upload/v1749521688/Website_Testimonials_Dec_2024_V4_jsyqfo_mb8c7q.mp4"
        quote='"Projectory helped bring our conference to life. As soon as I heard they took the analog experience and could make it read out results for us, I was blown away."'
        author="Sandy Sharman"
        role="Group Head, People Culture & Brand, CIBC"
      />

      <BottomCTA
        title="Yawn-Proof Your Events."
        text="Projectory turns half-listening attendees into active participants – the kind who engage with your content, make valuable connections, contribute to the conversation, and take responsibility for real next steps."
        buttonText="Get Started"
        buttonLink="/get-started"
      />
    </>
  );
};

export default Home;