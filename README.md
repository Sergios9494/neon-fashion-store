# NEON Fashion Store — Vercel Edition

A complete responsive streetwear e-commerce storefront built with Next.js, React, TypeScript, and CSS. This edition uses the standard Next.js runtime and is ready for GitHub and Vercel.

## Included

- Responsive desktop, tablet, iPhone, and Android layouts
- WHITE / BLACK global theme switch
- Product catalog with category filters
- Hoodies, T-shirts, bomber jackets, trousers, and accessories
- Product search
- Functional cart with quantity and remove controls
- Checkout form with card and PayPal interface
- Responsive category carousel and Instagram section
- All product and campaign image assets
- USD pricing

## Run locally

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify the production build

```bash
npm run build
npm run start
```

## Push to GitHub

Create an empty GitHub repository, extract this project, and run:

```bash
git init
git add .
git commit -m "Initial NEON store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub details.

## Deploy on Vercel

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import the GitHub repository you created.
4. Vercel should detect **Next.js** automatically.
5. Leave the build command and output settings at their defaults.
6. Select **Deploy**.

No environment variables are required for this storefront.

## Project structure

```text
app/
  layout.tsx       Metadata and mobile viewport configuration
  page.tsx         Storefront, catalog, cart, and checkout
  globals.css      Desktop, tablet, iOS, and Android styling
public/            Product, category, hero, and social imagery
package.json       Standard Next.js and Vercel commands
```

## Mobile support

The interface includes dedicated tablet, phone, and narrow-phone breakpoints. It uses touch-friendly controls, 16px checkout fields to prevent unwanted iOS input zoom, dynamic viewport units, horizontal touch carousels, and safe-area padding for notched iPhones.

## Payment note

The checkout is a complete front-end interface. Real payments require your own secure Stripe or PayPal server-side integration.
