# GearHive – Equipment Rental Platform (Client)

GearHive is a rental marketplace where **equipment owners** list their equipment and **customers** browse, book and pay for it for a specific period.
This repository is the **client (Next.js)** part. The API lives in the **server** repository (Express + MongoDB + Stripe).

## 🔗 Links

| What | Link |
| --- | --- |
| Live site | `https://YOUR-CLIENT-URL.vercel.app` ← replace after deployment |
| Live API | `https://YOUR-SERVER-URL.vercel.app` ← replace after deployment |
| Client repository | `https://github.com/YOUR-USERNAME/gearhive-client` |
| Server repository | `https://github.com/YOUR-USERNAME/gearhive-server` |

**Admin login (for the examiner)**

| Email | Password |
| --- | --- |
| `admin@gearhive.com` | `Admin@123` |

## 🎯 Purpose

Make renting equipment simple, transparent and secure: owners earn from equipment they are not using, customers rent exactly what they need, and admins keep the marketplace safe.

## ✨ Key Features

**Public**
- Home page: animated banner, 6 featured items, categories, why choose us, how it works, recently added, 4 customer reviews, owner call-to-action (Framer Motion animations).
- All Equipment: 3-column grid, **server-side search** (name, location, category), **filters** (category, rental type, price range, availability), **sorting** (price low/high, recently added) and **pagination**.
- Loading page, error page and 404 page. Dark / light **theme toggle** saved in localStorage. Fully responsive.

**Authentication & roles (BetterAuth + MongoDB adapter + JWT)**
- Email/password registration (uppercase + lowercase + 6 characters rule) and Google login. Google users start as **Customer**.
- Roles: **Customer**, **Owner**, **Admin**. Private pages wait for the session, so a reload never sends a logged-in user to Login.
- A JWT access token is created by `/api/token` and sent to the Express API, which verifies it and the user's role.

**Customer** – equipment details, favorites (saved in database), booking modal (availability check + live total), **Stripe Checkout** payment, success/cancel pages, My Rentals (paginated), Favorites, Profile, analytics overview.

**Owner** – add equipment (imgbb upload, starts as *pending*), My Equipment (update / delete / view), My Equipment Rental, Profile, **analytics** (listed equipment, completed rentals, total and monthly earnings).

**Admin** – All Users (change role, block, delete), All Equipment (approve / reject / update / delete), All Rentals (manage status, run the finished-rentals job), Profile, **analytics** (users, equipment, bookings, pending approvals, completed rentals, revenue, monthly bookings).

## 🧰 Tech Stack and npm Packages

| Package | Why |
| --- | --- |
| `next` (App Router), `react`, `react-dom` | Framework |
| `tailwindcss`, `daisyui` | Styling and UI components (custom GearHive light/dark themes) |
| `better-auth` | Authentication (email/password, Google) with the MongoDB adapter |
| `mongodb` | Database driver used by BetterAuth |
| `jsonwebtoken` | Signs the JWT access token in `/api/token` |
| `framer-motion` | Animations |
| `recharts` | Dashboard charts |
| `react-hot-toast`, `sweetalert2` | Toasts and pop-up alerts |
| `react-icons` | Icons (including the new **X** logo) |

## 📁 Folder Structure

```
client/
├── public/images/            # hero, category and equipment illustrations (SVG)
├── scripts/                  # seed-users.mjs, generate-art.mjs
└── src/
    ├── app/
    │   ├── (main)/           # public pages: home, equipment, details, login, register, payment, about, contact
    │   ├── dashboard/        # customer / owner / admin dashboard pages
    │   ├── api/auth/[...all] # BetterAuth endpoints
    │   ├── api/token/        # JWT token endpoint
    │   ├── error.js, loading.js, not-found.js
    │   └── layout.js, globals.css
    ├── components/           # layout, home, equipment, auth, dashboard, ui, motion
    ├── hooks/                # useAuth, useApi
    └── lib/                  # auth (server), auth-client, api, constants, format, pricing, imgbb, alerts
```

## 🚀 Run on Your Computer

1. Start the **server** project first (see its README).
2. In this project:

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev
```

Open `http://localhost:3000`.

### Environment variables (`.env.local`)

| Name | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Address of the Express server |
| `NEXT_PUBLIC_IMGBB_API_KEY` | imgbb API key for image upload |
| `BETTER_AUTH_SECRET` | Long random text for BetterAuth |
| `BETTER_AUTH_URL` | Address of this website (no trailing slash) |
| `MONGODB_URI`, `MONGODB_DB` | MongoDB connection (**same database name as the server**) |
| `JWT_SECRET` | **Must be identical** to `JWT_SECRET` in the server |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google login (redirect URI: `<site>/api/auth/callback/google`) |

### Demo data

```bash
npm run seed:users      # in client: admin, 2 owners, 1 customer
# then in the server project:
npm run seed            # equipment, bookings, payments, favorites
```

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@gearhive.com` | `Admin@123` |
| Owner | `owner@gearhive.com` | `Owner@123` |
| Customer | `customer@gearhive.com` | `Customer@123` |

**How to become an Owner:** register, then an admin changes your role in *All Users*.
**Stripe test card:** `4242 4242 4242 4242`, any future date, any CVC.

## ☁️ Deployment (Vercel)

1. Import the repository in Vercel and add all environment variables above.
2. Set `BETTER_AUTH_URL` to the live site address and `NEXT_PUBLIC_API_URL` to the live server address.
3. In Google Cloud add the redirect URI `https://YOUR-SITE/api/auth/callback/google`.
4. In MongoDB Atlas → Network Access, allow the hosting provider (for example `0.0.0.0/0`).
5. In the **server** project set `CLIENT_URL` to the live site address (CORS).
