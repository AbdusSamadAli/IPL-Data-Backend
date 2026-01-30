# IPL Data Platform – Backend

This repository contains the backend APIs for the IPL Data Platform.  
It exposes IPL data stored in PostgreSQL via REST APIs, documented using OpenAPI (Swagger).

---

## 🔗 Deployed URLs

- **Backend Base URL:**  
  https://ipl-data-backend.onrender.com

- **Swagger / OpenAPI Docs:**  
  https://ipl-data-backend.onrender.com/api-docs

- **Health Check:**  
  https://ipl-data-backend.onrender.com/health

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API Documentation:** Swagger (OpenAPI 3.0)
- **Deployment:** Render

---


---

## 📊 API Endpoints

### Health
- `GET /health`

### Matches (pagination supported)
- `GET /matches?page=1&limit=5`

### Standings
- `GET /standings`

### Team Statistics
- `GET /teams/runs-stats`
- `GET /teams/wickets-stats`

### Player Statistics
- `GET /stats/top-wickets`

---

## 🧪 API Documentation (Swagger)

All APIs are documented using OpenAPI.

👉 Access Swagger UI here:  
**https://ipl-data-backend.onrender.com/api-docs**

---

## ⚙️ Local Setup

### 1️⃣ Clone repo
```bash
git clone https://github.com/your-username/IPL-Data-Backend.git
cd IPL-Data-Backend

Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/ipl_db
PORT=8000

4️⃣ Run migrations
npx prisma migrate dev

5️⃣ Start server
npm start


Server runs at http://localhost:8000

🗄️ Database

PostgreSQL relational schema

Tables: Match, Team, Standing

Managed using Prisma migrations

✅ Features Implemented

REST APIs returning JSON

Pagination support

Error handling & validation

Health check endpoint

OpenAPI documentation

Deployed backend
