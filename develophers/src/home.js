import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure this file includes your updated styling
import logo from './assets/logo.png';
import backgroundImage from './assets/IMG_9023.jpg';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search functionality
  const handleSearch = () => {
    const validSearchTerms = [
      'Basketball', 'Soccer', 'Soccer Ball', 'Tennis', 'Tennis Racket'
    ];
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    if (validSearchTerms.some(term => term.toLowerCase() === normalizedSearchTerm)) {
      navigate('/products');
    } else {
      setShowPopup(true);
    }
  };

  // Close popup
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="home-page-wrapper">
      <nav>
        <div className="nav-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" height="400" width="400" />
          </div>

          <div className="menu-container">
            <div className="menu-bar">
              <button className="menu-button" onClick={toggleMenu}>☰ Menu</button>
              <div className={`dropdown-content ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/about" onClick={toggleMenu}>About</Link>
                <Link to="/products" onClick={toggleMenu}>Products</Link>
                <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                <Link to="/policy" onClick={toggleMenu}>Policies</Link>
              </div>
            </div>
          </div>

          <div className="search-bar-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </nav>

      {/* Slogan Section */}
      <div className="slogan-container">
        <p className="slogan-text">Giving old gear new life.</p>
      </div>

      <img src={backgroundImage} className="imgMain" alt="Background" />

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <span className="popup-close" onClick={handlePopupClose}>&times;</span>
            <p>This item is currently unavailable</p>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-content">
          <div className="social-media-icons">
            <img src="/icons/facebook.png" alt="Facebook" />
            <img src="/icons/instagram.png" alt="Instagram" />
            <img src="/icons/pinterest.png" alt="Pinterest" />
            <img src="/icons/tiktok.png" alt="TikTok" />
          </div>

          <div className="footer-bottom">
            <p>Copyright &copy; 2024; Designed by: <span className="designer">DevelopHer's</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
