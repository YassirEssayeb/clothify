<div align="center">

# Clothify

**Modern clothing store — frontend + REST API**

A full-featured e-commerce clothing store built with vanilla JavaScript and a Node.js/Express backend with a self-contained SQLite database. No build step, no framework — just open a browser and shop.

[![License: MIT](https://img.shields.io/github/license/YassirEssayeb/clothify.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)

</div>

---

## Features

**Storefront**
- Product catalog with categories, search, and filters
- Shopping cart, wishlist, product comparison, and recently-viewed history
- Product reviews & star ratings
- Coupon/promo-code validation
- Abandoned-cart detection with recovery prompts
- Newsletter subscription and contact feedback forms
- Mobile-first responsive layout with EN/FR language switcher

**Accounts & Auth**
- Registration, login, and email verification (6-digit code)
- Google OAuth sign-in
- Password reset and account deletion (GDPR-style request flow)
- Per-user cart, wishlist, orders, and saved addresses

**Checkout & Payments**
- Cart-based checkout with shipping info
- Card payment processing with real-time Luhn validation (demo)
- Order history per user

**Admin Dashboard** (`admin.html`)
- Product CRUD with stock, rating, and color-variant fields
- Orders management and status updates
- Sales/product reports
- Abandoned-cart recovery view
- Dynamic site settings CMS (store name, contact info, SMTP, etc.)

## Tech Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | HTML5, CSS3, Vanilla JavaScript (no framework, no build step)     |
| Backend    | Node.js, Express 5                                                 |
| Database   | SQLite via [sql.js](https://sql.js.org/) (file-based, zero-config) |
| Auth       | bcryptjs, JWT-style session tokens, Google OAuth (demo)            |
| Email      | nodemailer (SMTP configurable from admin CMS)                      |
| Testing    | Jest + Supertest                                                   |
| Deploy     | Render (`render.yaml`) / Vercel serverless (`vercel.json`)        |

## Project Structure

```
Clotify/
├── index.html           # Storefront homepage
├── admin.html           # Admin dashboard
├── login.html           # Admin login
├── register.html        # Customer registration
├── script.js            # All frontend logic (i18n, cart, API calls)
├── style.css            # Design system + page styles
├── start-backend.bat    # Windows dev launcher
└── backend/
    ├── server.js        # Express REST API (port 5000)
    ├── api/index.js     # Serverless entrypoint (Vercel)
    ├── database.sql     # MySQL schema reference + seed data
    ├── package.json
    ├── tests/           # Jest + Supertest API tests
    ├── render.yaml      # Render deploy config
    └── vercel.json      # Vercel deploy config
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (ships with Node.js)

### 1. Run the backend

```bash
cd backend
npm install
npm start
```

The API starts at `http://localhost:5000` and creates `backend/data.db` (SQLite) automatically on first run. Seed data is inserted on a fresh database so you can browse immediately.

> **Windows**: double-click `start-backend.bat` instead — it installs dependencies and starts the server.

### 2. Open the storefront

Just open `index.html` in a browser — no build step required. The frontend talks to the API at `http://localhost:5000/api` (see `API_BASE` in `script.js`).

- Storefront: `index.html`
- Account registration: `register.html`
- Admin login: `login.html` — default admin credentials are seeded in the database (`admin@clothify.com`)
- Admin dashboard: `admin.html`

### Configuration

The backend reads the following optional environment variables:

| Variable | Default     | Description                       |
| -------- | ----------- | --------------------------------- |
| `PORT`   | `5000`      | HTTP port for the API             |
| `DB_PATH`| `backend/data.db` | Path to the SQLite database file  |

SMTP settings for transactional email (verification codes, password resets) are configured in **Settings → Admin CMS** and stored in the database — no environment variables needed.

## API Overview

Base URL: `http://localhost:5000/api`

| Method   | Endpoint                     | Description                          |
| -------- | ---------------------------- | ------------------------------------ |
| `GET`    | `/products`                  | List products (filter by category)   |
| `GET`    | `/products/:id`              | Product detail + reviews             |
| `GET`    | `/search?q=`                 | Search products                      |
| `GET`    | `/categories`                | List categories                      |
| `POST`   | `/orders`                    | Place an order                       |
| `PATCH`  | `/orders/:id/status`         | Update order status (admin)          |
| `POST`   | `/register`                  | Create account                       |
| `POST`   | `/verify-email`              | Verify email with code               |
| `POST`   | `/login`                     | Login (rate-limited)                 |
| `POST`   | `/auth/google`               | Google OAuth sign-in                 |
| `POST`   | `/password-reset`            | Request password reset               |
| `POST`   | `/process-payment`           | Validate & process a card payment    |
| `POST`   | `/coupon/validate`           | Validate a promo code                |
| `POST`   | `/reviews`                   | Submit a product review              |
| `POST`   | `/subscribe`                 | Newsletter subscription              |
| `GET`    | `/admin/orders`              | Admin order listing                  |
| `GET`    | `/admin/reports`             | Sales & product reports (admin)      |
| `GET/PUT`| `/settings`                  | Read / update site settings (admin)  |

## Running Tests

```bash
cd backend
npm test
```

Tests use an isolated in-memory database (see `backend/tests/api.test.js`).

## Deployment

- **Render**: push the repo and use the included `render.yaml` (or point a Web Service at the `backend/` folder — build `npm install`, start `npm start`).
- **Vercel**: deploy the `backend/` directory — the serverless entrypoint `api/index.js` is picked up automatically via `vercel.json`. Then change `API_BASE` in `script.js` to your deployed URL.

> The frontend is plain static files, so it can be hosted anywhere (GitHub Pages, a STATIC server, Vercel, etc.) pointed at the API base URL of your choice.

## License

Distributed under the [MIT License](LICENSE).

---

Built with ❤️ by [Yassir Essayeb](https://github.com/YassirEssayeb).