import { Outlet } from 'react-router-dom'; // For rendering child routes
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Grid for reference */}
      <div className={styles.grid}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className={styles.gridItem}></div>
        ))}
      </div>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;