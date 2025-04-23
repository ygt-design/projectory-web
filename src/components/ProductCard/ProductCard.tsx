import React, { useState, useRef, useEffect } from 'react';
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
  thumbnail?: string;
  shortDescription?: string;
  bgVideo?: string; 
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { likedProducts, toggleLike } = useLikedProducts();
  const isLiked = likedProducts.includes(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Measure description height for the expand/collapse
  useEffect(() => {
    if (descRef.current) {
      setDescHeight(descRef.current.scrollHeight);
    }
  }, [product.shortDescription]);

  const handleCardClick = () => navigate(`/products/${product.id}`);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
  };

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{ zIndex: isHovered ? 2 : 1 }}
    >
      {/* background layer container */}
      <div className={styles.bgLayer}>
        {product.bgVideo && (
          <div className={styles.bgVideoWrapper}>
            <iframe
              className={styles.bgVideo}
              src={`${product.bgVideo}?autoplay=1&mute=1&controls=0&loop=1&playlist=${extractYouTubeID(
                product.bgVideo
              )}&modestbranding=1&showinfo=0&disablekb=1&iv_load_policy=3`}
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="Background Video"
            />
          </div>
        )}
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${product.thumbnail})` }}
        />
      </div>

      {/* content */}
      <div className={styles.cardContent}>
        <div className={styles.productName}>
          <h3
            className={styles.title}
            style={{ color: product.categoryColor || '#fff' }}
          >
            {product.category}
            {product.categoryHighlight && <strong>{product.categoryHighlight}</strong>}
          </h3>

          <div
            className={styles.descWrapper}
            style={{
              height: isHovered ? descHeight : 0,
            }}
          >
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

          <button className={styles.likeButton} onClick={handleLikeClick}>
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

// extract YouTube ID from embed URL
const extractYouTubeID = (url: string): string => {
  const parts = url.split('/embed/');
  return parts[1]?.split('?')[0] ?? '';
};

export default ProductCard;