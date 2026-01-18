'use client';

import { useEffect } from 'react';
import { CartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface CartSidebarProps {
  cart: CartItem[];
  cartTotal: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, change: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartSidebar({
  cart,
  cartTotal,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
}: CartSidebarProps) {
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
        id="cartOverlay"
      ></div>

      <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`} id="cartSidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-items" id="cartItems">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatCurrency(item.price)}</div>
                  <div className="cart-item-controls">
                    <div className="cart-item-quantity">
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemove(item.id)}
                      aria-label="Remove item"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span className="total-amount">{formatCurrency(cartTotal)}</span>
          </div>
          <button className="cart-checkout">Checkout</button>
        </div>
      </aside>
    </>
  );
}
