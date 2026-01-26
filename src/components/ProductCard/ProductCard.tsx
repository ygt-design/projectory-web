// src/components/ProductCard/ProductCard.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { useLikedProducts } from '../../context/LikedProductsContext';
import HeartIconSVG from '../../assets/images/heartIcon.svg';
import HeartIconSVG_Outline from '../../assets/images/heartIcon_outline.svg';

interface Product {
  id: string;
  name: string;
  category: string;
  categoryHighlight?: string | null;
  categoryColor?: string;
  thumbnail: string;
  bgVideo?: string;
  bgVideoPublicId?: string;
  shortDescription?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { likedProducts, toggleLike } = useLikedProducts();
  const isLiked = likedProducts.includes(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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

  // Only load video when hovered (deferred loading)
  useEffect(() => {
    if (isHovered && !isMobile && product.bgVideo && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [isHovered, isMobile, product.bgVideo, shouldLoadVideo]);

  // Memoize video component to prevent recreation
  const videoComponent = useMemo(() => {
    if (!shouldLoadVideo || !product.bgVideo) return null;
    
    return (
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
    );
  }, [shouldLoadVideo, product.bgVideo, product.thumbnail]);

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
        {!isMobile && videoComponent && (
          <div
            className={styles.bgVideoWrapper}
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            {videoComponent}
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

// Memoize component to prevent unnecessary re-renders
export default React.memo(ProductCard, (prevProps: { product: Product }, nextProps: { product: Product }) => {
  // Only re-render if product data actually changes
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.thumbnail === nextProps.product.thumbnail &&
         prevProps.product.bgVideo === nextProps.product.bgVideo;
});