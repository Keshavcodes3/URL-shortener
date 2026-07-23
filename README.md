📌 This project is a solution to the roadmap.sh URL Shortening Service challenge.
<br>
Challenge: <strong><https://roadmap.sh/projects/url-shortening-service></strong>

<div align="center">

# 🔗 URL Shortener

**A production-inspired URL Shortener built with Node.js, Express, TypeScript, MongoDB & Redis.**

Built to understand **backend architecture**, **caching**, and **system design** rather than just CRUD APIs.

<br>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)

</div>

---

# ✨ Features

* 🔗 Shorten long URLs
* ⚡ Fast redirects using Redis Cache
* 🛡️ URL validation
* 🎲 Unique shortcode generation using NanoID
* 🗑️ Delete URLs
* ♻️ Cache invalidation
* ⏳ URL expiration support
* 🏗️ Layered Architecture
* 💙 Built with TypeScript

---

# 🏗️ Architecture

```text
                Client
                   │
                   ▼
            Express Router
                   │
                   ▼
             Controller Layer
                   │
                   ▼
              Service Layer
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 Repository Layer          Redis Cache
        │                     │
        ▼                     │
     MongoDB ◄────────────────┘
```

<br>

## Redirect Flow

```text
GET /:shortCode
        │
        ▼
Check Redis Cache
        │
   ┌────┴────┐
   │         │
 HIT       MISS
   │         │
   ▼         ▼
Redirect   MongoDB
              │
              ▼
        URL Found?
         │      │
        No     Yes
         │       │
      404      Expired?
                 │
           ┌─────┴─────┐
           │           │
          Yes         No
           │           │
Delete from DB      Cache URL
Delete from Redis      │
           │           ▼
        410 Gone    Redirect
```

---

# 🧠 System Design Concepts

| Concept              | Implemented |
| -------------------- | :---------: |
| Cache Aside Pattern  |      ✅      |
| Redis Caching        |      ✅      |
| Cache Invalidation   |      ✅      |
| Layered Architecture |      ✅      |
| Repository Pattern   |      ✅      |
| HTTP Redirects       |      ✅      |
| URL Expiration       |      ✅      |
| REST API Design      |      ✅      |
| Source of Truth      |      ✅      |

---

# 🛠️ Tech Stack

| Category     | Technology         |
| ------------ | ------------------ |
| Runtime      | Node.js            |
| Framework    | Express.js         |
| Language     | TypeScript         |
| Database     | MongoDB + Mongoose |
| Cache        | Redis              |
| ID Generator | NanoID             |

---

# 📂 Folder Structure

```text
src
│
├── config
├── controllers
├── models
├── repositories
├── routes
├── services
├── utils
├── validators
└── server.ts
```

---

# ⚙️ Environment Variables

```env
PORT=3000

MONGO_URI=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=default
REDIS_PASSWORD=

SITE_URL=http://localhost:3000
```

---

# 📡 API Endpoints

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/v1/url/shorten`    | Create Short URL         |
| GET    | `/api/v1/url/:shortCode` | Redirect to Original URL |
| DELETE | `/api/v1/url/:shortCode` | Delete Short URL         |

---

## Create URL

### Request

```json
{
  "originalUrl": "https://github.com/keshavcodes3"
}
```

### Response

```json
{
  "data": {
    "originalUrl": "https://github.com/keshavcodes3",
    "shortUrl": "http://localhost:3000/6W-Cu"
  }
}
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/<your-username>/url-shortener.git
```

Move into the project

```bash
cd url-shortener
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# 🎯 What I Learned

This project helped me understand backend engineering beyond CRUD.

* How the **Cache Aside Pattern** works
* Why **MongoDB is the source of truth**
* Why **Redis is only a cache**
* Cache invalidation strategies
* HTTP Redirects (`302`)
* URL expiration
* Layered Architecture
* Repository Pattern
* Backend trade-offs
* Designing scalable APIs

---

# 🚧 Future Improvements

* [ ] Custom aliases
* [ ] Authentication
* [ ] Analytics dashboard
* [ ] Rate limiting
* [ ] QR Code generation
* [ ] BullMQ background jobs
* [ ] Docker support
* [ ] Unit & Integration Tests
* [ ] Monitoring & Logging

---

# 👨‍💻 Author

**Keshav Chetri**

First-year Computer Science student passionate about Backend Engineering, System Design, and Building in Public.

If you found this project useful, consider ⭐ starring the repository.
