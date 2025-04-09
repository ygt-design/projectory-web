import styles from './TestimonialSizzle.module.css';

interface TestimonialSizzleProps {
  videoSrc: string;
  quote: string;
  author: string;
  role: string;
}

const TestimonialSizzle: React.FC<TestimonialSizzleProps> = ({
  videoSrc,
  quote,
  author,
  role,
}) => {
  return (
    <div className={styles.flowWrapper}> 
      <section className={styles.testimonialWrapper}>
        <div className={styles.topLeftGraphic}></div>
        <div className={styles.videoContainer}>
          <iframe
            className={styles.video}
            src={videoSrc}
            title="Testimonial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className={styles.quoteSection}>
              <p className={styles.quote}>{quote}</p>
              <div className={styles.author}>
              <strong>{author}</strong>
              <span>{role}</span>
              </div>
          </div>
        </div>


        {/* Bottom Right Branded SVG */}
        <div className={styles.bottomRightGraphic}></div>
      </section>
    </div>
  );
};

export default TestimonialSizzle;