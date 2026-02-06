import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import ComboConvoForm from './pages/ComboConvo/ComboConvoForm';
import LaserFocusForm from './pages/LaserFocus/LaserFocusForm';
import ScatterPlot from './pages/LaserFocus/ScatterPlot/ScatterPlot';
import VentingMachine from './pages/VentingMachine/VentingMachine';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import LiveChat from './components/LiveChat/LiveChat';
import CookieConsent from './components/CookieConsent/CookieConsent';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period or wait for window load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds to show off the animation

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <LikedProductsProvider>
      <Router>
        <ScrollToTop />
        <LiveChat />
        <CookieConsent />
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