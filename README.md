# 🎬 Movie Search App

A full-stack movie search and collection manager built with **Next.js 16** + **Laravel 12** + **MySQL**. Browse, search, add, and manage your personal movie collection with a modern dark-themed UI.

## ✨ Features

- 🔍 **Search movies** by title or genre
- ➕ **Add movies** with title, year, genre, description, and poster URL
- 🖼️ **Movie grid** with poster cards
- 📄 **View full movie details** on a dedicated page
- 🗑️ **Delete movies** from your collection
- 🌙 **Fully responsive** dark-themed UI

## 🛠️ Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| Backend  | Laravel 12, PHP                           |
| Database | MySQL / SQLite (configurable)             |
| API      | RESTful JSON API                          |

## 🚀 Setup

### Prerequisites

- Node.js 18+
- PHP 8.2+
- Composer
- MySQL (or use SQLite for development)

### Backend

```bash
cd backend
composer install
cp .env.example .env
# Edit .env: set DB_DATABASE=movie_search (or use SQLite default)
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/movies`        | List / search movies     |
| POST   | `/api/movies`        | Create a movie           |
| GET    | `/api/movies/{id}`   | Get movie details        |
| DELETE | `/api/movies/{id}`   | Delete a movie           |

**Query parameters for `GET /api/movies`:**

| Param    | Example       | Description                     |
| -------- | ------------- | ------------------------------- |
| `search` | `?search=bat` | Search by title or genre        |
| `genre`  | `?genre=Action` | Filter by genre               |

## 📁 Project Structure

```
movie-search-app/
├── frontend/               # Next.js 16 application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # API client utilities
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/   # API controllers
│   │   └── Models/             # Eloquent models
│   ├── config/             # Configuration files
│   ├── database/           # Migrations and seeders
│   ├── routes/             # Route definitions
│   └── composer.json
└── README.md
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<!-- [2024-08-18] feat: initialize Movie Search app layout with search hero banner -->
