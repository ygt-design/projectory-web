import styles from './VideoSlide.module.css';

const VideoSlide = ({ color }: { color: string }) => {
  return <div className={styles.slide} style={{ backgroundColor: color }}></div>;
};

export default VideoSlide;