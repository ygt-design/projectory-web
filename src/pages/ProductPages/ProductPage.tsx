import { useParams } from 'react-router-dom';
import { products } from './productsData';

import ProductHero from './components/ProductHero/ProductHero';
import ProductDetails from './components/ProductDetails/ProductDetails';
import QuickFacts from './components/QuickFacts/QuickFacts';
import Objectives from './components/Objectives/Objectives';
import VideoFeature from './components/VideoFeature/VideoFeature';
import TestimonialSizzle from '../../components/TestimonalSizzle/TestimonialSizzle';
import PricingInformation from './components/PricingInformation/PricingInformation';
import CaseStudyHighlight from './components/CaseStudyHighlight/CaseStudyHighlight';
import FinalCTA from './components/FinalCTA/FinalCTA';
import HowItWorks from './components/HowItWorks/HowItWorks';
import DataFeature from './components/DataFeature/DataFeature';

import { useLikedProducts } from '../../context/LikedProductsContext'; // <-- 1) import context
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

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
          case 'image': {
            const url = section.content.imageUrl;
            return (
              <img
                key={index}
                src={url}
                alt=""
                className={styles.fullPageImage}
                loading="lazy"
              />
            );
          }
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
          case 'dataFeature':
            return (
              <DataFeature
                key={index}
                title={section.content.title}
                description={section.content.description}
                imageUrl={section.content.imageUrl}
              />
            );
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

      <FinalCTA experienceText="Products" experienceLink="/products" />

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

      <div className={styles.floatingText}>
        Like this product? <br />
        Click the heart to save it for later!
      </div>
      </div>
    </div>
  );
};

export default ProductPage;