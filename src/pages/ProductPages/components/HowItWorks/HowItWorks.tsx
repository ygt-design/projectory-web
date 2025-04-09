
import styles from './HowItWorks.module.css';

interface HowItWorksProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HowItWorks = ({ title, description, imageUrl }: HowItWorksProps) => {
  return (
    <section className={styles.howItWorksWrapper}>
      {/* 🔹 Text Section */}
      <div className={styles.textContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {/* 🔹 Image Section */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="How it Works" className={styles.image} />
      </div>
    </section>
  );
};

export default HowItWorks;