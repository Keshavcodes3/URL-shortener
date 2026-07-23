🔗 URL Shortener

A production-inspired URL Shortener built with Node.js, Express, TypeScript, MongoDB, and Redis. This project was built to understand backend architecture, caching strategies, and system design concepts—not just CRUD.

🚀 Features
Create short URLs
Redirect using short codes (302 Redirect)
URL validation
Unique short code generation with NanoID
Redis Cache (Cache-Aside Pattern)
Cache invalidation on delete
URL expiration support
Layered Architecture (Controller → Service → Repository)
TypeScript support
🏗️ Architecture
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
Redirect Flow
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
🧠 Concepts Learned
Cache-Aside Pattern
Redis Caching
Cache Invalidation
Layered Architecture
Repository Pattern
HTTP Redirects (302)
URL Expiration Strategy
REST API Design
Source of Truth (MongoDB vs Redis)
Error Handling
🛠️ Tech Stack
Node.js
Express.js
TypeScript
MongoDB + Mongoose
Redis
NanoID
📁 Project Structure
src
├── controllers
├── services
├── repositories
├── models
├── routes
├── validators
├── utils
├── config
└── server.ts
⚙️ Environment Variables

Create a .env file:

PORT=3000

MONGO_URI=your_mongodb_connection_string

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password

SITE_URL=http://localhost:3000
📌 API Endpoints
Create Short URL
POST /api/v1/url/shorten
Request
{
  "originalUrl": "https://github.com/keshavcodes3"
}
Response
{
  "data": {
    "originalUrl": "https://github.com/keshavcodes3",
    "shortUrl": "http://localhost:3000/6W-Cu"
  }
}
Redirect
GET /api/v1/url/:shortCode

Redirects the client to the original URL.

Delete URL
DELETE /api/v1/url/:shortCode

Deletes the URL from MongoDB and invalidates the Redis cache.

🚀 Getting Started
git clone <your-repository-url>

cd url-shortener

npm install

npm run dev
📖 What This Project Focuses On

This project wasn't built to clone Bitly feature-by-feature. It was built to understand how backend systems are designed.

Some of the key design decisions include:

MongoDB is the source of truth.
Redis is used as a cache, not permanent storage.
Redirects follow the Cache-Aside pattern.
Cache entries are invalidated when a URL is deleted.
Expired URLs are cleaned up using lazy expiration during access.
🔮 Future Improvements
Custom aliases
Authentication
Click analytics dashboard
Rate limiting
QR code generation
Background jobs with BullMQ
Docker support
Unit & Integration tests
Monitoring & Logging
👨‍💻 Author

Keshav Chetri

Built as part of my backend engineering journey to deeply understand caching, system design, and scalable API architecture.