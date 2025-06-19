import { useState } from 'react';
import styles from './ContactForm.module.css';

import shape1 from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_3.svg';
import shape2 from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.png';
import shape3 from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_1.png';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    access_key: '1c3fa95b-e42f-4bc0-b339-025a18bc51eb'
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          access_key: formData.access_key,
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });
      const result = await response.json();
      console.log('FormSubmit response:', result);
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', access_key: formData.access_key });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <section className={styles.contactWrapper}>
      <h2>Contact Us</h2>
      <p>Have a specific question? Enter your contact info, and we’ll send a quick orientation on how to get started.</p>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.inputGroup}>
          <input type="text" name="name" placeholder="First & Last Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <textarea name="message" placeholder="Tell us about your event!" value={formData.message} onChange={handleChange} />

        <button type="submit">Get Started</button>

        {status && <p className={styles.statusMessage}>{status}</p>}
      </form>

      <img src={shape1} alt="" className={`${styles.shape} ${styles.shape1}`} />
      <img src={shape2} alt="" className={`${styles.shape} ${styles.shape2}`} />
      <img src={shape3} alt="" className={`${styles.shape} ${styles.shape3}`} />
    </section>
  );
};

export default ContactForm;