'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

interface StockModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StockModal({ product, isOpen, onClose }: StockModalProps) {
  const [email, setEmail] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('=== SUBSCRIPTION REQUEST ===');
    console.log('Product:', product?.name || 'Unknown');
    console.log('Product ID:', product?.id);
    console.log('Email:', email);
    console.log('Timestamp:', new Date().toISOString());
    console.log('============================');

    alert(`Thanks! We'll notify ${email} when ${product?.name || 'this product'} is back in stock.`);

    setEmail('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!product) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          id="subscribeModalClose"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-header">
          <h2>Get Notified</h2>
          <p>We&apos;ll email you when this item is back in stock</p>
        </div>
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            type="hidden"
            id="subscribeProductId"
            value={product.id}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Notify Me</button>
        </form>
      </div>
    </div>
  );
}
