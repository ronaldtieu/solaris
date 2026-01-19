'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import AmbassadorSection from '@/components/home/AmbassadorSection';
import SocialsSection from '@/components/home/SocialsSection';
import CartSidebar from '@/components/cart/CartSidebar';
import StockModal from '@/components/cart/StockModal';
import { useCart } from '@/hooks/useCart';
import { Product, Fighter, InstagramPost } from '@/lib/types';

// Empty product array - products are on individual pages
const products: Product[] = [];

// Fighter data
const fighters: Fighter[] = [
  {
    name: 'Brady Huang',
    nickname: 'The Kung Fu Warrior',
    discipline: 'Professional MMA Fighter',
    bio: 'Featherweight contender with exceptional striking and grappling skills. Known for his dynamic fighting style and devastating finishes.',
    image: 'https://iviplovyflonaawlbpgb.supabase.co/storage/v1/object/public/solaris-bucket/brady.jpg',
    record: '15-4-0',
    weight: 'Featherweight',
    social: {
      instagram: '#instagram',
      twitter: '#twitter',
    },
  },
  {
    name: 'Bilal Alakai Hasan',
    nickname: 'The Indoninja',
    discipline: 'Professional MMA Fighter',
    bio: 'Undefeated flyweight phenom with lightning-fast striking and elite grappling. A rising star in the MMA world.',
    image: 'https://iviplovyflonaawlbpgb.supabase.co/storage/v1/object/public/solaris-bucket/bilal.jpg',
    record: '8-0-0',
    weight: 'Flyweight',
    badge: 'Rising Star',
    social: {
      instagram: '#instagram',
      twitter: '#twitter',
    },
  },
];

// Instagram posts data
const instagramPosts: InstagramPost[] = [
  {
    image: '/assets/images/instagram1.jpg',
    likes: '1.2k',
    comments: '48',
  },
  {
    image: '/assets/images/instagram2.jpg',
    likes: '986',
    comments: '32',
  },
  {
    image: '/assets/images/instagram3.jpg',
    likes: '2.1k',
    comments: '89',
  },
  {
    image: '/assets/images/instagram4.jpg',
    likes: '1.5k',
    comments: '64',
  },
  {
    image: '/assets/images/instagram5.jpg',
    likes: '1.8k',
    comments: '71',
  },
  {
    image: '/assets/images/instagram6.jpg',
    likes: '2.4k',
    comments: '103',
  },
];

export default function Home() {
  const [subscribeProductId, setSubscribeProductId] = useState<number | null>(null);
  const subscribeProduct = products.find(p => p.id === subscribeProductId) || null;

  const {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    openCart,
    closeCart,
  } = useCart(products);

  // Update cart count in navbar
  useEffect(() => {
    const cartCount = document.querySelector('[data-cart-count]') as HTMLElement;
    if (cartCount) {
      const count = getCartCount();
      cartCount.textContent = count.toString();
      if (count > 0) {
        cartCount.classList.add('active');
      } else {
        cartCount.classList.remove('active');
      }
    }
  }, [cart, getCartCount]);

  // Attach cart trigger button
  useEffect(() => {
    const cartTrigger = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
    if (cartTrigger) {
      cartTrigger.addEventListener('click', openCart);
      return () => {
        cartTrigger.removeEventListener('click', openCart);
      };
    }
  }, [openCart]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href !== '#' && href !== '') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleSubscribe = (productId: number) => {
    setSubscribeProductId(productId);
  };

  const handleSubscribeModalClose = () => {
    setSubscribeProductId(null);
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <AmbassadorSection fighters={fighters} />
        <SocialsSection posts={instagramPosts} />
      </main>
      <Footer />
      <CartSidebar
        cart={cart}
        cartTotal={getCartTotal()}
        isOpen={isCartOpen}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <StockModal
        product={subscribeProduct}
        isOpen={subscribeProductId !== null}
        onClose={handleSubscribeModalClose}
      />
    </>
  );
}
