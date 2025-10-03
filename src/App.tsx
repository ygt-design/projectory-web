import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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