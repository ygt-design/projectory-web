import styles from './VideoFeature.module.css';
import AbstractImageTwo from '../../../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';

interface VideoFeatureProps {
  videoUrl: string;
  title: string;
  description: string;
}

const VideoFeature = ({ videoUrl, title }: VideoFeatureProps) => {
  return (
    <section className={styles.videoFeatureWrapper}>
      <div className={styles.textContent}>
        <h2 className={styles.highlight}>{title}</h2>
      </div>

      <img src={AbstractImageTwo} className={`${styles.abstractImage} ${styles.abstractImageTwo}`}/>

      <div className={styles.videoContainer}>
        <iframe
          src={videoUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        ></iframe>
      </div>
    </section>
  );
};

export default VideoFeature;