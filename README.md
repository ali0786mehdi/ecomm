# SOLE — Premium Footwear E-Commerce Website

> A minimalist, fully responsive e-commerce website for a premium Indian footwear brand. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies beyond Font Awesome and Google Fonts.

---

## 🖥️ Live Preview

Open `index.html` in any modern browser to run the site locally. No build step or server required.

---

## 📁 Project Structure

```
ecomm/
├── index.html          # Homepage — hero slider, featured products, categories, testimonials
├── products.html       # Shop page — filterable/sortable product grid with sidebar
├── about.html          # Brand story — timeline, values, stats
├── contact.html        # Contact form + FAQ accordion
├── css/
│   └── style.css       # All styles — design system, layout, components, responsive
└── js/
    ├── products.js     # Product data array (12 products with full metadata)
    └── main.js         # All interactivity — cart, slider, filters, modals, animations
```

---

## ✨ Features

### 🏠 Homepage (`index.html`)
- Auto-playing hero slider with 3 slides, dot navigation and prev/next controls
- Animated stats counter (15,000+ customers, 200 styles, etc.)
- Category grid with hover effects (Sneakers, Boots, Formal, Sandals, Loafers)
- Featured products grid with category filter buttons (All / Sneakers / Boots / Formal / Sandals)
- New Arrivals section
- Promo banner (40% OFF)
- Instagram-style gallery grid
- Newsletter signup form
- Customer testimonials

### 🛍️ Shop Page (`products.html`)
- Full product grid (12 products)
- **Sidebar filters:**
  - Multi-select category checkboxes (supports selecting multiple at once)
  - Price range slider (₹1,000 – ₹10,000)
  - Color swatch filter (Black, White, Gold, Brown, Red)
  - Availability filter (On Sale / New Arrivals)
- Sort by: Featured, Price Low→High, Price High→Low, Best Rated, Newest
- URL-based category pre-filter (`products.html?cat=sneakers`)
- Search query support (`products.html?q=boot`)
- Clear All Filters button
- Live product count

### 📖 About Page (`about.html`)
- Brand origin story
- Core values (Sustainable, Handcrafted, Timeless)
- Animated stats section
- Interactive brand timeline (2018 → 2026)

### 📬 Contact Page (`contact.html`)
- Full contact form (name, email, phone, subject, order number, message)
- Contact details (address, phone, email, WhatsApp)
- Social media links
- FAQ accordion (6 questions, smooth expand/collapse)

### 🛒 Cart (All Pages)
- Persistent cart via `localStorage` — survives page refresh
- Slide-in cart sidebar with overlay
- Add / remove items, adjust quantity
- Real-time subtotal calculation
- Cart item count badge on nav icon

### 🔍 Search (All Pages)
- Search bar toggle in nav
- Enter key or button submits search
- Redirects to `products.html?q=<query>`

### 🪟 Quick View Modal
- Opens on product card eye icon click
- Shows product image, details, size selector, add-to-cart
- Closes on overlay click or X button

---

## 🎨 Design System

All design tokens are defined as CSS variables in `:root` inside `style.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--black` | `#0a0a0a` | Primary text, buttons, backgrounds |
| `--white` | `#ffffff` | Page background |
| `--off-white` | `#f8f7f4` | Section backgrounds |
| `--accent` | `#c9a96e` | Gold accent — highlights, prices, tags |
| `--accent-dark` | `#a8824a` | Hover state for accent |
| `--danger` | `#e53e3e` | Sale badges, error states |
| `--success` | `#38a169` | Success toast |
| `--font-sans` | Inter | Body text |
| `--font-serif` | Playfair Display | Headings, logo |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| `≤ 1100px` | Products grid → 3 columns; footer → 3 columns |
| `≤ 900px` | Mobile nav (slide-in menu); 2-column grids; stacked layouts |
| `≤ 580px` | Single-column footer; full-width cart; compact spacing |

---

## 🗃️ Product Data (`js/products.js`)

All 12 products are defined in the `PRODUCTS` array. Each product object has:

```js
{
  id: 1,
  name: "Air Lux Pro",
  category: "sneakers",       // sneakers | boots | loafers | sandals | formal
  price: 4999,                // in INR
  originalPrice: 6999,        // null if no sale
  sale: true,                 // boolean
  badge: "sale",              // "sale" | "new" | "hot" | null
  rating: 4.8,                // out of 5
  reviews: 124,
  sizes: [6, 7, 8, 9, 10, 11],
  image: "https://...",       // Unsplash image URL
  new: false,                 // shows in New Arrivals section
  colors: ["#f5f5f5", "#0a0a0a", "#c9a96e"],  // used by color swatch filter
  description: "..."
}
```

To add a new product, append an object to the `PRODUCTS` array in `js/products.js`.

---

## 🐛 Bug Fixes Applied

The following bugs were identified and fixed:

1. **Currency symbol** — `?` was displayed instead of `₹` in the announcement bar and cart subtotal on `index.html`
2. **Wishlist icon** — Product cards showed a filled heart (`fas fa-heart`) by default; corrected to outline (`far fa-heart`) until wishlisted
3. **PRODUCTS guard** — `window.PRODUCTS` check replaced with `typeof PRODUCTS !== 'undefined'` for reliability
4. **Color swatch filter** — Swatch clicks had no JS handler; filter logic wired up in `products.html`
5. **Account icon link** — Nav account icon on `contact.html` pointed to `#`; fixed to `about.html`
6. **Counter animation** — Stats counter could fire multiple times on scroll; guarded with `countersAnimated` boolean flag
7. **Multi-category filter** — Selecting multiple category checkboxes incorrectly fell back to "all"; fixed using a `Set` to track active categories

---

## 🚀 Getting Started

1. Clone or download the repo:
   ```bash
   git clone https://github.com/ali0786mehdi/ecomm.git
   ```
2. Open `index.html` in your browser — no install, no build step needed.

To deploy, upload all files to any static hosting service:
- **GitHub Pages** — push to `main`, enable Pages in repo settings
- **Netlify** — drag and drop the folder
- **Vercel** — import the repo

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 | Custom design system, animations, responsive grid |
| Vanilla JavaScript (ES6+) | All interactivity, no frameworks |
| [Font Awesome 6.5](https://fontawesome.com/) | Icons |
| [Google Fonts](https://fonts.google.com/) | Inter + Playfair Display |
| [Unsplash](https://unsplash.com/) | Product & hero images |
| `localStorage` | Persistent cart state |

---

## 📄 License

This project is for educational/portfolio purposes.

---

*Made with ❤️ in India — SOLE © 2026*

---

## 🗺️ Roadmap — What to Build Next

The current site has a complete browsing and buying flow (Homepage → Product Detail → Cart → Checkout → Order Confirmation). Below are the remaining features needed to make this a fully production-ready e-commerce platform, organized by priority.

---

### 🔴 Priority 1 — Core Missing Pages

| Feature | File | Description |
|---------|------|-------------|
| **Wishlist Page** | `wishlist.html` | Display all wishlisted items (saved in localStorage), remove items, move to cart |
| **User Account / Login** | `account.html`, `login.html` | Registration, login, order history, saved addresses, profile management |
| **Order Tracking Page** | `track-order.html` | Enter order number + email to see live shipment status with a progress timeline |
| **404 Error Page** | `404.html` | Friendly not-found page with search bar and links back to homepage/shop |
| **Size Guide Page** | `size-guide.html` | Full size chart (UK/EU/US/CM), how-to-measure instructions, foot shape guide |
| **Returns & Exchanges** | `returns.html` | Step-by-step return/exchange process, policy details, return request form |
| **Shipping Policy** | `shipping.html` | Delivery zones, timelines, free shipping threshold, COD availability |

---

### 🟡 Priority 2 — Trust & Conversion Features

| Feature | Description |
|---------|-------------|
| **Product Reviews System** | Allow users to submit star ratings + text reviews per product. Store in localStorage or backend. Show average rating, review count, rating breakdown bar chart |
| **Recently Viewed Products** | Track last 4–6 viewed products in localStorage, show as a "Recently Viewed" strip on product and homepage |
| **Compare Products** | Let users select up to 3 products to compare side-by-side (size range, price, rating, materials) |
| **Stock / Inventory Indicators** | Show "Only 3 left!", "Sold Out" badge, disable sizes that are out of stock |
| **Sticky Add-to-Cart Bar** | On product page, when user scrolls past the main CTA, show a sticky bottom bar with product name + "Add to Bag" button |
| **Promo / Coupon Engine** | Multiple discount codes, percentage vs flat discounts, minimum order value conditions |
| **Live Search with Suggestions** | As user types in the search bar, show matching product names as a dropdown (no page reload) |

---

### 🟢 Priority 3 — UX Enhancements

| Feature | Description |
|---------|-------------|
| **Image Zoom on Product Page** | Hover/pinch to zoom on product images, lightbox gallery with fullscreen view |
| **Color Variant Switcher** | Clicking a color swatch on a product card/page changes the displayed product image |
| **Skeleton Loading Screens** | Show animated placeholder cards while products/images are loading |
| **Infinite Scroll / Pagination** | Load more products as user scrolls down on the shop page (currently shows all 12 at once) |
| **Back-in-Stock Notifications** | "Notify me" button on sold-out sizes — captures email and notifies when restocked |
| **Breadcrumb on All Pages** | Consistent breadcrumb navigation across all pages for better UX and SEO |
| **Mobile Bottom Nav Bar** | Fixed bottom navigation on mobile: Home, Shop, Search, Wishlist, Cart |
| **Dark Mode** | Toggle between light and dark themes, save preference in localStorage |

---

### 🔵 Priority 4 — Marketing & Growth

| Feature | Description |
|---------|-------------|
| **Blog / Style Guide** | `blog.html` — articles on shoe care, styling tips, new arrivals editorial. Drives SEO traffic |
| **Loyalty / Rewards Program** | Points system: earn points per purchase, redeem at checkout. Show points balance in account |
| **Referral Program** | Share a referral link, both referrer and new customer get a discount |
| **Exit Intent Popup** | When user moves cursor to close tab, show a modal with a discount offer to retain them |
| **Flash Sale Countdown Timer** | Countdown timer on homepage/product page for limited-time sales |
| **Social Proof Notifications** | Small toast popups: "Rohan from Delhi just bought Metro Boot" — builds urgency |
| **Email Newsletter Integration** | Connect newsletter form to Mailchimp / ConvertKit API for real email capture |
| **SEO Optimization** | Add Open Graph meta tags, structured data (JSON-LD for products), sitemap.xml, robots.txt |

---

### ⚙️ Priority 5 — Backend & Infrastructure

> These require moving beyond a static site to a real backend (Node.js, Python, etc.) or a BaaS (Firebase, Supabase).

| Feature | Description |
|---------|-------------|
| **User Authentication** | Real login/signup with JWT tokens or Firebase Auth. Session persistence across devices |
| **Database Integration** | Store products, orders, users, reviews in a real database (PostgreSQL, MongoDB, Firestore) |
| **Payment Gateway** | Integrate Razorpay or Stripe for real payment processing (UPI, cards, wallets) |
| **Admin Dashboard** | `admin/` panel to manage products (add/edit/delete), view orders, update stock, apply discounts |
| **Order Management System** | Real order states: Placed → Confirmed → Packed → Shipped → Delivered → Returned |
| **Inventory Management** | Track stock per product per size, auto-mark sold out, restock alerts |
| **Search with Algolia/MeiliSearch** | Full-text search with typo tolerance, faceted filtering, instant results |
| **Analytics Dashboard** | Track page views, conversion rate, cart abandonment, revenue — via Google Analytics or custom |
| **Push Notifications** | Browser push notifications for order updates, new arrivals, flash sales |
| **PWA (Progressive Web App)** | Add `manifest.json` + service worker so users can "install" the site on their phone |

---

### 📊 Current Progress

```
Pages Built:        8 / ~15  ████████░░░░░░░  53%
Core Features:      7 / ~20  ███████░░░░░░░░  35%
Backend:            0 / 10   ░░░░░░░░░░░░░░░   0%
```

**Built so far:** Homepage, Products, Product Detail, Checkout, Order Confirmation, About, Contact, README  
**Next recommended:** Wishlist → 404 Page → Login/Account → Order Tracking → Reviews System

---

*Last updated: September 2026*