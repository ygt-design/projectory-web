import type { products } from '../pages/ProductPages/productsData';

// The canonical product shape, derived from the data rather than hand-written.
export type Product = (typeof products)[number];
