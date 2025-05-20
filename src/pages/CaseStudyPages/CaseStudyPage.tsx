import { useParams } from 'react-router-dom';
import { caseStudiesData } from '../CaseStudyPages/caseStudiesData';
import styles from './CaseStudyPage.module.css';
import ProductHero from '../ProductPages/components/ProductHero/ProductHero';
import ProductDetails from '../ProductPages/components/ProductDetails/ProductDetails';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import HowWeBuilt from './components/HowWeBuilt/HowWeBuilt';
import TealCTASection from '../../components/CTAs/TealCTA/TealCTA';
import DataFeature from '../ProductPages/components/DataFeature/DataFeature';
import FinalCTA from '../ProductPages/components/FinalCTA/FinalCTA';

const CaseStudyPage = () => {
  const { id } = useParams();
  const caseStudy = caseStudiesData.find((study) => study.id === id);

  if (!caseStudy) {
    return <h2>Case Study Not Found</h2>;
  }

  return (
    <div className={styles.container}>
      {caseStudy.sections.map((section, index) => {
        if (section.type === 'hero') {
          return <ProductHero key={index} product={caseStudy} />;
        }
        if(section.type === 'details'){
          return <ProductDetails key={index} product={caseStudy} details={section.content} />;
        }

        if(section.type === 'image'){
          return <img key={index} src={section.content.imageUrl} alt="" className={styles.fullPageImage} />;
        }

        if (section.type === 'imageGrid') {
          return (
            <div className={styles.imageGrid} key={index}>
              <img src={section.content.imageLeft} alt="" className={styles.imageLeft} />
              <img src={section.content.imageRight} alt="" className={styles.imageRight} />
            </div>
          );
        }

        if(section.type === 'testimonialSizzle'){
          return <TestimonialSizzle key={index} {...section.content} />;
        }

        if(section.type === 'how-we-built'){
          return <HowWeBuilt key={index} installations={section.content.installations} />;
        }

        if(section.type === 'tealCTA'){
        return  <TealCTASection 
          key={index}
          title="Have an event coming up?" 
          description="Get in touch to see how Projectory can help bring your event to life!"
          buttonText="Contact Us →"
          buttonLink="/build-your-program" />;
        }

        if(section.type === 'dataFeature'){
          return <DataFeature key={index} {...section.content} />;
        }

        return null;
      })}
      <FinalCTA experienceText="Case Studies" experienceLink="/case-studies" />
    </div>

  );
};

export default CaseStudyPage;