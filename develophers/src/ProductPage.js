import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const ProductPage = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      name: 'Soccer Ball',
      price: 35.00,
      image: 'https://via.placeholder.com/150',
      smallImages: [
        'https://via.placeholder.com/50',
        'https://via.placeholder.com/50'
      ],
      description: 'Placeholder description for Soccer Ball',
    },
    {
      id: 2,
      name: 'Basketball',
      price: 25.00,
      image: 'https://via.placeholder.com/150',
      smallImages: [
        'https://via.placeholder.com/50',
        'https://via.placeholder.com/50'
      ],
      description: 'Placeholder description for Basketball',
    },
    {
      id: 3,
      name: 'Tennis Racket',
      price: 30.00,
      image: 'https://via.placeholder.com/150',
      smallImages: [
        'https://via.placeholder.com/50',
        'https://via.placeholder.com/50'
      ],
      description: 'Placeholder description for Tennis Racket',
    }
  ];

  return (
    <div className="product-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-main-image" />
            <div className="product-small-images">
              {product.smallImages.map((smallImage, index) => (
                <img key={index} src={smallImage} alt="" className="product-small-image" />
              ))}
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Link to="/cart" className="view-cart-link">View Cart</Link>
    </div>
  );
};

export default ProductPage;



