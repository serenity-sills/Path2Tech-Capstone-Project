import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './About.css';

const About = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook to programmatically navigate

  const handleSearch = () => {
    const validTerms = ['basketball', 'Basketball', 'soccer', 'Soccer', 'Tennis', 'tennis', 'Soccer Ball', 'soccer ball', 'Tennis Racket', 'tennis racket'];
    if (validTerms.includes(searchTerm.trim())) {
      navigate('/products'); // Navigate to ProductPage
    } else {
      setShowPopup(true); // Show popup for invalid search terms
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="about-container">
      <header>
        <div className="menu-bar">
          <button className="menu-button">☰ Menu</button>
          <div className="dropdown-content">
            <Link to="/">Home</Link> {/* Correct link to Home page */}
            <Link to="/about">About</Link> {/* Correct link to About page */}
            <Link to="/products">Products</Link> {/* Correct link to Products page */}
            <Link to="/contact">Contact</Link> {/* Correct link to Contact page */}
            <Link to="/policy">Policies</Link> {/* Correct link to Policies page */}
          </div>
        </div>
        <h1>ABOUT US</h1>
        <div className="search-bar-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <main className="about-us-container">
        <div className="about-us-box">
          <h2>Who Are We?</h2>
          <p>Our platform is focused on giving old gear new life. We understand the history that comes with every fabric crafted. Our goal is understanding the needs of athletes and conforming to them. This platform is not just about selling second-hand equipment but also providing resources to allow our buyers to continue creating memorable moments.</p>
        </div>
        <div className="about-us-box">
          <h2>Our Mission</h2>
          <p>Our mission is to provide affordable and durable equipment to athletes of all sports levels. Our goal is to ensure that our consumers receive the best products at a reasonable price, especially in today’s economy.</p>
        </div>
        <div className="about-us-box">
          <h2>Core Values</h2>
          <p>Our core values are to provide high-quality products that are not only affordable but reliable. We take pride in knowing that we have the understanding of transparency when it comes to the conditions of our equipment along with our sourcing. We empower athletes of all backgrounds to achieve their goals and beyond.</p>
        </div>
      </main>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <span className="popup-close" onClick={handleClosePopup}>×</span>
            <p>Item not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
