<div align="center">

# 🧸 لبخند نینی
### Labkhand Nini

**A warm, cute online shop for baby & newborn essentials**

*Soft colors · Persian RTL · Built with love for little smiles*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Strapi](https://img.shields.io/badge/Strapi-5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)](https://strapi.io/)

<br/>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Structure](#-project-structure)

</div>

---

## 🌸 About

**لبخند نینی** is a modern storefront for baby and newborn products — soft UI, full **Persian (RTL)** support, and a real shopping flow from catalog to checkout.

Content and products live in **Strapi CMS**, so merchandisers can update prices, stock, images, and homepage copy without touching React code. The frontend stays fast, typed, and delightful.

> 💖 *Every little detail is designed to feel calm, friendly, and trustworthy for parents shopping for their nini.*

---

## ✨ Features

| | Feature | What you get |
|:-:|---------|--------------|
| 🎨 | **Modern responsive UI** | Soft rose theme, mobile-first layout, full **RTL** Persian experience |
| 🗂️ | **Strapi CMS** | Products, categories, and storefront settings managed from the admin panel |
| 🛒 | **Shopping cart** | React context + **localStorage**, quantity controls, stock-aware limits |
| 🧸 | **Product catalog** | Grid listing, detail pages, featured items, discounts & live stock |
| 💳 | **Checkout & orders** | Delivery form, server-side price/stock validation, order codes, success page |
| 🔒 | **Safe order pipeline** | Prices recomputed on the server; stock decremented in Strapi transactions |

---

## 🧩 Tech Stack

### Frontend — `frontend/`

| Layer | Tools |
|-------|--------|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19**, **Tailwind CSS v4**, Lucide icons |
| Language | **TypeScript** |
| State | Cart context + `localStorage` |
| Auth | NextAuth (credentials) |

### Backend — `backend/`

| Layer | Tools |
|-------|--------|
| CMS / API | **Strapi 5** |
| Content | Products · Categories · Orders · Storefront Settings |
| Database | PostgreSQL (recommended) / SQLite (default for local development) |

```text
Browser  ──▶  Next.js storefront  ──▶  Strapi API  ──▶  Database
                 (UI + cart)           (CMS + orders)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 6+
- A running **PostgreSQL** database for PostgreSQL setup (SQLite is used by default for local development)
- Optional: Strapi admin access to publish products

### 1. Clone the repository

```bash
git clone https://github.com/hoshiko9011/labkhand-nini.git
cd labkhand-nini
```

### 2. Start the Strapi backend

```bash
cd backend
cp .env.example .env
# Edit .env — set the secrets
```

For PostgreSQL, create a database and user, then add these settings to `backend/.env`, replacing the password with the one configured for that user. Without `DATABASE_CLIENT=postgres`, Strapi uses SQLite by default.

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=replace-with-your-database-password
DATABASE_SCHEMA=public
```

```bash
npm install
npm run develop
```

Open **http://127.0.0.1:1337/admin** and create your first administrator.

**Public permissions (read-only):**  
Settings → Users & Permissions → Roles → **Public** → enable `find` / `findOne` for **Product**, **Category**, and **Storefront Settings**.  
Do **not** enable Public write on **Order**.

**API token for checkout:**  
Settings → API Tokens → create a token with **Order: create** and **Product: find + update** (stock is decremented on order).  
Copy it for the frontend env as `STRAPI_API_TOKEN`.

### 3. Start the Next.js storefront

```bash
cd ../frontend
cp .env.example .env.local
```

Fill in `frontend/.env.local`:

```env
STRAPI_URL=http://localhost:1337
AUTH_SECRET=replace-with-a-long-random-secret
STRAPI_API_TOKEN=replace-with-strapi-api-token
```

```bash
npm install
npm run dev
```

Visit **http://localhost:3000** 🌷

### 4. Quality checks (before release)

```bash
# from frontend/
npm run typecheck
npm run lint
npm run build
```

---

## 📁 Project Structure

```text
labkhand-nini/
├── frontend/                 # Next.js storefront
│   ├── app/
│   │   ├── cart/             # Shopping cart page
│   │   ├── checkout/         # Checkout + success
│   │   ├── products/         # Catalog & product detail
│   │   ├── api/checkout/     # Secure order proxy
│   │   └── components/       # UI: cart, navbar, product cards…
│   ├── lib/                  # cart, products, orders, strapi helpers
│   └── .env.example
│
├── backend/                  # Strapi 5 CMS
│   └── src/api/
│       ├── product/
│       ├── category/
│       ├── order/            # Orders + stock decrement on create
│       └── site-setting/
│
├── LICENSE
└── README.md
```

---

## 🛒 Shopping flow (at a glance)

1. **Browse** products from Strapi (paginated full catalog)
2. **Add to cart** with quantity controls and stock caps
3. **Review** cart — live price/stock sync when the catalog is available
4. **Checkout** — delivery details validated client-side and server-side
5. **Order placed** — prices recomputed from live catalog; stock decreased in a DB transaction
6. **Success** — order code shown; cart cleared safely

---

## 📝 Content tips in Strapi

- **Products** — title, slug, price, discount, stock, image, category, featured, publish
- **Categories** — name + publish
- **Storefront Settings** — logo, navbar, announcement, homepage & footer copy
- Keep layout and interaction logic in the Next.js app; change merchandising through the CMS

---

## 📄 License

This project is released under the terms in [`LICENSE`](./LICENSE).

---

<div align="center">

### Made with 💕 for little ones and the people who love them

**لبخند نینی** · Labkhand Nini

*Happy shopping — may every order bring a smile* 🍼✨

</div>
