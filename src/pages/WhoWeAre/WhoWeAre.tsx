import styles from './WhoWeAre.module.css';
import { motion } from 'framer-motion';
import '../../styles/global.css';
import svgIconOne from '../../assets/images/shapes/pMonograms/whoWeAre-pMonogram.avif';
import svgIconTwo from '../../assets/images/shapes/abstract/whoWeAre-Abstarct.avif'
import imageOne from '../../assets/images/p-WhoWeAre/whoWeAreOne.avif'
import imageTwo from '../../assets/images/p-WhoWeAre/whoWeAreTwo.avif';
import imageThree from '../../assets/images/p-WhoWeAre/whoWeAreThree.avif';
import TealCTASection from '../../components/CTAs/TealCTA/TealCTA';

import personOne from '../../assets/images/p-WhoWeAre/orenImage.avif';
import personTwo from '../../assets/images/p-WhoWeAre/jeffImage.avif';
import personThree from '../../assets/images/p-WhoWeAre/paddyImage.avif';


const WhoWeAre = () => {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <h2>Who Are We, Anyway?</h2>
        <p className={styles.introText}>
          We’re a team of facilitators, designers, futurists, and producers who joined forces to turn in-person meetings into engaging, memorable, and momentum-building experiences.
        </p>
      </section>

      <section className={styles.gallery}>
            <motion.div
                className={styles.imagePlaceholder}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}  
                transition={{ duration: 0.3 }}
            >
                <img src={imageOne} alt="" />
            </motion.div>

            <motion.div
                className={styles.imagePlaceholder}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <img src={imageTwo} alt="" />
            </motion.div>


            <motion.div
                className={`${styles.svgPlaceholder} ${styles.svgOne}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
            > 
                <img src={svgIconOne} alt="" />
            </motion.div>

            <motion.div
                className={styles.imagePlaceholder}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <img src={imageThree} alt="" />
            </motion.div>


            <motion.div
                className={`${styles.svgPlaceholder} ${styles.svgTwo}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <img src={svgIconTwo} alt="" />
            </motion.div>
        </section>

      {/* Third Section - Three Paragraphs */}
      <section className={styles.textSection}>
        <p>Our closets are full of event badges and lanyards. Yes, we know that there are better uses for the space, but some of us are sentimental. We’ve been to some great events.</p>
        <p>We’ve also been to some not-so-great events. Like you, we know the ones that just blast information don’t actually work – and if we’re being honest, they’re a drag to sit through.</p>
        <p>We believe that live events can be and do more. They can (and should!) be participatory experiences that drive conversation, action and learning, even after the event is over.</p>
      </section>

      {/* People Section */}
      <section className={styles.peopleSection}>
        <div className={styles.person}>
          <img src={personOne} alt="Oren Berkovich" className={styles.personImage} />
          <div className={styles.personInfo}>
            <h3>Oren Berkovich</h3>
            <p>Oren manages the client experience at Projectory. He is the founder of Bepossible, a design studio for impactful learning experiences and is the former president and CEO of Singularity University Canada.</p>
          </div>
        </div>

        <div className={styles.person}>
          <img src={personTwo} alt="Jeffrey Rogers" className={styles.personImage} />
          <div className={styles.personInfo}>
            <h3>Jeffrey Rogers</h3>
            <p>Jeff leads the facilitation and on-stage programming at Projectory. He is a partner at be Radical, an innovation and learning consultancy, and has been a futures education advisor at the Stanford Design School.</p>
          </div>
        </div>

        <div className={styles.person}>
          <img src={personThree} alt="Paddy Harrington" className={styles.personImage} />
          <div className={styles.personInfo}>
            <h3>Paddy Harrington</h3>
            <p>Paddy leads the experience and installation design at Projectory, with members of his design office, Frontier. He was formerly SVP Digital Innovation and Digital Creative Director at Indigo Books, and, prior to that, Executive Creative Director of Bruce Mau Design.</p>
          </div>
        </div>
      </section>

      <div className={styles.ctaSection}>
        <TealCTASection
          title="Don’t know where to start?" 
          description="Find experiences tailored to your event by using our Program Builder."
          buttonText="Build Your Program"
          buttonLink="/build-your-program"
        />
      </div>
    </div>
  );
};

export default WhoWeAre;