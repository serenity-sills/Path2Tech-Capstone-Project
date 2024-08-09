import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = ({ addToCart }) => {
  // State to manage the menu's open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to manage the popup visibility
  const [showPopup, setShowPopup] = useState(false);
  
  // State to track the number of items in the cart
  const [cartCount, setCartCount] = useState(0);

  // Array of products to display
  const products = [
    {
      id: 1,
      name: 'Soccer Ball',
      price: 35.00,
      image: '/ProductImages/MainSoccerBallimage.jpg',
      smallImages: [
        '/ProductImages/SmallSoccerBallimage1.jpg',
        '/ProductImages/SmallSoccerBallimage2.jpg',
      ],
      description: 'Premium quality soccer ball designed for professional play. Made with durable synthetic leather, it offers excellent control and accuracy. Perfect for training or competitive matches.',
    },
    {
      id: 2,
      name: 'Basketball',
      price: 25.00,
      image: '/ProductImages/MainBasketBallimage.jpg',
      smallImages: [
        '/ProductImages/SmallBasketBallimage1.jpg',
        '/ProductImages/SmallBasketBallimage2.jpg',
      ],
      description: 'High-performance basketball with a textured surface for enhanced grip. Constructed from durable rubber, it’s ideal for indoor and outdoor games. Comes in official size and weight.',
    },
    {
      id: 3,
      name: 'Tennis Racket',
      price: 30.00,
      image: '/ProductImages/MainTennisRacketImage.jpg',
      smallImages: [
        '/ProductImages/SmallTennisRacketImage1.jpg',
        '/ProductImages/SmallTennisRacketImage2.jpg',
      ],
      description: 'Lightweight tennis racket featuring a graphite frame for improved strength and control. Equipped with a comfortable grip and a large sweet spot, it’s designed for players of all skill levels.',
    },
  ];

  // Toggle menu open/closed state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle adding a product to the cart and show popup
  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    setCartCount(cartCount + 1); // Update cart count
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

  // Animate elements on load
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('slide-in');
      }, index * 300); // Delay each element's animation
    });
  }, []);

  return (
    <div className="product-page-wrapper">
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="menu-container">
            <div className="menu-bar">
              {/* Button to toggle menu */}
              <button className="menu-button" onClick={toggleMenu}>☰ Menu</button>
              {/* Dropdown menu links */}
              <div className={`dropdown-content ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/about" onClick={toggleMenu}>About</Link>
                <Link to="/products" onClick={toggleMenu}>Products</Link>
                <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                <Link to="/policy" onClick={toggleMenu}>Policies</Link>
              </div>
            </div>
          </div>
          {/* Link to view cart with item count */}
          <Link to="/cart" className="view-cart-link">
            View Cart ({cartCount})
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="product-page animate-on-load">
        <h2 className="product-page-title">Products</h2>
        <div className="product-list animate-on-load">
          {/* Render each product */}
          {products.map((product) => (
            <div key={product.id} className="product-item animate-on-load">
              <img src={product.image} alt={product.name} className="product-main-image" />
              <div className="product-small-images">
                {product.smallImages.map((smallImage, index) => (
                  <img
                    key={index}
                    src={smallImage}
                    alt=""
                    className="product-small-image"
                  />
                ))}
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        {/* Popup to show item added to cart */}
        {showPopup && <div className="popup">Added to cart!</div>}
      </div>
    </div>
  );
};

export default ProductPage;
