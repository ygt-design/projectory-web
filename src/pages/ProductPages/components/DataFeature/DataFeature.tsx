import styles from './DataFeature.module.css';

interface DataFeatureProps {
  title: string;
  description: string;
  imageUrl: string;
}

const DataFeature = ({ title, description, imageUrl }: DataFeatureProps) => {
  return (
    <section className={styles.dataFeatureWrapper}>
      {/* 🔹 Text Content */}
      <div className={styles.textContent}>
        <h2 className={styles.gradientText}>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="Data Representation" />
      </div>
    </section>
  );
};

export default DataFeature;