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