import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '3rem 0 4rem', backgroundColor: 'var(--warm-ivory)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h1>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--white)', border: '1px solid var(--soft-beige)' }}>
            <p>Thank you for reaching out! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', padding: '2rem', border: '1px solid var(--soft-beige)' }}>
            <input type="text" placeholder="Name" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid var(--soft-beige)' }} />
            <input type="email" placeholder="Email" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid var(--soft-beige)' }} />
            <textarea placeholder="Message" required rows="5" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid var(--soft-beige)', fontFamily: 'inherit' }}></textarea>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
