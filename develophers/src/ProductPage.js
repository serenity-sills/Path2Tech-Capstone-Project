import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const ProductPage = ({ addToCart }) => {
  const [cartCount, setCartCount] = useState(0); // State to track cart item count
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartCount(cartCount + 1); // Increment cart item count

    // Show pop-up notification
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="product-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-main-image" />
            <div className="product-small-images">
              {product.smallImages.map((smallImage, index) => (
                <img
                  key={index}
                  src={smallImage}
                  alt=""
                  className="product-small-image"
                  style={{ width: '50px', height: '50px' }} // Set width and height for small images
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
      {/* Option 1: Pop-up Notification */}
      {showPopup && <div className="popup">Added to cart!</div>}

      {/* Option 2: Show Cart Item Count */}
      <Link to="/cart" className="view-cart-link">
        View Cart ({cartCount})
      </Link>
    </div>
  );
};

export default ProductPage;
