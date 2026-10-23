# 🏺 Heritage Grove — Artisanal Wood-Fired Ceramics & Living Objects

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize_ORM-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger UI](https://img.shields.io/badge/API_Docs-Swagger-85EA2D?logo=swagger&logoColor=black)](http://localhost:5000/api-docs)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Heritage Grove** — yuqori konversiyali, zamonaviy dizayn va qadimiy kulolchilik falsafasini uyg'unlashtirgan premium e-tijorat va ko'rgazma landing sahifasi. Tabiiy daryo gili, 1,320°C anagama o'tin xumdonlari va barqaror san'at asarlari uchun yaratilgan to'liq stekli (Full-stack) veb-platforma.

---

## 📸 Asosiy Bo'limlar va Imkoniyatlar (Landing Page Architecture)

1. **🏛️ Hero Section**:
   - Jonli 4.96/5 kolleksionerlar reytingi, 1,320°C xumdon kafolati va sug'urtalangan xalqaro kuryer belgilari.
   - Tezkor kolleksiyani o'rganish va studiya falsafasiga o'tish tugmalari.
2. **📰 Press & Editorial Strip**:
   - *Architectural Digest*, *Vogue Living*, *Elle Décor*, *Kinfolk*, *Dezeen* kabi global dizayn nashrlari taqrizlari.
3. **✨ Seasonal Ceramic Collection**:
   - Toifalash (Vases, Tableware, Decor), qidiruv va narx/nom bo'yicha dinamik saralash.
   - **Quick View Modal** (`createPortal` asosida, ekranni to'liq qoplovchi va markazlashgan interaktiv oyna).
   - PostgreSQL API (`/api/products`) bilan to'liq sinxronlashgan.
4. **💎 The 4 Artisanal Standards (Pillars)**:
   - 100% Wild Riverbank Clay, 72-Hour Anagama Reduction, Living Heirloom Durability, White-Glove Global Delivery.
5. **📜 Roots & Craft Philosophy**:
   - O'tin xumdoni va usta kulollar tarixi, statistika metrikalari.
6. **⏳ The 4-Stage Alchemical Craft Journey**:
   - 01. Geologik qazib olish ➔ 02. Charxda shakllantirish ➔ 03. Tabiiy kul siri ➔ 04. 1,320°C olovda pishirish bosqichlari.
7. **🏡 Curated In Situ Lookbook**:
   - Choy xonasi, pentxaus stoli, kamin usti va studiya javonlarida mahsulotlarning interaktiv galereyasi.
8. **🔄 Infinite Reviews Marquee**:
   - O'ngdan chapga uzluksiz aylanib turuvchi tasdiqlangan kolleksionerlar sharhlari (hover qilinganda avtomatik to'xtaydi).
9. **💳 Heritage Member Guild**:
   - 3D interaktiv aylanuvchi virtual karta va PostgreSQL orqali ro'yxatdan o'tkazuvchi a'zolik modali.
10. **❓ Frequently Asked Inquiries (FAQ)**:
    - Oziq-ovqat xavfsizligi, yetkazib berish va shaxsiy buyurtmalar bo'yicha interaktiv akkordeon.
11. **🛎️ Studio Concierge Consultation**:
    - Restoranlar, arxitektorlar va maxsus to'plamlar uchun to'g'ridan-to'g'ri bron qilish shakli.
12. **📬 The Gazette & Private Dispatch**:
    - 15% xush kelibsiz chegirma kodi (`HERITAGE15`), bitta bosishda nusxalash va mavzular filtri.
13. **🛒 Savat va Xarid Tizimi (Cart Drawer & Checkout)**:
    - Silliq ochiluvchi savat, tovar sonini boshqarish va PostgreSQL `/api/orders` ga yoziluvchi buyurtma modali.
14. **⚡ Dynamic Island Toasts & Floating Dock**:
    - Ekranning yuqori markazida paydo bo'luvchi (savatni to'sib qo'ymaydigan) zamonaviy bildirishnomalar va tezkor navigatsiya tugmalari.

---

## 🛠️ Texnologiyalar Steki

| Qatlam | Texnologiyalar |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS (CSS Variables, Glassmorphism, Micro-animations), Cormorant Garamond & Poppins Google Fonts |
| **Backend** | Node.js, Express.js, CORS, Joi Validation, Swagger UI |
| **Ma'lumotlar Bazasi** | PostgreSQL, Sequelize ORM (`sequelize.sync({ alter: true })`) |
| **SEO & Performance** | OpenGraph meta teglari, Twitter Card, Schema.org JSON-LD mikroformat, WebP & SVG grafikasi |

---

## 📁 Loyiha Tuzilmasi

```text
HeritageGrove/
├── frontend/
│   ├── public/
│   │   └── favicon.svg              # Brend SVG logotipi
│   ├── src/
│   │   ├── api/                     # Backend bilan aloqa (subscribe, products, etc.)
│   │   ├── components/
│   │   │   ├── Header/              # Sticky header va silliq ofsetli navigatsiya
│   │   │   ├── Hero/                # Bosh sahifa va ishonch nishonlari
│   │   │   ├── PressBar/            # Global OAV sharhlari paneli
│   │   │   ├── FeaturedProducts/    # Katalog, qidiruv, saralash va Quick View
│   │   │   ├── ArtisanalPillars/    # 4 ta asosiy sifat ustuni
│   │   │   ├── StorySection/        # Kulolchilik tarixi va statistika
│   │   │   ├── CraftProcess/        # 4 bosqichli hunarmandchilik tsikli
│   │   │   ├── Lookbook/            # Yashash muhitlari interaktiv galereyasi
│   │   │   ├── Testimonials/        # O'ngdan chapga aylanuvchi Marquee sharhlar
│   │   │   ├── MemberCardPreview/   # 3D aylanuvchi virtual a'zolik kartasi
│   │   │   ├── FaqSection/          # Ko'p beriladigan savollar akkordeoni
│   │   │   ├── FullNewsletterSection/# Gazette axborotnomasi va 15% vaucher
│   │   │   ├── Footer/              # Video fonli to'liq footer
│   │   │   ├── CartDrawer/          # Savat paneli
│   │   │   ├── CheckoutModal/       # Buyurtmani rasmiylashtirish
│   │   │   ├── StudioConcierge/     # Studiya konsultatsiyasi modali
│   │   │   ├── FloatingNav/         # Suzuvchi tezkor tugmalar (Back-to-top)
│   │   │   └── Toast/               # Ekranning yuqori markazidagi bildirishnomalar
│   │   ├── data/                    # Fallback ma'lumotlar va doimiy kontent
│   │   ├── hooks/                   # useScrollReveal kabi maxsus hooklar
│   │   ├── GlobalStyles.css         # Asosiy dizayn tizimi va o'zgaruvchilar
│   │   ├── App.jsx                  # Asosiy ilova kompozitsiyasi
│   │   └── main.jsx                 # React root render
│   ├── index.html                   # SEO, OpenGraph, JSON-LD
│   └── vite.config.js
│
├── backend/
│   ├── config/                      # PostgreSQL ma'lumotlar bazasi konfiguratsiyasi
│   ├── controller/                  # Mahsulotlar, buyurtmalar, mijozlar logikasi
│   ├── models/                      # Sequelize modellari (Product, Order, Customer, Card, etc.)
│   ├── routes/                      # Express marshrutlari
│   ├── swagger/                     # OpenAPI 3.0 / Swagger spetsifikatsiyalari
│   ├── validations/                 # Joi kirish tekshiruvlari
│   ├── app.js                       # Express serveri
│   └── package.json
│
└── README.md
```

---

## 🚀 Ishga Tushirish Qo'llanmasi

### Talablar:
- Node.js (v18 yoki undan yuqori)
- PostgreSQL o'rnatilgan va ishga tushirilgan bo'lishi lozim.

### 1. Backend Serverni Ishga Tushirish
```bash
cd backend
npm install
npm run dev
```
- Server: **`http://localhost:5000`**
- **Swagger API Hujjatlari:** 👉 **`http://localhost:5000/api-docs`**

### 2. Frontend Mijozni Ishga Tushirish
```bash
cd frontend
npm install
npm run dev
```
- Brauzerda oching: 👉 **`http://localhost:5173`**

---

## 🌐 API Endpoints (Swagger UI orqali test qilinadi)

| Metod | Endpoint | Tavsif |
|---|---|---|
| `GET` | `/api/products` | Barcha mahsulotlar (Kategoriya, qidiruv va saralash bilan) |
| `GET` | `/api/products/:id` | Bitta mahsulot tafsilotlari |
| `POST` | `/api/orders` | Yangi buyurtma yaratish (Checkout) |
| `GET` | `/api/orders/:id` | Buyurtma holatini ko'rish |
| `POST` | `/api/subscribe` | Yangi obunachini ro'yxatga olish |
| `GET` | `/api/customer-cards` | Virtual kolleksioner kartalari ro'yxati |
| `POST` | `/api/customer-cards` | Yangi a'zolik kartasini chiqarish |

---

## 📄 Litsenziya
Ushbu loyiha [MIT](LICENSE) litsenziyasi asosida tarqatiladi.
barcha huquqlar himoyalangan © 2026 **Heritage Grove Guild**.
