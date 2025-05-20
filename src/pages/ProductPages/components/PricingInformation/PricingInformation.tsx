import styles from './PricingInformation.module.css';
import checkCircle from '../../../../assets/images/CheckCircle.svg';
import "../../../../styles/global.css"
import { Link } from 'react-router-dom';

interface PricingCard {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
}

interface PricingInformationProps {
  pricing: PricingCard[];
}

const PricingInformation = ({ pricing }: PricingInformationProps) => {
  return (
    <section className={styles.pricingWrapper}>
      <h2>Pricing Information</h2>
      <p>
        We can’t give an exact quote without knowing a bit more about what you’re working on, 
        but below is a general range with different levels of customization available for this experience. 
        Ultimately, starting a conversation is the best way to know how we can work together.
      </p>

      <Link to="/get-started" className={styles.ctaButton}>
        Get Started
      </Link>


      {/* 🔹 Dynamic Pricing Cards */}
      <div className={styles.pricingGrid}>
        {pricing.map((plan, index) => (
          <div key={index} className={`${styles.pricingCard} ${index === 1 ? styles.featured : ''}`}>
            <div className={styles.titleSection}>
                <h3>{plan.title}</h3>
                {plan.price === 'Add-ons' ? (
                  <h4 className={styles.price}>{plan.price}</h4>
                ) : (
                  <h4 className={styles.price}>${plan.price}</h4>
                )}
                <h5 className={styles.description}>{plan.description}</h5>
            </div>
            <hr />
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}> 
                    <img src={checkCircle} alt="Checkmark" />
                 {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.disclaimer}>
        Pricing does not include shipping or travel and accommodation costs for any onsite team members.
      </div>
    </section>
  );
};

export default PricingInformation;