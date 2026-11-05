
<div align="center">

# 🧸 لبخند نینی | Labkhand Nini

### دنیای کوچولوی تو، پر از لبخند 💗

A sweet little e-commerce storefront for baby and newborn essentials.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss)
![Strapi](https://img.shields.io/badge/Strapi-5-4945ff?logo=strapi)

</div>

---

## 🌷 About the Project

**Labkhand Nini** (لبخند نینی) is a baby and newborn online shop created to make discovering lovely little essentials feel simple and joyful.

The project includes a customer-facing storefront built with **Next.js** and a content management backend powered by **Strapi**.

> Made with care for the tiniest people and the biggest smiles. ☁️

## ✨ Features

- 🛍️ Product catalogue
- 🔎 Search and product categories
- 🎀 Featured products
- 🔐 Secure credentials-based authentication
- 📦 Order management
- 🪄 Editable storefront content
- 📱 Responsive design
- 💕 Beautiful and user-friendly interface

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Auth.js / NextAuth | Authentication |
| Strapi 5 | Headless CMS and API |
| SQLite | Local database |

## 📁 Project Structure

```text
labkhand-nini/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── config/
│   └── src/
│       └── api/
│
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hoshiko9011/labkhand-nini.git

cd labkhand-nini
```

### 2. Backend Setup

```powershell
cd backend

Copy-Item .env.example .env

npm install

npm run develop
```

Open Strapi Admin:

http://localhost:1337/admin

Create your administrator account.

### 3. Frontend Setup

Open a second terminal:

```powershell
cd frontend

Copy-Item .env.example .env.local

npm install
```

Configure `frontend/.env.local`:

```env
STRAPI_URL=http://localhost:1337
AUTH_SECRET=your-long-random-secret
STRAPI_API_TOKEN=your-strapi-api-token
```

**Important:** Never commit your real environment variables or API tokens.

### 4. Run the Frontend

```bash
npm run dev
```

Open your browser:

http://localhost:3000

Keep the backend running while using the storefront. 🌸

## 🛠️ Strapi Content Management

Manage your store through the Strapi Admin Panel.

| Content Type | Description |
|---|---|
| Product | Product title, description, price, stock, image and category |
| Category | Product categories |
| Order | Customer information and orders |
| Storefront Settings | Logo, navigation, homepage and footer |

### Public API Permissions

Navigate to:

**Settings → Users & Permissions Plugin → Roles → Public**

Enable `find` and `findOne` for:

- Products
- Categories
- Storefront Settings

Do not enable public write permissions.

### API Token Permissions

Create a server-side API token with:

- Order: `create`
- Product: `find`, `update`

Keep the token private in `frontend/.env.local`.

For more backend information, see [backend/README.md](backend/README.md).

## 🧪 Useful Commands

Run these commands inside the `frontend` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript |
| `npm run format:check` | Check formatting |

Before releasing:

```bash
npm run typecheck
npm run lint
npm run build
```

## 💌 A Little Note

This project keeps the storefront's layout and interactions in the frontend, while shop content and merchandising details are managed through Strapi.

Thank you for visiting **Labkhand Nini**!

Here's to tiny outfits, precious moments, and a whole lot of smiles! 🧸💕

---

<div align="center">

### لبخند نینی | دنیای کوچولوی تو

**Built with ☁️, care, and a little bit of magic.**

</div>
