
import React from 'react';
import "./home.css";

// External resources should be added in the public/index.html or handled via other React mechanisms
const Home = () => {
  return (
    <div>
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
      />
      
      {/* Font Awesome */}
      <script
        src="https://kit.fontawesome.com/c6cf9b3869.js"
        crossorigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      
      {/* Bootstrap */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"
      ></script>
      
      {/* Logo */}
      <div>
        <img src="logo.png" height="400" width="400" alt="Logo" />
      </div>
      
      {/* Search Bar */}
      <form className="row">
        <input
          type="text"
          id="input-box"
          placeholder="Choose your item"
          autoComplete="off"
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </form>
      
      {/* Background Image */}
      <div>
        <img src="IMG_9023.jpg" className="imgMain" alt="Background" />
      </div>
      
      {/* Social Media Icons */}
      <div>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-pinterest-p"></i>
        <i className="fa-brands fa-tiktok"></i>
        <i className="fa-brands fa-facebook"></i>
      </div>
      
      {/* Footer Navigation */}
      <div className="footerNav">
        <ul>
          <li>
            <nav className="footer">
              <ul>
                <li className="nav-item">Home</li>
                <li className="nav-item">About Us</li>
                <li className="nav-item">Products</li>
                <li className="nav-item">Contact Us</li>
              </ul>
            </nav>
          </li>
          <li className="footerBottom">
            <p>
              Copyright &copy; 2024; Designed by: <span className="designer">DevelopHer's</span>
            </p>
          </li>
        </ul>
      </div>
      
      {/* Navbar */}
      <nav className="navbar fixed-top navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;
