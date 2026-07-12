# Faar Earth Collective — Website

One-page Next.js 14 (App Router) site built from the design spec, with:

- Full sectioned layout: Header, Hero, USP strip, Categories, Products gallery, About, Enquiry form, Footer
- "View all Products" modal listing every product in `data/products.ts` with category filters
- Mobile navigation drawer that slides in from the right, covers half the screen, with a dark overlay backdrop
- Enquiry form that sends an email via SMTP (Nodemailer) from `app/api/enquiry/route.ts`
- Responsive down to 375px, keyboard-accessible focus states, reduced-motion support

## 1. Install

```bash
npm install
```

## 2. Configure email sending

Copy `.env.example` to `.env.local` and fill in your SMTP details:

```bash
cp .env.example .env.local
```

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ENQUIRY_TO_EMAIL=sales@faarearth.com
```

- For Gmail, use an **App Password** (not your normal password) — enable 2FA, then generate one under Google Account → Security → App Passwords.
- For port `465`, set `SMTP_SECURE=true`. For `587` or `25`, keep it `false`.
- Any standard SMTP provider works: Gmail, Outlook/Office365, SendGrid SMTP, Amazon SES SMTP, your hosting provider's mail server, etc.
- `ENQUIRY_TO_EMAIL` is where enquiry submissions land. The submitter's email is set as `replyTo`, so you can hit "Reply" directly.

## 3. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Build for production

```bash
npm run build
npm start
```

## Editing products

Everything shown in the products gallery and the "View all Products" modal comes from `data/products.ts`. Add, remove, or edit entries there — the modal and grid re-render automatically for however many products exist, no other code changes needed. Category filter pills in the modal are generated from the same three categories used across the site (`Edible Seeds`, `Cold Pressed Oils`, `Essential Oils`).

## Replacing placeholder images

All images currently point to `picsum.photos` placeholders so the site runs out of the box. Swap the `image` URLs in `data/products.ts`, and the `src` in `Hero.tsx`, `About.tsx`, `Enquiry.tsx`, and `Categories.tsx` (via `data/products.ts`'s `categories` array) for real product photography to match the brand reference image.

## Project structure

```
app/
  layout.tsx          Fonts (Poppins/Inter) + global metadata
  page.tsx             Assembles all sections
  globals.css          Tailwind base + utility classes
  api/enquiry/route.ts SMTP email sending endpoint
components/
  Header.tsx           Sticky header, desktop nav, mobile trigger
  MobileNav.tsx         Right-side slide-in drawer (half screen + overlay)
  Hero.tsx
  USPStrip.tsx
  Categories.tsx
  ProductsGallery.tsx   Preview grid + "View all Products" trigger
  ProductsModal.tsx     Full product list modal with filters
  About.tsx
  Enquiry.tsx           Form + submit handling
  Footer.tsx
data/
  products.ts           Product + category data (edit here)
```

## Deploying

Works on any Node host that supports Next.js (Vercel, Netlify, Render, a VPS with `npm run build && npm start`, etc.). Just make sure the SMTP environment variables are set in your hosting provider's environment settings — don't commit `.env.local`.
