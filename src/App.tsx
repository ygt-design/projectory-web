import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import WhoWeAre from './pages/WhoWeAre/WhoWeAre';
import CaseStudies from './pages/CaseStudies/CaseStudies';
import GetStarted from './pages/GetStarted/GetStarted';
import CaseStudyPage from './pages/CaseStudyPages/CaseStudyPage';
import Product from './pages/Products/Products';
import ProductPage from './pages/ProductPages/ProductPage';
import GetEstimatePage from './pages/GetEstimatePage/GetEstimatePage';
import GetStartedForm from './pages/GetStartedForm/GetStartedForm';
import { LikedProductsProvider } from './context/LikedProductsContext';
import ComboConvoForm from './pages/activities/ComboConvo/ComboConvoForm';
import ComboConvoAltForm from './pages/activities/ComboConvoAlt/ComboConvoAltForm';
import LaserFocusForm from './pages/activities/LaserFocus/LaserFocusForm';
import ScatterPlot from './pages/activities/LaserFocus/ScatterPlot/ScatterPlot';
import VentingMachine from './pages/activities/VentingMachine/VentingMachine';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const HERO_VIDEOS = [
  'https://res.cloudinary.com/dazzkestf/video/upload/q_auto/v1746457021/Flag_Finder_Website_IP_V4_leeta4.mp4',
  'https://res.cloudinary.com/dazzkestf/video/upload/q_auto/v1769443947/Projectory_LandingVideo_t4wkon.mp4',
  'https://res.cloudinary.com/dazzkestf/video/upload/q_auto/v1746457030/Align_by_Line_Website_IP_V5_Final_Colour_Pass_nzfmxp.mp4',
];

const App = () => {
  const [loading, setLoading] = useState(true);

  // Preload hero videos during loading screen so they're cached when Home mounts
  useEffect(() => {
    HERO_VIDEOS.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

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
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/get-estimate" element={<GetEstimatePage />} />
            <Route path="/get-started-form" element={<GetStartedForm />} />
            <Route path="/comboconvo" element={<ComboConvoForm />} />
            <Route path="/comboconvo-noemail" element={<ComboConvoAltForm />} />
            <Route path="/laserfocus" element={<LaserFocusForm />} />
            <Route path="/laserfocus/scatterplot" element={<ScatterPlot />} />
            <Route path="/ventingmachine" element={<VentingMachine />} />
          </Routes>
        </Layout>
      </Router>
    </LikedProductsProvider>
  );
};

export default App;