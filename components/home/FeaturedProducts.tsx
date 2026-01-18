'use client';

import { useEffect, useRef } from 'react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  onSubscribe: (productId: number) => void;
}

export default function FeaturedProducts({
  products,
  onAddToCart,
  onSubscribe,
}: FeaturedProductsProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const cardEl = card as HTMLElement;
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateY(30px)';
      cardEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observerRef.current?.observe(cardEl);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [products]);

  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">Featured Collection</h2>

        <div className="products-grid" id="productsGrid">
          {products.map(product => (
            <div
              key={product.id}
              className={`product-card ${!product.inStock ? 'product-out-of-stock' : ''}`}
              data-product-id={product.id}
            >
              {product.badge && (
                <div className={`product-badge ${product.badge === 'Hot' ? 'hot' : ''}`}>
                  {product.badge}
                </div>
              )}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{formatCurrency(product.price)}</p>
              </div>
              <div className="product-actions">
                {product.inStock ? (
                  <button
                    className="btn-add-to-cart"
                    onClick={() => onAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn-subscribe"
                    onClick={() => onSubscribe(product.id)}
                  >
                    Get Notified
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
