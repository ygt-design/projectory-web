import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import WhoWeAre from './pages/WhoWeAre/WhoWeAre';
import CaseStudies from './pages/CaseStudies/CaseStudies';
import GetStarted from './pages/GetStarted/GetStarted';
import ProductTestPage from './pages/ProductTestPage/ProductTestPage'; // Import Mock Page
import CaseStudyPage from './pages/CaseStudyPages/CaseStudyPage'; // Import Mock Page
import Product from './pages/Products/Products';
import ProductPage from './pages/ProductPages/ProductPage';
import { LikedProductsProvider } from './context/LikedProductsContext';

const App = () => {
  return (
    <LikedProductsProvider>
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/products" element={<Product />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} /> {/* 🔹 New Route */}
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/product-test" element={<ProductTestPage />} /> 
        </Routes>
      </Layout>
    </Router>
    </LikedProductsProvider>
  );
};

export default App;