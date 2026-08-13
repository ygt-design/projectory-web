import styles from './Pricing.module.css';
import PricingHero from '@/pages/Pricing/components/PricingHero/PricingHero';
import DeliveryOptions from '@/pages/Pricing/components/DeliveryOptions/DeliveryOptions';
import WhitelabelCTA from '@/pages/Pricing/components/WhitelabelCTA/WhitelabelCTA';
import CaseStudies from '@/pages/Pricing/components/CaseStudies/CaseStudies';
import CatalogueCTA from '@/pages/Pricing/components/CatalogueCTA/CatalogueCTA';
import FAQ from '@/pages/Pricing/components/FAQ/FAQ';
import { usePageEntrance } from '@/hooks/usePageEntrance';

const Pricing = () => {
  const entrance = usePageEntrance('pricing');

  return (
    <div className={styles.pricingPage}>
      <div className={styles.container}>
        <PricingHero entrance={entrance} />
        <DeliveryOptions entrance={entrance} />
        <CatalogueCTA />
        <CaseStudies />
        <WhitelabelCTA />
        <FAQ />
      </div>
    </div>
  );
};

export default Pricing;
