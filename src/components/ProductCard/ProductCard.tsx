// src/components/ProductCard/ProductCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useLikedProducts } from '../../context/LikedProductsContext';
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

import { AdvancedVideo, lazyload as videoLazyload } from '@cloudinary/react';

interface Product {
  id: string;
  name: string;
  category: string;
  categoryHighlight?: string | null;
  categoryColor?: string;
  thumbnail: string;
  bgVideo?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { likedProducts, toggleLike } = useLikedProducts();
  const isLiked = likedProducts.includes(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descRef.current) setDescHeight(descRef.current.scrollHeight);
  }, [product.shortDescription]);

  // Set up Cloudinary video or fallback unconditionally
  const videoComponent =
    product.bgVideoPublicId ? (
      <AdvancedVideo
        cldVid={cld.video(product.bgVideoPublicId).videoCodec('auto').format('auto').quality('auto')}
        plugins={[videoLazyload({ rootMargin: '200px' })]}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        className={styles.bgVideo}
      />
    ) : product.bgVideo ? (
      <video
        className={styles.bgVideo}
        src={product.bgVideo}
        poster={product.thumbnail}
        preload="none"
        autoPlay
        muted
        loop
        playsInline
      />
    ) : null;

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/products/${product.id}`)}
      style={{ zIndex: isHovered ? 2 : 1 }}
    >
      <div className={styles.bgLayer}>
        <img
          className={styles.bgImage}
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!isMobile && (
          <div
            className={styles.bgVideoWrapper}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            {isHovered && videoComponent}
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.productName}>
          <h3 className={styles.title} style={{ color: product.categoryColor || '#fff' }}>
            {product.category}
            {product.categoryHighlight && <strong>{product.categoryHighlight}</strong>}
          </h3>

          <div className={styles.descWrapper} style={{ height: isHovered ? descHeight : 0 }}>
            <p ref={descRef} className={styles.description}>
              {product.shortDescription}
            </p>
          </div>

          <Link
            to={`/products/${product.id}`}
            className={styles.learnMoreButton}
            onClick={e => e.stopPropagation()}
          >
            Learn More
          </Link>

          <button className={styles.likeButton} onClick={e => { e.stopPropagation(); toggleLike(product.id); }}>
            <img
              className={styles.heartIcon}
              src={isLiked ? HeartIconSVG : HeartIconSVG_Outline}
              alt="Like"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;