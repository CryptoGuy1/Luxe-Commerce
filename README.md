# LUXE Commerce

A state-of-the-art, modern e-commerce website built with Next.js 14, featuring a luxury aesthetic design with multiple payment integrations.

Vercel: https://luxe-commerce-94c7aa1ll-benjamins-projects-0bc5a52f.vercel.app/about

![LUXE Commerce Hero](https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90)

> **[📖 View Full Design System →](./DESIGN.md)**

---

## ✨ Preview

### Product Showcase

| Cashmere Coat | Leather Tote | Diamond Ring | Swiss Watch |
|---------------|--------------|--------------|-------------|
| ![Coat](https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&q=90) | ![Tote](https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=90) | ![Ring](https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=90) | ![Watch](https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=90) |
| $2,450 | $1,890 | $4,850 | $6,750 |

---

## 🌟 Features

### Pages (13+ Total)
1. **Home Page** - Hero section, featured products, categories, brand story, testimonials
2. **Shop Page** - Product grid with filters, sorting, and grid toggle
3. **Category Pages** - Dynamic category pages with curated products
4. **Product Detail Page** - Image gallery, size/color selection, reviews, related products
5. **Cart Page** - Full cart management with quantity controls
6. **Checkout Page** - Multi-step checkout with multiple payment options
7. **Order Confirmation** - Order success page with details
8. **About Page** - Brand story and values
9. **Contact Page** - Contact form and information
10. **FAQ Page** - Accordion-style frequently asked questions
11. **Wishlist Page** - Saved products for later
12. **Account Page** - User profile and order history
13. **Collections Page** - Curated product collections

### Design Features
- **Luxury Aesthetic**: Deep blacks, warm gold accents, cream backgrounds
- **Typography**: Playfair Display for headings, DM Sans for body text
- **Animations**: Smooth page transitions with Framer Motion
- **Responsive**: Fully responsive design for all device sizes
- **Micro-interactions**: Hover effects, loading states, cart drawer

### Payment Integrations
- **Stripe** - Credit/Debit cards, Apple Pay, Google Pay
- **PayPal** - Full PayPal checkout flow
- **Klarna** - Buy now, pay later option

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- PayPal Developer account (for PayPal payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luxe-commerce.git
cd luxe-commerce
```

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy the environment template:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Fill in your environment variables (see below)

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a \`.env.local\` file in the root directory with the following variables:

### Required Variables

\`\`\`env
# ============================================
# STRIPE CONFIGURATION
# ============================================
# Get these from: https://dashboard.stripe.com/apikeys

# Publishable Key (starts with pk_test_ or pk_live_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Secret Key (starts with sk_test_ or sk_live_)
# ⚠️ NEVER expose this in client-side code
STRIPE_SECRET_KEY=sk_test_your_key_here

# Webhook Secret (starts with whsec_)
# Get from: https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# ============================================
# PAYPAL CONFIGURATION
# ============================================
# Get these from: https://developer.paypal.com/dashboard/applications

# Client ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here

# Client Secret
# ⚠️ NEVER expose this in client-side code
PAYPAL_CLIENT_SECRET=your_client_secret_here

# Environment: 'sandbox' or 'production'
PAYPAL_MODE=sandbox

# Optional: Webhook ID for signature verification
PAYPAL_WEBHOOK_ID=your_webhook_id_here

# ============================================
# APPLICATION CONFIGURATION
# ============================================

# Your domain (without trailing slash)
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Where to Get Your Keys

#### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** → \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`
3. Copy your **Secret key** → \`STRIPE_SECRET_KEY\`
4. Go to [Webhooks](https://dashboard.stripe.com/webhooks)
5. Create endpoint: \`https://yourdomain.com/api/webhooks/stripe\`
6. Select events: \`checkout.session.completed\`, \`payment_intent.succeeded\`, \`payment_intent.payment_failed\`
7. Copy signing secret → \`STRIPE_WEBHOOK_SECRET\`

#### PayPal
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications)
2. Create a new app or select existing
3. Copy **Client ID** → \`NEXT_PUBLIC_PAYPAL_CLIENT_ID\`
4. Copy **Secret** → \`PAYPAL_CLIENT_SECRET\`
5. For webhooks, create endpoint: \`https://yourdomain.com/api/webhooks/paypal\`
6. Copy Webhook ID → \`PAYPAL_WEBHOOK_ID\`

## 📁 Project Structure

\`\`\`
luxe-commerce/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── checkout/      # Payment endpoints
│   │   │   └── webhooks/      # Webhook handlers
│   │   ├── about/
│   │   ├── account/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── collections/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── order-confirmation/
│   │   ├── product/[slug]/
│   │   ├── shop/
│   │   │   └── [slug]/        # Category pages
│   │   ├── wishlist/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── BrandStory.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Categories.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   └── Testimonials.tsx
│   ├── data/                  # Sample data
│   │   └── products.ts
│   ├── lib/                   # Utilities
│   │   ├── store.ts          # Zustand stores
│   │   ├── stripe.ts         # Stripe config
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
│       └── index.ts
├── public/                    # Static assets
├── .env.example              # Environment template
├── .env.local                # Your environment variables
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
\`\`\`

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary 950 | #0a0a0a | Main text, buttons |
| Accent 500 | #d4a574 | CTAs, highlights |
| Cream 200 | #faf8f5 | Background |
| Cream 100 | #fdfcfa | Cards, surfaces |

### Typography

- **Display**: Playfair Display (serif) - Headlines
- **Body**: DM Sans (sans-serif) - Body text
- **Mono**: JetBrains Mono - Code, prices

### Components

Pre-built component classes:
- \`.btn-primary\` - Primary action button
- \`.btn-secondary\` - Secondary button
- \`.btn-accent\` - Accent color button
- \`.input-field\` - Form inputs
- \`.card\` - Card container
- \`.badge\` - Status badges

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Remember to:
1. Set all environment variables
2. Update \`NEXT_PUBLIC_APP_URL\` to your production domain
3. Configure webhook endpoints in Stripe/PayPal dashboards

## 🔒 Security Notes

- Never commit \`.env.local\` to version control
- Keep secret keys on the server only
- Use webhook signature verification in production
- Enable HTTPS in production
- Implement rate limiting for API routes

## 📝 API Routes

### Stripe
- \`POST /api/checkout/stripe\` - Create checkout session
- \`POST /api/checkout/payment-intent\` - Create payment intent
- \`POST /api/webhooks/stripe\` - Handle Stripe webhooks

### PayPal
- \`POST /api/checkout/paypal/create-order\` - Create PayPal order
- \`POST /api/checkout/paypal/capture-order\` - Capture payment
- \`POST /api/webhooks/paypal\` - Handle PayPal webhooks

## 🛠 Development

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
\`\`\`

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
