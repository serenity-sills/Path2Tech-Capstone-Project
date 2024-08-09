import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './policy.css';
import logo from './assets/logo.png'; 


const Policy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <div className="menu-container">
          <div className="menu-bar">
            <button className="menu-button" onClick={toggleMenu}>☰ Menu</button>
            <div className={`dropdown-content ${isMenuOpen ? 'open' : ''}`}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/about" onClick={toggleMenu}>About Us</Link>
              <Link to="/products" onClick={toggleMenu}>Products</Link>
              <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
              <Link to="/policy" onClick={toggleMenu}>Policies</Link>
            </div>
          </div>
          <img src={logo} className="logo" alt="Logo" /> {/* Use the logo */}
        </div>
      </header>

      <main>
        <h2>Shipping</h2>
        <p>
          DevelopHer's offers USPS Priority mail shipping. Once an order is placed processing will occur within 2-5 business days. Please allow 2-10 business days from the time of purchase for your order to be shipped and delivered. Shipping time excludes weekends and holidays.
          It is the responsibility of the buyer to provide the correct shipping address. Once an order is shipped out and tracking information is provided we can no longer modify the address. Once an order is shipped the buyer assumes all responsibility for tracking their package. We want to note that the time on USPS website is a shipping estimate. This is the carriers best guess at when the order will arrive. We can not guarantee that items will be shipped on estimated date.
        </p>
        <p>
          Domestic Shipping - All domestic orders are shipped via USPS.
          We ask that you allow 2-10 business days for goods to be shipped and delivered. If an order is placed on a weekend or holiday, processing will take place on the next business day or within 48 hrs.
          International Shipping- All international orders are shipped via USPS. We ask that you allow 2-7 business days for goods to be processed, and additional two weeks for your order to be shipped and delivered. International delivery time is dependent on the package(s) final destination. If an order is placed on a weekend or holiday, processing will take place on the next business day or within 48 hrs. International shipping may be subjected to additional import and duty fees. Please be advised that it is the responsibility of the buyer to track their package(s).
          Unclaimed mail: If an item is returned to us because it is unclaimed, the buyer assumes responsibility for return shipping costs, which will be subtracted from any refund owed.
          If a package is marked as "undeliverable" and/or "unclaimed" and is returned to DevelopHer's we will process the customer a full refund, minus the cost of shipping. We will not resend the package.
        </p>
        <p>
          Customs Duty and import VAT:
          Please be advised when ordering goods for your personal use, it’s imperative to be aware that tax and duty may be charged on top of the purchase price at the point of delivery. What’s due depends on the type of goods and where they come from.
          NOTE: We want your package(s) to find you well. Once packages leave the office of DevelopHer's unfortunately we are no longer responsible. Once a package is labeled "delivered" DevelopHer will not process a refund for that package. Please ensure that your shipping address is reliable & correct. Should you make a mistake when entering shipping information contact us ASAP and we will modify your info prior to confirming that your item has shipped.
        </p>
        <h2>Return Policy</h2>
        <p>
          Returns are granted to our new and unused items. Our policy lasts 14 days. If 14 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
        </p>
        <p>
          To be eligible for a return, your item must be unused, unworn, untampered with and free of any damage(s). It must also be in the original packaging. DevelopHer's LLC reserves the right to deny returns or exchanges that do not meet this criteria.
        </p>
        <h4>Refunds</h4>
        <p>
          Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          If you are approved, then your refund will be processed, and a credit will automatically be applied to your original method of payment, within a certain amount of days depending on your financial institution.
        </p>
        <h4>Late or missing refunds</h4>
        <p>
          Please contact your financial institution. There is often some processing time before your refund is officially posted. If you still have not received your refund yet, please contact us at returns@DevelopHer.co
        </p>
        <h4>Pre-Loved Items</h4>
        <p>
          All sale items are final and can not be refunded, exchanged or returned.
        </p>
        <h4>Exchanges</h4>
        <p>
          Due to the nature of our work DevelopHer's does not process exchanges
        </p>
      </main>
    </>
  );
};

export default Policy;
