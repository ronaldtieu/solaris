/**
 * Solaris - Modern E-commerce Website
 * No Shade. No Mercy.
 */

// Theme Management - runs immediately to prevent flash
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Get saved theme or default to 'dark'
    const getSavedTheme = () => {
        const saved = localStorage.getItem('solaris-theme');
        if (saved) return saved;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    };

    // Apply theme to DOM
    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('solaris-theme', theme);
    };

    // Initialize theme
    const initialTheme = getSavedTheme();
    applyTheme(initialTheme);

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('solaris-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const slides = document.querySelectorAll('.carousel-slide');

    if (carouselTrack && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Button events
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Auto play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Start autoplay
        startAutoPlay();

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                startAutoPlay();
            });
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            }
        }
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards, blog cards, and fighter cards
    document.querySelectorAll('.product-card, .blog-card, .fighter-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            if (email) {
                // Here you would typically send the email to your server
                alert('Thank you for subscribing! No Shade. No Mercy.');
                newsletterForm.reset();
            }
        });
    }

    // ===== PRODUCT INVENTORY =====
    const products = [
        {
            id: 1,
            name: 'Solaris Fight Shorts',
            price: 59.99,
            image: 'assets/images/product1.jpg',
            inStock: true,
            badge: 'New'
        },
        {
            id: 2,
            name: 'Compression Rashguard',
            price: 49.99,
            image: 'assets/images/product2.jpg',
            inStock: true,
            badge: null
        },
        {
            id: 3,
            name: 'Elite BJJ Gi',
            price: 189.99,
            image: 'assets/images/product3.jpg',
            inStock: false,
            badge: 'Hot'
        },
        {
            id: 4,
            name: 'Training Gloves',
            price: 79.99,
            image: 'assets/images/product4.jpg',
            inStock: true,
            badge: null
        },
        {
            id: 5,
            name: 'Muay Thai Shorts',
            price: 54.99,
            image: 'assets/images/product1.jpg',
            inStock: false,
            badge: null
        },
        {
            id: 6,
            name: 'Performance Hoodie',
            price: 69.99,
            image: 'assets/images/product2.jpg',
            inStock: true,
            badge: 'New'
        }
    ];

    // ===== CART STATE =====
    let cart = JSON.parse(localStorage.getItem('solaris-cart')) || [];

    // ===== RENDER PRODUCTS =====
    function renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card ${!product.inStock ? 'product-out-of-stock' : ''}" data-product-id="${product.id}">
                ${product.badge ? `<div class="product-badge ${product.badge === 'Hot' ? 'hot' : ''}">${product.badge}</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${!product.inStock ? '<div class="out-of-stock-badge">Out of Stock</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
                <div class="product-actions">
                    ${product.inStock
                        ? `<button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>`
                        : `<button class="btn-subscribe" onclick="openSubscribeModal(${product.id})">Get Notified</button>`
                    }
                </div>
            </div>
        `).join('');

        // Re-attach scroll observer to new product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    renderProducts();

    // ===== CART FUNCTIONS =====
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || !product.inStock) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        saveCart();
        updateCartUI();
        openCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        renderCartItems();
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        saveCart();
        updateCartUI();
        renderCartItems();
    }

    function saveCart() {
        localStorage.setItem('solaris-cart', JSON.stringify(cart));
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function getCartCount() {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    function updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const count = getCartCount();

        if (cartCount) {
            cartCount.textContent = count;
            if (count > 0) {
                cartCount.classList.add('active');
            } else {
                cartCount.classList.remove('active');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
        }
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon"><i class="fas fa-shopping-cart"></i></div>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity">
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="cart-qty-value">${item.quantity}</span>
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        if (cartSidebar) cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        renderCartItems();
    }

    function closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    }

    // ===== SUBSCRIPTION MODAL =====
    function openSubscribeModal(productId) {
        const modal = document.getElementById('subscribeModal');
        const productIdInput = document.getElementById('subscribeProductId');
        if (modal) modal.classList.add('active');
        if (productIdInput) productIdInput.value = productId;
    }

    function closeSubscribeModal() {
        const modal = document.getElementById('subscribeModal');
        if (modal) modal.classList.remove('active');
    }

    // ===== EVENT LISTENERS =====
    // Cart trigger
    const cartTrigger = document.getElementById('cartTrigger');
    if (cartTrigger) {
        cartTrigger.addEventListener('click', openCart);
    }

    // Cart close
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // Cart overlay click
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Subscribe modal close
    const subscribeModalClose = document.getElementById('subscribeModalClose');
    if (subscribeModalClose) {
        subscribeModalClose.addEventListener('click', closeSubscribeModal);
    }

    // Subscribe modal overlay click
    const subscribeModal = document.getElementById('subscribeModal');
    if (subscribeModal) {
        subscribeModal.addEventListener('click', (e) => {
            if (e.target === subscribeModal) {
                closeSubscribeModal();
            }
        });
    }

    // Subscribe form
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('subscribeEmail').value;
            const productId = document.getElementById('subscribeProductId').value;
            const product = products.find(p => p.id === parseInt(productId));

            console.log('=== SUBSCRIPTION REQUEST ===');
            console.log('Product:', product ? product.name : 'Unknown');
            console.log('Product ID:', productId);
            console.log('Email:', email);
            console.log('Timestamp:', new Date().toISOString());
            console.log('============================');

            alert(`Thanks! We'll notify ${email} when ${product ? product.name : 'this product'} is back in stock.`);

            subscribeForm.reset();
            closeSubscribeModal();
        });
    }

    // Initialize cart UI
    updateCartUI();

    // Make functions globally available
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.openSubscribeModal = openSubscribeModal;
});
