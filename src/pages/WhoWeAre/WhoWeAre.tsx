import styles from './WhoWeAre.module.css';
import WhoWeAreHero from '@/pages/WhoWeAre/components/WhoWeAreHero/WhoWeAreHero';
import ImageCarousel from '@/pages/WhoWeAre/components/ImageCarousel/ImageCarousel';
import Team from '@/pages/WhoWeAre/components/Team/Team';
import WhyWeStarted from '@/pages/WhoWeAre/components/WhyWeStarted/WhyWeStarted';
import CtaBanner from '@/pages/WhoWeAre/components/CtaBanner/CtaBanner';

const WhoWeAre = () => {
  return (
    <div className={styles.whoWeArePage}>
      <WhoWeAreHero />
      <ImageCarousel />
      <div className={`${styles.container} ${styles.teamBlock}`}>
        <Team />
      </div>
      <div className={`${styles.container} ${styles.sectionBlock}`}>
        <WhyWeStarted />
      </div>
      <CtaBanner />
    </div>
  );
};

export default WhoWeAre;
