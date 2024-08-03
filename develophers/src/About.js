import React from 'react'
import './About.css';
const About = () => {
  return (
    <div className = "about-container">
    <header>
        <div class="menu-bar">
            <button class="menu-button">☰ Menu</button>
            <div class="dropdown-content">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
        </div>
        <h1>ABOUT US</h1>
        <div class="search-bar">
            <input type="text" placeholder="Search..."/>
        </div>
    </header>
    <main class="about-us-container">
        <div class="about-us-box">
            <h2>Who Are We?</h2>
            <p>Our platform is focused on giving old gear new life. We understand the history that comes with every fabric crafted. Our goal is understanding the needs of athletes and conforming to them. This platform is not just about selling second hand equipment, but also providing resources but allowing our buyers to continue creating memorable moments.</p>
        </div>
        <div class="about-us-box">
            <h2>Our Mission</h2>
            <p>Our mission is to provide affordable and durable equipment to athletes of all sports levels. Our goal is to ensure that our consumers receive the best products at a reasonable price especially in today’s economy. </p>
        </div>
        <div class="about-us-box">
            <h2>Core Values</h2>
            <p>Our core values are to provide high quality products  that are not only affordable but reliable. We take pride in knowing that we have the understanding of transparency when it comes to the conditions of our equipment along with our sourcing. We empower athletes of all backgrounds to achieve their goals and beyond. </p>
        </div>
    </main>
 </div>
  )
}

export default About