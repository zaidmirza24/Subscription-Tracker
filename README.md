
# Subscription Tracker 📋

A backend service for managing user subscriptions — track subscription details like price, frequency, category, and status.

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- Middleware (Error handling, Authentication)

## 📂 Project Structure
```
.
├── config/         # MongoDB connection
├── controllers/    # Business logic
├── database/       # Sample or seed data (optional)
├── middleware/     # Custom middlewares (auth, error handlers)
├── models/         # Mongoose models
├── routes/         # API routes
├── .env.*          # Environment variables
└── app.js          # Entry point
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/zaidmirza24/Subscription-Tracker.git
cd Subscription-Tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file and add the following:
```
MONGODB_URI=your_mongodb_connection_string
PORT=your_desired_port
JWT_SECRET=your_jwt_secret_key
```
(Or you can edit `.env.development.local` and `.env.production.local`.)

### 4. Run the server
```bash
npm start
```
Server will start on `http://localhost:PORT`.

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|:------:|:--------:|:-----------:|
| GET    | `/api/users/:id/subscriptions` | Get subscriptions of a user |
| POST   | `/api/subscriptions`           | Create a new subscription |
| PUT    | `/api/subscriptions/:id`        | Update a subscription |
| DELETE | `/api/subscriptions/:id`        | Delete a subscription |

_(More routes can be added as needed.)_

---

## ✨ Features
- Secure route access (user can only access their own subscriptions).
- Automatically calculates renewal dates if missing.
- Automatically updates subscription status (active, expired, etc.).
- Centralized error handling.
- Input validation using Mongoose.

---

## 🧑‍💻 Author
- [Zaid Mirza](https://github.com/zaidmirza24)

---
