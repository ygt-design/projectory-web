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
      'Explore our growing catalogue of products and filter by format, session duration, and more.',
  },
  'Networking': {
    heading: 'Networking',
    description:
      'Foster meaningful connections through interactive, innovative experiences.',
  },
  'Peer learning': {
    heading: 'Peer Learning',
    description:
      'Empower participants to share insights and grow collaboratively.',
  },
  'Explore priorities': {
    heading: 'Explore Priorities',
    description:
      'Focus on what truly matters by aligning stakeholders on key objectives.',
  },
  'Ideas to action': {
    heading: 'Ideas to Action',
    description:
      'Turn brainstorming into tangible next steps and lasting impact.',
  },
  'Reflect & synthesize': {
    heading: 'Reflect & Synthesize',
    description:
      'Create moments of introspection that deepen understanding and engagement.',
  },
  'Build alignment': {
    heading: 'Build Alignment',
    description:
      'Unite teams around shared goals for a more cohesive, productive outcome.',
  },
  'Inspire creativity': {
    heading: 'Inspire Creativity',
    description:
      'Spark innovation and fresh thinking with immersive experiences.',
  },
  'Visualize insights': {
    heading: 'Visualize Insights',
    description:
      'Make data come alive with interactive, eye-catching displays.',
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
              Projectory turns any briefly-captivated audience into an engaged community of leaders who can’t wait to participate.
            </p>
          </div>
          <div className={styles.shapesContainer}>
            {selectedShapes.map((shape, index) => (
              <motion.img
                key={index}
                src={shape}
                alt={`Shape ${index + 1}`}
                className={`${styles.shape} ${styles[`shape${index + 1}`]}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            ))}
            </div>
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
        description="Find experiences tailored to your event by using our Program Builder."
        buttonText="Build Your Program"
        buttonLink="/build-your-program"
      />

      <FeaturedCaseStudy />
    </div>
  );
};

export default Products;