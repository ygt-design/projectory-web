import styles from './CaseStudyHighlight.module.css';

interface CaseStudyHighlightProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  caseStudyTitle: string;
  caseStudySubtitle: string;
  caseStudyImage: string;
}

const CaseStudyHighlight = ({
  title,
  description,
  buttonText,
  buttonLink,
  caseStudyTitle,
  caseStudySubtitle,
  caseStudyImage,
}: CaseStudyHighlightProps) => {
  return (
    <section className={styles.caseStudyWrapper}>
      {/* 🔹 Left Section (Text & Button) */}
      <div className={styles.textContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={buttonLink} className={styles.ctaButton}>
          {buttonText} →
        </a>
      </div>

      {/* 🔹 Right Section (Image & Overlay Text) */}
      <div className={styles.caseStudyImageWrapper}>
        <img src={caseStudyImage} alt="Case Study" className={styles.caseStudyImage} />
        <div className={styles.imageOverlay}></div> 
        <div className={styles.overlayText}>
          <h3>{caseStudyTitle}</h3>
          <p>{caseStudySubtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHighlight;