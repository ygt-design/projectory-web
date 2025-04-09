// 📂 src/components/ProductCard/ProductCard.tsx

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
}

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { likedProducts, toggleLike } = useLikedProducts();
  const isLiked = likedProducts.includes(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [descHeight, setDescHeight] = useState(0);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descRef.current) {
      setDescHeight(descRef.current.scrollHeight);
    }
  }, [product.shortDescription]);

  // Clicking on the card navigates to the product page
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Clicking the like button should not trigger navigation
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
  };

  return (
    <div
      className={styles.productCard}
      style={{ 
        backgroundImage: `url(${product.thumbnail})`,
        zIndex: isHovered ? 1 : 'auto'  
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={styles.cardContent}>
        <div className={styles.productName}>
          <h3
            className={styles.title}
            style={{ color: product.categoryColor || '#ffffff' }}
          >
            {product.category} <strong>{product.categoryHighlight}</strong>
          </h3>

          <div
            className={styles.descWrapper}
            style={{
              height: isHovered ? descHeight : 0,
              transition: 'height 0.3s ease',
              overflow: 'hidden',
            }}
          >
            <p ref={descRef} className={styles.description}>
              {product.shortDescription || 'No short description provided.'}
            </p>
          </div>

          <Link
            to={`/products/${product.id}`}
            className={styles.learnMoreButton}
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
          </Link>
        </div>
      </div>

      <button
        className={styles.likeButton}
        onClick={handleLikeClick}
      >
        <img
          className={styles.heartIcon}
          src={isLiked ? HeartIconSVG : HeartIconSVG_Outline}
          alt="Like Product"
        />
      </button>
    </div>
  );
};

export default ProductCard;