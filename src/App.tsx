import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/build-your-program" element={<BuildYourProgram />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;