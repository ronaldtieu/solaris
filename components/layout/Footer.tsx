import Link from 'next/link';

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.querySelector('input[type="email"]') as HTMLInputElement;

    if (email?.value) {
      alert('Thank you for subscribing! No Shade. No Mercy.');
      form.reset();
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li>
                <a href="/#mens">Men&apos;s</a>
              </li>
              <li>
                <a href="/#womens">Women&apos;s</a>
              </li>
              <li>
                <a href="/#kids">Kids</a>
              </li>
              <li>
                <a href="/#collections">Collections</a>
              </li>
              <li>
                <a href="/#accessories">Accessories</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/#about">About Us</a>
              </li>
              <li>
                <a href="/#ambassadors">Ambassadors</a>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a href="/#careers">Careers</a>
              </li>
            </ul>
            <p className="footer-tagline">
              From the early mornings, to the dead of night, Solaris to keep you geared for your fight.
            </p>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/#faq">FAQ</a>
              </li>
              <li>
                <a href="/#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="/#returns">Returns</a>
              </li>
              <li>
                <a href="/#size-guide">Size Guide</a>
              </li>
              <li>
                <a href="/#care">Care Instructions</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Newsletter</h4>
            <p>Subscribe for exclusive offers and latest updates</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social-icons">
              <a href="#instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#youtube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Solaris. Strong Light, Controlled Fights All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
