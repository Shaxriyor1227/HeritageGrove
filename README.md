# Heritage Grove Project

Loyihaning tartibli tuzilmasi:
- **`frontend/`**: Vite + React 18 frontend (Heritage Grove footer).
- **`backend/`**: Node.js + Express + PostgreSQL (Sequelize ORM, Swagger, Joi validation).

---

## 🚀 Ishga tushirish

### 1. Frontend (React)
```bash
cd frontend
npm run dev
```
Brauzerda: `http://localhost:5173`

### 2. Backend (Express + Sequelize + Swagger)
```bash
cd backend
npm run dev
```
Server `http://localhost:5000` da ishga tushadi.

### 3. API Hujjatlari (Swagger UI)
Server ishga tushgach brauzerda oching:
👉 **`http://localhost:5000/api-docs`**

Swagger orqali barcha endpointlarni to'g'ridan-to'g'ri test qilish mumkin:
- **Products**: `/api/products`, `/api/products/:id` (Qidiruv, saralash, kategoriya bo'yicha filter)
- **Orders & Checkout**: `/api/orders`, `/api/orders/:id`, `/api/orders/:id/status`
- **Users**: `/api/users`, `/api/users/search`, `/api/users/:id`
- **Customers**: `/api/customers`, `/api/customers/search`, `/api/customers/:id`
- **Customer Cards**: `/api/customer-cards`, `/api/customer-cards/search`, `/api/customer-cards/:id`
- **Subscribers**: `/api/subscribe`, `/api/subscribers`, `/api/subscribers/:id`

*(PostgreSQL jadvallari server ishga tushganda `sequelize.sync({ alter: true })` orqali avtomatik yaratiladi).*
