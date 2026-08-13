import FaqAccordion from '@/components/FaqAccordion/FaqAccordion';
import { faqSection } from '@/pages/Pricing/pricingData';

const FAQ = () => <FaqAccordion title={faqSection.title} items={faqSection.items} />;

export default FAQ;
