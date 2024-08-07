// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Create the container for the about us section
    const container = document.createElement('div');
    container.className = 'about-us-container';

    // Create the box element
    const box = document.createElement('div');
    box.className = 'about-us-box';

    // Create and append the title
    const title = document.createElement('h2');
    title.textContent = 'About Us';
    box.appendChild(title);

    // Create and append the paragraphs
    const paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Welcome to our company! We are dedicated to providing the best service to our customers.';
    box.appendChild(paragraph1);

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = 'Our team is composed of experienced professionals who are passionate about what they do.';
    box.appendChild(paragraph2);

    // Append the box to the container
    container.appendChild(box);

    // Append the container to the body or a specific element
    document.getElementById('about-us-container').appendChild(container);
});
