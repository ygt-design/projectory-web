// 📂 src/pages/Products/Products.tsx

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as allProducts } from '../ProductPages/productsData';
import ProductCard from '../../components/ProductCard/ProductCard';
import FeaturedCarousel from '../../components/FeaturedCarousel/FeaturedCarousel';
import TealCTASection from '../../components/CTAs/TealCTA/TealCTA';
import GridCTA from '../../components/GridCTA/GridCTA';
import FeaturedCaseStudy from '../../components/FeaturedCaseStudy/FeaturedCaseStudy';
import styles from './Products.module.css';
import { motion } from 'framer-motion';

// Import shape assets (adjust paths as needed)
import shape1 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_1.png';
import shape2 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_2.png';
import shape3 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.png';
import shape4 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_5.png';
import shape5 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_6.png';
import shape6 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_9.png';
import shape7 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';

const shapePool = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];

const TAGS = [
  'All Products',
  'Networking',
  'Peer learning',
  'Explore priorities',
  'Ideas to action',
  'Reflect & synthesize',
  'Build alignment',
  'Inspire creativity',
  'Visualize insights',
];

const TAG_INFO: Record<string, { heading: string; description: string }> = {
  'All Products': {
    heading: 'All Products',
    description:
      'Explore everything or filter by objective to find products designed with your goals in mind.',
  },
  'Networking': {
    heading: 'Networking',
    description:
      'Create meaningful opportunities for participants to build relationships, exchange ideas, and grow professional networks that extend beyond the event.',
  },
  'Peer learning': {
    heading: 'Peer Learning',
    description:
      'Encourage open, insightful conversations among peers to share experiences, deepen understanding, and elevate collective expertise.',
  },
  'Explore priorities': {
    heading: 'Explore Priorities',
    description:
      'Guide participants through focused discussions that surface key challenges, consider multiple perspectives, and clarify decision-making around strategic goals',
  },
  'Ideas to action': {
    heading: 'Ideas to Action',
    description:
      'Translate insights and inspiration into tangible next steps by helping participants co-create actionable plans they can implement immediately.',
  },
  'Reflect & synthesize': {
    heading: 'Reflect & Synthesize',
    description:
      'Encourage participants to pause, integrate insights, and identify key takeaways that reinforce learning and support overall program objectives.',
  },
  'Build alignment': {
    heading: 'Build Alignment',
    description:
      'Engage participants in collaborative processes that surface diverse viewpoints while building shared vision, commitment, and momentum.',
  },
  'Inspire creativity': {
    heading: 'Inspire Creativity',
    description:
      'Spark new ideas and bold questions through engaging experiences that challenge assumptions and encourage innovative approaches to future challenges.',
  },
  'Visualize insights': {
    heading: 'Visualize Insights',
    description:
      'Create collaborative, tactile data visualizations that capture participant contributions while crystallizing key themes and building shared understanding.',
  },
};

// Helper function to group products into rows according to a pattern.
const groupItems = (items: any[]) => {
  const groups: any[][] = [];
  let i = 0;
  // Adjust pattern as desired; here we cycle through 3, 3, 2 items per row.
  const pattern = [3, 3, 2];
  let patternIndex = 0;
  while (i < items.length) {
    const count = pattern[patternIndex];
    groups.push(items.slice(i, i + count));
    i += count;
    patternIndex = (patternIndex + 1) % pattern.length;
  }
  // Merge the last group if it contains only one item.
  if (groups.length > 1 && groups[groups.length - 1].length === 1) {
    const lastGroup = groups.pop();
    const prevGroup = groups.pop();
    const mergedGroup = prevGroup.concat(lastGroup);
    if (mergedGroup.length === 4) {
      groups.push(mergedGroup.slice(0, 2));
      groups.push(mergedGroup.slice(2));
    } else {
      groups.push(mergedGroup);
    }
  }
  // Special case: if exactly 3 items, group them in one row.
  if (items.length === 3) {
    return [items];
  }
  return groups;
};

const Products = () => {
  const [filteredProducts] = useState(allProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get('tag') || 'All Products';
  const isValidTag = TAGS.includes(initialTag) ? initialTag : 'All Products';
  const [selectedTag, setSelectedTag] = useState(isValidTag);

  // Ref for the tag content container
  const tagContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTag === 'All Products') {
      searchParams.delete('tag');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ tag: selectedTag }, { replace: true });
    }
  }, [selectedTag, searchParams, setSearchParams]);

  const displayedProducts =
    selectedTag === 'All Products'
      ? filteredProducts
      : filteredProducts.filter((prod) => prod.tags?.includes(selectedTag));

  // Combine displayed products with a CTA item.
  const items = [...displayedProducts, { id: 'cta', type: 'cta' }];

  // Group items into rows.
  const groupedItems =
    items.length === 4 ? [items.slice(0, 2), items.slice(2, 4)] : groupItems(items);

  // Inline Landing Moment: random shapes logic
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  useEffect(() => {
    const shuffledShapes = [...shapePool].sort(() => 0.5 - Math.random()).slice(0, 4);
    setSelectedShapes(shuffledShapes);
  }, []);

  return (
    <div className={styles.productPage}>
      
    <section className={styles.landingMoment}>
      <div className={styles.landingContent}>
        <h1>Make Your Event Unmissable</h1>
        <p>
          Projectory transforms half-listening event attendees into an engaged cohort of active, connected participants.
        </p>
      </div>
      <motion.div
        className={styles.shapesContainer}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{
          scale: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          },
        }}
      >
        {selectedShapes.map((shape, index) => (
          <img
            key={index}
            src={shape}
            alt={`Shape ${index + 1}`}
            className={`${styles.shape} ${styles[`shape${index + 1}`]}`}
          />
        ))}
      </motion.div>
    </section>

      <FeaturedCarousel />

      <div className={styles.productGridWrapper}>
        <div ref={tagContentRef} className={styles.tagContent}>
          <h2 className={styles.tagBarHeading}>
            {TAG_INFO[selectedTag]?.heading || 'All Products'}
          </h2>
          <p className={styles.tagBarSubheading}>
            {TAG_INFO[selectedTag]?.description || 'Select a category below to refine your search.'}
          </p>
        </div>

        <div className={styles.tagBarWrapper}>
          <div className={styles.tagBar}>
            {TAGS.map((tag) => (
              <button
                key={tag}
                className={tag === selectedTag ? styles.activeTag : styles.tagButton}
                onClick={() => {
                  setSelectedTag(tag);
                  tagContentRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productsGrid}>
          {groupedItems.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={styles.row}
              style={{ gridTemplateColumns: `repeat(${group.length}, 1fr)` }}
            >
              {group.map((item) =>
                item.type === 'cta' ? (
                  <GridCTA key="cta" />
                ) : (
                  <ProductCard key={item.id} product={item} />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <TealCTASection
        title="Don’t know where to start?"
        description="Use this simple tool to quickly match your event with the best mix of of experiences."
        buttonText="Product Finder"
        buttonLink="/get-started-form"
      />

      <FeaturedCaseStudy />
    </div>
  );
};

export default Products;