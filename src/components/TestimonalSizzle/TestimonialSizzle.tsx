import styles from './TestimonialSizzle.module.css';

interface TestimonialSizzleProps {
  videoSrc?: string | null;
  quote?: string | null;
  author?: string | null;
  role?: string | null;
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
          {videoSrc && (
            videoSrc.toLowerCase().endsWith('.mp4') ? (
              <video
                className={styles.video}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={true}
              />
            ) : (
              <iframe
                className={styles.video}
                src={`${videoSrc}${videoSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${videoSrc.split('/').pop()}`}
                title="Testimonial Video"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            )
          )}

          {(quote || author || role) && (
            <div className={styles.quoteSection}>
              {quote && <p className={styles.quote}>{quote}</p>}
              {(author || role) && (
                <div className={styles.author}>
                  {author && <strong>{author}</strong>}
                  {role && <span>{role}</span>}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.bottomRightGraphic}></div>
      </section>
    </div>
  );
};

export default TestimonialSizzle;