// 📂 src/pages/GetEstimatePage/GetEstimatePage.tsx

import React, { useState, useEffect } from 'react';
import { useLikedProducts } from '../../context/LikedProductsContext';
import { Link } from 'react-router-dom';
import { products } from '../../pages/ProductPages/productsData';
import styles from './GetEstimatePage.module.css';

const GetEstimatePage: React.FC = () => {
  const { likedProducts, toggleLike } = useLikedProducts();
  const [formData, setFormData] = useState({
    access_key: '44ef0aff-fcad-4d61-9fc1-d8ec09a96543', // Provided access key
    name: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    message: '',
    selectedProducts: likedProducts.join(', '), 
  });
  const [status, setStatus] = useState('');

  // Update selectedProducts field whenever likedProducts changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: likedProducts.join(', ')
    }));
  }, [likedProducts]);

  // Handle changes on visible form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the form data using Web3Forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        // Reset only the visible fields (keeping access key and selectedProducts)
        setFormData((prev) => ({
          ...prev,
          name: '',
          email: '',
          eventDate: '',
          eventLocation: '',
          eventTitle: '',
          message: '',
        }));
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message. Please try again.');
    }
  };

  // Retrieve the full product objects for the liked items (likedProducts is assumed to be an array of product IDs)
  const likedItems = products.filter((p) => likedProducts.includes(p.id));

  return (
    <section className={styles.getEstimateWrapper}>
      {/* Left Column: Display Liked Products */}
      <div className={styles.leftColumn}>
        <h2>Your Selected Products:</h2>
        <div className={styles.likedItemsWrapper}>
        {likedItems.length === 0 ? (
          <p>No products selected</p>
        ) : (
          likedItems.map((prod) => (
            <div key={prod.id} className={styles.likedItem}>
              <div className={styles.itemWrapper}>
                <div className={styles.itemImageWrapper}>
                  <Link to={`/products/${prod.id}`}>
                    <img src={prod.thumbnail} alt={prod.name} />
                  </Link>
                </div>
                <div className={styles.itemTextWrapper}>
                  <Link to={`/products/${prod.id}`}>
                    <h4
                      className={styles.title}
                      style={{ color: prod.categoryColor || '#ffffff' }}
                    >
                      {prod.category} <strong>{prod.categoryHighlight}</strong>
                    </h4>
                    <p>{prod.tagline}</p>
                  </Link>
                  <button
                    className={styles.removeButton}
                    onClick={() => toggleLike(prod.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      </div>

      {/* Right Column: Estimate Form */}
      <div className={styles.rightColumn}>
        <h2>Get An Estimate</h2>
        
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit nulla adipisci 
          incidunt interdum tellus cu.
        </p>

        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.estimateForm}>
            {/* Hidden fields for Web3Forms */}
            <input 
              type="hidden" 
              name="access_key" 
              value={formData.access_key}
              readOnly 
            />
            <input
              type="hidden"
              name="selectedProducts"
              value={formData.selectedProducts}
              readOnly
            />

            {/* Visible fields */}
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Event Date
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Event Location
              <input
                type="text"
                name="eventLocation"
                placeholder="Location"
                value={formData.eventLocation}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Message
              <textarea
                name="message"
                placeholder="Please type your message..."
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              Get An Estimate
            </button>
            {status && <p className={styles.statusMessage}>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetEstimatePage;