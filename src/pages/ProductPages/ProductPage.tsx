import { useParams } from 'react-router-dom';
import { products } from './productsData';

import ProductHero from './components/ProductHero/ProductHero';
import ProductDetails from './components/ProductDetails/ProductDetails';
import QuickFacts from './components/QuickFacts/QuickFacts';
import Objectives from './components/Objectives/Objectives';
import DataFeature from './components/DataFeature/DataFeature';
import VideoFeature from './components/VideoFeature/VideoFeature';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import PricingInformation from './components/PricingInformation/PricingInformation';
import CaseStudyHighlight from './components/CaseStudyHighlight/CaseStudyHighlight';
import FinalCTA from './components/FinalCTA/FinalCTA';
import HowItWorks from './components/HowItWorks/HowItWorks';

import { useLikedProducts } from '../../context/LikedProductsContext'; // <-- 1) import context
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  // 2) Access the liked products context
  const { likedProducts, toggleLike } = useLikedProducts();

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const isLiked = likedProducts.includes(product.id);

  return (
    <div className={styles.productPage}>
      {product.sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <ProductHero key={index} product={product} />;
          case 'details':
            return (
              <ProductDetails
                key={index}
                product={product}
                details={section.content}
              />
            );
          case 'image':
            return (
              <img
                key={index}
                src={section.content.imageUrl}
                alt=""
                className={styles.fullPageImage}
              />
            );
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
            return (
              <PricingInformation
                key={index}
                pricing={section.content.plans}
              />
            );
          case 'case-study':
            return <CaseStudyHighlight key={index} {...section.content} />;
          case 'how-it-works':
            return (
              <HowItWorks
                key={index}
                title={section.content.title}
                description={section.content.description}
                imageUrl={section.content.imageUrl}
              />
            );
          default:
            return null;
        }
      })}

      {/* 🔹 Possibly add a final CTA or anything else */}
      <FinalCTA experienceText="Experiences" experienceLink="/experiences" />

      {/* 4) Floating Like Button */}
      <div className={styles.floatingLikeButton}>
        <button
          onClick={() => toggleLike(product.id)}
          className={styles.likeButton}
        >
          <img
            src={isLiked ? HeartIconSVG : HeartIconSVG_Outline}
            alt="Like/Unlike Product"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductPage;