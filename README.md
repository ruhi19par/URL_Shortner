# URL_Shortner
# 📎 Project Requirements – URL Shortener API

A backend REST API that allows users to shorten long URLs, manage their URLs, and handle authentication securely.

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Docker & Docker Compose (optional but recommended)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

---

## 📦 Tech Stack Overview

| Category           | Technology            | Purpose                                  |
|--------------------|-----------------------|-------------------------------------------|
| Backend            | Node.js + Express     | REST API development                      |
| Database           | PostgreSQL            | Relational data storage                   |
| ORM                | Drizzle ORM           | Type-safe database queries and schema     |
| Containerization   | Docker + Docker Compose | Local PostgreSQL instance               |
| Authentication     | JWT                   | Securing private routes                   |
| Testing Tool       | Postman               | Manual API testing                        |

---

## 📦 NPM Dependencies

Run the following command to install all required packages:

```bash
npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv

## 🔐 Auth Routes

| Method | Endpoint   | Description                 | Auth Required |
|--------|------------|-----------------------------|---------------|
| POST   | `/signup`  | Register a new user         | ❌            |
| POST   | `/login`   | Login and receive token     | ❌            |

## 🔗 URL Routes

| Method | Endpoint        | Description                                              | Auth Required |
|--------|-----------------|----------------------------------------------------------|---------------|
| POST   | `/shorten`      | Create a short URL from a long one                       | ✅            |
| GET    | `/:shortCode`   | Redirect to the original URL                             | ❌            |
| GET    | `/urls`         | Get all URLs created by the logged-in user               | ✅            |
| DELETE | `/urls/:id`     | Delete a short URL (if it belongs to the user)           | ✅            |
