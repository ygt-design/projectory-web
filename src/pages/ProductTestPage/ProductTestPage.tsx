import { useState } from 'react';
import { products } from '../ProductPages/productsData';
import ProductHero from '../ProductPages/components/ProductHero/ProductHero';
import ProductDetails from '../ProductPages/components/ProductDetails/ProductDetails';
import QuickFacts from '../ProductPages/components/QuickFacts/QuickFacts';
import Objectives from '../ProductPages/components/Objectives/Objectives';
import DataFeature from '../ProductPages/components/DataFeature/DataFeature';
import VideoFeature from '../ProductPages/components/VideoFeature/VideoFeature';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import PricingInformation from '../ProductPages/components/PricingInformation/PricingInformation';
import CaseStudyHighlight from '../ProductPages/components/CaseStudyHighlight/CaseStudyHighlight';
import FinalCTA from '../ProductPages/components/FinalCTA/FinalCTA';
import HowItWorks from '../ProductPages/components/HowItWorks/HowItWorks';

import styles from './ProductTestPage.module.css';

const ProductTestPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <div>
      {/* 🔹 Product Selection Dropdown */}
      <select className={styles.productSelect}
        onChange={(e) => setSelectedProduct(products.find(p => p.id === e.target.value)!)}
        value={selectedProduct.id}
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {/* 🔹 Dynamically Render Sections */}
      {selectedProduct.sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <ProductHero key={index} product={selectedProduct} />;
          case 'details':
            return (
              <ProductDetails 
                key={index} 
                product={selectedProduct} 
                details={section.content} 
              />
            );
            case 'image':
            return <img key={index} src={section.content.imageUrl} alt="" className={styles.fullPageImage} />;
            case 'grid':
            return <QuickFacts key={index} items={section.content.items} />;
            case 'objectives':
              return (
                <Objectives 
                  key={index} 
                  title={section.content.title}
                  titleColor={section.content.titleColor}
                  imageUrl={section.content.imageUrl}
                  objectives={section.content.objectives}
                />
              );
            case 'video':
              return (
                <VideoFeature
                  key={index}
                  videoUrl={section.content.videoUrl}
                  title={section.content.title}
                  description={section.content.description}
                />
              );
            case 'dataFeature':
              return <DataFeature key={index} {...section.content} />;
            case 'testimonialSizzle':
              return <TestimonialSizzle key={index} {...section.content} />;
            case 'pricing':
              return <PricingInformation key={index} pricing={section.content.plans} />;
            case 'case-study':
              return <CaseStudyHighlight key={index} {...section.content} />;
            case 'how-it-works':
              return (
                <HowItWorks 
                  key={index} 
                  title={section.content.title}
                  description={section.content.description}
                  imageUrl={section.content.imageUrl}
                />);
          default:
            return null;
        }
      })}
      <FinalCTA experienceText="Experiences" experienceLink="/experiences" />
    </div>
  );
};

export default ProductTestPage;