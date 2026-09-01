// ============================================================
// SOLE — Main JavaScript
// ============================================================

(function () {
  'use strict';

  // ---- UTILITY ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');

  // ---- ANNOUNCEMENT BAR ----
  const announcementClose = $('.announcement-close');
  const announcementBar = $('.announcement-bar');
  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', () => {
      announcementBar.style.display = 'none';
    });
  }

  // ---- STICKY HEADER ----
  const header = $('#header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- MOBILE MENU ----
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    // Close on link click
    $$('.nav__link', navMenu).forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- SEARCH ----
  const searchToggle = $('#searchToggle');
  const searchBar = $('#searchBar');
  const searchClose = $('#searchClose');
  const searchInput = $('#searchInput');

  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active')) searchInput.focus();
    });
  }
  if (searchClose) searchClose.addEventListener('click', () => searchBar.classList.remove('active'));
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
      }
    });
  }
  const searchSubmit = $('#searchSubmit');
  if (searchSubmit) {
    searchSubmit.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
    });
  }

  // ---- CART STATE ----
  let cart = JSON.parse(localStorage.getItem('sole_cart') || '[]');

  function saveCart() { localStorage.setItem('sole_cart', JSON.stringify(cart)); }

  function addToCart(productId, size) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    if (!size) { showToast('Please select a size first', 'error'); return; }
    const key = `${productId}-${size}`;
    const existing = cart.find(i => i.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ key, id: productId, size, qty: 1 });
    }
    saveCart();
    renderCart();
    openCart();
    showToast(`${product.name} added to bag ✓`, 'success');
  }

  function removeFromCart(key) {
    cart = cart.filter(i => i.key !== key);
    saveCart();
    renderCart();
  }

  function updateQty(key, delta) {
    const item = cart.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(key);
    else { saveCart(); renderCart(); }
  }

  function renderCart() {
    const cartItems = $('#cartItems');
    const cartEmpty = $('#cartEmpty');
    const cartFooter = $('#cartFooter');
    const cartCount = $('#cartCount');
    const cartItemCount = $('#cartItemCount');
    const cartSubtotal = $('#cartSubtotal');

    if (!cartItems) return;

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => {
      const p = PRODUCTS.find(pr => pr.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);

    if (cartCount) cartCount.textContent = totalQty;
    if (cartItemCount) cartItemCount.textContent = `(${totalQty})`;
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(total);

    if (cart.length === 0) {
      if (cartEmpty) cartEmpty.style.display = '';
      if (cartFooter) cartFooter.style.display = 'none';
      // Remove previous items
      $$('.cart-item', cartItems).forEach(el => el.remove());
      return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'flex';

    $$('.cart-item', cartItems).forEach(el => el.remove());
    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="cart-item__info">
          <div class="cart-item__name">${product.name}</div>
          <div class="cart-item__meta">Size: ${item.size} &nbsp;|&nbsp; ${product.category}</div>
          <div class="cart-item__controls">
            <button class="qty-btn" data-key="${item.key}" data-delta="-1">−</button>
            <span class="cart-item__qty">${item.qty}</span>
            <button class="qty-btn" data-key="${item.key}" data-delta="1">+</button>
            <span class="cart-item__price">${formatPrice(product.price * item.qty)}</span>
            <button class="cart-item__remove" data-key="${item.key}" aria-label="Remove"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
      cartItems.appendChild(el);
    });

    // Event listeners on new items
    $$('.qty-btn', cartItems).forEach(btn => {
      btn.addEventListener('click', () => updateQty(btn.dataset.key, parseInt(btn.dataset.delta)));
    });
    $$('.cart-item__remove', cartItems).forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
    });
  }

  function openCart() {
    const cartSidebar = $('#cartSidebar');
    const cartOverlay = $('#cartOverlay');
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const cartSidebar = $('#cartSidebar');
    const cartOverlay = $('#cartOverlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  const cartToggle = $('#cartToggle');
  const cartClose = $('#cartClose');
  const cartOverlay = $('#cartOverlay');
  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Initialise
  renderCart();

  // ---- PRODUCT CARD RENDERER ----
  function createProductCard(product) {
    const stars = generateStars(product.rating);
    const badgeHTML = product.badge ? `<span class="badge badge--${product.badge}">${product.badge}</span>` : '';
    const priceHTML = product.sale && product.originalPrice
      ? `<span class="price price--sale">${formatPrice(product.price)}</span><span class="price price--old">${formatPrice(product.originalPrice)}</span>`
      : `<span class="price">${formatPrice(product.price)}</span>`;
    const sizesHTML = product.sizes.slice(0, 5).map(s =>
      `<span class="size-chip" data-size="${s}">${s}</span>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.dataset.category = product.category;
    card.dataset.id = product.id;
    card.innerHTML = `
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-card__badges">${badgeHTML}</div>
        <div class="product-card__actions">
          <button class="wishlist-btn" data-id="${product.id}" aria-label="Wishlist"><i class="far fa-heart"></i></button>
          <button class="quick-view-btn" data-id="${product.id}" aria-label="Quick view"><i class="fas fa-eye"></i></button>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__cat">${product.category}</div>
        <div class="product-card__name">${product.name}</div>
        <div class="product-card__rating">
          <span class="stars">${stars}</span>
          <span>${product.rating} (${product.reviews})</span>
        </div>
        <div class="product-card__price">${priceHTML}</div>
        <div class="product-card__sizes">${sizesHTML}</div>
        <button class="btn btn--primary btn--sm btn--full add-to-cart-btn" data-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Add to Bag
        </button>
      </div>
    `;

    // Size selection
    let selectedSize = null;
    $$('.size-chip', card).forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.size-chip', card).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedSize = parseInt(chip.dataset.size);
      });
    });

    // Add to cart
    $('.add-to-cart-btn', card).addEventListener('click', () => {
      addToCart(product.id, selectedSize);
    });

    // Wishlist
    $('.wishlist-btn', card).addEventListener('click', () => {
      const btn = card.querySelector('.wishlist-btn');
      btn.classList.toggle('wishlisted');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('wishlisted')) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#e53e3e';
        showToast('Added to wishlist ♥', 'success');
      } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
        showToast('Removed from wishlist', '');
      }
    });

    // Quick view
    $('.quick-view-btn', card).addEventListener('click', () => {
      showQuickView(product);
    });

    return card;
  }

  function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
    if (half) html += '<i class="fas fa-star-half-alt"></i>';
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++) html += '<i class="far fa-star"></i>';
    return html;
  }

  // ---- FEATURED GRID ----
  const featuredGrid = $('#featuredGrid');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    const featured = PRODUCTS.slice(0, 8);
    featured.forEach((p, i) => {
      const card = createProductCard(p);
      card.classList.add(`fade-in-delay-${(i % 4) + 1}`);
      featuredGrid.appendChild(card);
    });
  }

  // ---- ARRIVALS GRID ----
  const arrivalsGrid = $('#arrivalsGrid');
  if (arrivalsGrid && typeof PRODUCTS !== 'undefined') {
    PRODUCTS.filter(p => p.new).forEach(p => {
      arrivalsGrid.appendChild(createProductCard(p));
    });
  }

  // ---- PRODUCT FILTERS (Homepage) ----
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('.product-card', featuredGrid).forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ---- HERO SLIDER ----
  const slides = $$('.hero__slide');
  const dots = $$('.hero__dot');
  let current = 0;
  let autoSlide;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  if (slides.length > 1) {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
    const prevBtn = $('.hero__prev');
    const nextBtn = $('.hero__next');
    if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(current - 1); autoSlide = setInterval(() => goToSlide(current + 1), 5000); });
    if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(current + 1); autoSlide = setInterval(() => goToSlide(current + 1), 5000); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(autoSlide); goToSlide(i); autoSlide = setInterval(() => goToSlide(current + 1), 5000); }));
  }

  // ---- COUNTER ANIMATION ----
  function animateCounters() {
    $$('[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let count = 0;
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = Math.floor(count).toLocaleString('en-IN') + (target > 100 ? '+' : '');
        if (count >= target) clearInterval(timer);
      }, 16);
    });
  }

  // ---- INTERSECTION OBSERVER ----
  let countersAnimated = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters if stats section - guard with flag so it only fires once
        if (entry.target.classList.contains('stats') && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          io.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.fade-in, .stats').forEach(el => io.observe(el));

  // ---- BACK TO TOP ----
  const backToTop = $('#backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- TOAST ----
  function showToast(message, type = '') {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ---- NEWSLETTER ----
  const newsletterForm = $('#newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Thanks for subscribing! 🎉', 'success');
        input.value = '';
      }
    });
  }

  // ---- QUICK VIEW MODAL ----
  function showQuickView(product) {
    const existing = $('#quickViewModal');
    if (existing) existing.remove();

    const stars = generateStars(product.rating);
    const priceHTML = product.sale && product.originalPrice
      ? `<span class="price price--sale">${formatPrice(product.price)}</span><span class="price price--old">${formatPrice(product.originalPrice)}</span>`
      : `<span class="price">${formatPrice(product.price)}</span>`;
    const sizesHTML = product.sizes.map(s =>
      `<span class="size-chip" data-size="${s}">${s}</span>`
    ).join('');

    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
      <div class="quick-view-overlay"></div>
      <div class="quick-view-content">
        <button class="quick-view-close"><i class="fas fa-times"></i></button>
        <div class="quick-view-grid">
          <div class="quick-view-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="quick-view-info">
            <span class="product-card__cat">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="product-card__rating">
              <span class="stars">${stars}</span>
              <span>${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="product-card__price">${priceHTML}</div>
            <p style="color:var(--gray-600);line-height:1.7;margin-bottom:20px;font-size:15px;">${product.description}</p>
            <div style="margin-bottom:20px;">
              <p style="font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Select Size</p>
              <div class="product-card__sizes qv-sizes">${sizesHTML}</div>
            </div>
            <button class="btn btn--primary btn--full qv-add-btn" style="margin-bottom:12px;">
              <i class="fas fa-shopping-bag"></i> Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => modal.classList.add('active'));

    let selectedSize = null;
    $$('.qv-sizes .size-chip', modal).forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.qv-sizes .size-chip', modal).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedSize = parseInt(chip.dataset.size);
      });
    });

    $('.qv-add-btn', modal).addEventListener('click', () => {
      addToCart(product.id, selectedSize);
      closeModal();
    });

    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 300);
    }
    $('.quick-view-close', modal).addEventListener('click', closeModal);
    $('.quick-view-overlay', modal).addEventListener('click', closeModal);
  }

  // ---- CONTACT FORM ----
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! We\'ll be in touch soon 🙌', 'success');
      contactForm.reset();
    });
  }

  // Make exposed for product page
  window.SOLE = { addToCart, showToast, createProductCard, formatPrice, generateStars };

})();
