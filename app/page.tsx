'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AmbassadorSection from '@/components/home/AmbassadorSection';
import SocialsSection from '@/components/home/SocialsSection';
import CartSidebar from '@/components/cart/CartSidebar';
import StockModal from '@/components/cart/StockModal';
import { useCart } from '@/hooks/useCart';
import { Product, Fighter, InstagramPost } from '@/lib/types';

// Product data
const products: Product[] = [
  {
    id: 1,
    name: 'Solaris Fight Shorts',
    price: 59.99,
    image: '/assets/images/product1.jpg',
    inStock: true,
    badge: 'New',
  },
  {
    id: 2,
    name: 'Compression Rashguard',
    price: 49.99,
    image: '/assets/images/product2.jpg',
    inStock: true,
    badge: null,
  },
  {
    id: 3,
    name: 'Elite BJJ Gi',
    price: 189.99,
    image: '/assets/images/product3.jpg',
    inStock: false,
    badge: 'Hot',
  },
  {
    id: 4,
    name: 'Training Gloves',
    price: 79.99,
    image: '/assets/images/product4.jpg',
    inStock: true,
    badge: null,
  },
  {
    id: 5,
    name: 'Muay Thai Shorts',
    price: 54.99,
    image: '/assets/images/product1.jpg',
    inStock: false,
    badge: null,
  },
  {
    id: 6,
    name: 'Performance Hoodie',
    price: 69.99,
    image: '/assets/images/product2.jpg',
    inStock: true,
    badge: 'New',
  },
];

// Fighter data
const fighters: Fighter[] = [
  {
    name: 'Marcus "The Phoenix" Silva',
    nickname: 'The Phoenix',
    discipline: 'BJJ Specialist',
    bio: 'Two-time world champion with over 15 years of experience. Known for explosive takedowns and relentless ground control.',
    image: '/assets/images/fighter1.jpg',
    record: '18-3',
    weight: 'Lightweight',
    social: {
      instagram: '#instagram',
      twitter: '#twitter',
    },
  },
  {
    name: 'Elena "La Tormenta" Rodriguez',
    nickname: 'La Tormenta',
    discipline: 'Muay Thai Striker',
    bio: 'Current featherweight champion with a devastating striking game. Trains in Thailand and brings authentic fight science to every match.',
    image: '/assets/images/fighter2.jpg',
    record: '22-1',
    weight: 'Featherweight',
    badge: 'Champion',
    social: {
      instagram: '#instagram',
      twitter: '#twitter',
    },
  },
  {
    name: 'James "Iron" Chen',
    nickname: 'Iron',
    discipline: 'MMA All-Rounder',
    bio: 'Well-rounded fighter with exceptional cardio and fight IQ. Known for pushing the pace and breaking opponents in later rounds.',
    image: '/assets/images/fighter3.jpg',
    record: '15-2',
    weight: 'Welterweight',
    social: {
      instagram: '#instagram',
      twitter: '#twitter',
    },
  },
  {
    name: 'Sofia "The Viking" Andersson',
    nickname: 'The Viking',
    discipline: 'Wrestler',
    bio: 'Undefeated prospect with Olympic-level wrestling credentials. Dominant grappling with rapidly improving striking arsenal.',
    image: '/assets/images/fighter4.jpg',
    record: '8-0',
    weight: 'Bantamweight',
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
        <FeaturedProducts
          products={products}
          onAddToCart={addToCart}
          onSubscribe={handleSubscribe}
        />
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
