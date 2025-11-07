# 🛒 Mock E-Com Cart

**Data source for products:** DummyJSON — https://dummyjson.com/products

Modern full‑stack demo with a colorful UI, real-time cart badge, buy from cart, order history, and a stylish receipt.

A basic full-stack e-commerce shopping cart demo.

- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React + Vite + TailwindCSS
- APIs: REST (products fetched live from DummyJSON)
- No hosting required. Push to GitHub as-is.

---

## Monorepo Structure

- /backend
- /frontend
- /.gitignore
- README.md

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Quick Start

Open two terminals, one for backend and one for frontend.

1) Backend

```bash
# from repo root
cd backend
npm install
npm run dev
# API runs at http://localhost:4000
```

2) Frontend

```bash
# from repo root
cd frontend
npm install
npm run dev
# Web app runs at http://localhost:5173
```

Vite proxy forwards /api to http://localhost:4000.

---

## Environment Variables

Create backend/.env (see backend/.env.example):

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/mock_ecom_cart
```

---

## Backend

- Express server with MongoDB via Mongoose
- Products are fetched dynamically from DummyJSON in `GET /api/products`
- Cart totals compute prices by merging cart items with DummyJSON product data
- Services/Controllers/Routes split

Scripts

- npm run dev — nodemon server
- npm start — production run
- npm run seed — re-seed products (MongoDB)

### REST API

- GET /api/products
  - Returns 5–10 mock products: [{ id, name, price }]

- GET /api/cart
  - Returns { items: [{ id, productId, name, price, qty, lineTotal }], total }

- POST /api/cart
  - Body: { productId, qty }
  - Adds/updates an item, returns updated cart

- DELETE /api/cart/:id
  - Removes a cart item by its cart id, returns updated cart

- POST /api/checkout
  - Body: { cartItems } (optional — if omitted, server uses DB cart)
  - Returns { orderId, timestamp, total, items }
  - Clears the DB cart after checkout (mock)

Sample curl

```bash
curl http://localhost:4000/api/products
curl -X POST http://localhost:4000/api/cart -H 'Content-Type: application/json' -d '{"productId":"p1","qty":2}'
curl http://localhost:4000/api/cart
curl -X DELETE http://localhost:4000/api/cart/<cartItemId>
curl -X POST http://localhost:4000/api/checkout -H 'Content-Type: application/json' -d '{"cartItems":[]}'
```

---

## Frontend

- React + Vite + TailwindCSS
- Pages: Products, Cart, Checkout
- Components: ProductCard, CartItem, ReceiptModal
- Axios API client with Vite proxy `/api`

Features

- Products grid with Add to Cart
- Cart page to update qty and remove items
- Checkout form (name, email) + Receipt modal (mock)
- Responsive layout (mobile/desktop)

Run

```bash
cd frontend
npm install
npm run dev
```

Note on Tailwind warnings in some IDEs: CSS linters may flag `@tailwind` at-rules until Vite processes them. This is expected and harmless when running `npm run dev` or `build`.

---

## Bonus Ideas (not required, easy to extend)

- Persist user sessions, add auth
- Toggle to fetch products from https://fakestoreapi.com/products (map to id, name, price)
- Toast notifications for API errors/success

---

## Screenshots

<p>
  <img src="assets/screenshots/Screenshot%202025-11-07%20150742.png" alt="Screenshot 1" width="800" />
</p>

<p>
  <img src="assets/screenshots/Screenshot%202025-11-07%20150834.png" alt="Screenshot 2" width="800" />
</p>

<p>
  <img src="assets/screenshots/Screenshot%202025-11-07%20150901.png" alt="Screenshot 3" width="800" />
</p>

<p>
  <img src="assets/screenshots/Screenshot%202025-11-07%20150919.png" alt="Screenshot 4" width="800" />
</p>

---

## License

MIT
