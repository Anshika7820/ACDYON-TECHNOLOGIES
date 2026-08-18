# HireFlow — Smart Job Application Workspace

> Premium job application workspace built for the **Acdyon Technologies Frontend Engineering Assessment** (Track 2 — Premium Home Page).

### 🚀 Submission Links
- **GitHub Repository:** [https://github.com/Anshika7820/ACDYON-TECHNOLOGIES](https://github.com/Anshika7820/ACDYON-TECHNOLOGIES)
- **Live Frontend (Vercel):** `https://hireflow-workspace.vercel.app` *(or your Vercel deployment URL)*
- **Live REST API (Render):** `https://hireflow-api.onrender.com/api/health`

---

## 🌟 Architecture Overview

```
                 USER
                   │
       React 18 + Vite (Frontend)
                   │
           REST API / HTTP
                   │
      Node.js + Express (Backend)
                   │
        In-Memory Seed State
```

- **Frontend (`frontend/`):** React 18, Vite 6, Tailwind CSS, Lucide Icons, ThemeContext.
- **Backend (`backend/`):** Node.js, Express REST API (`GET /api/health`, `GET /api/applications`, `GET /api/applications/:id`, `POST /api/applications`, `PATCH /api/applications/:id`, `DELETE /api/applications/:id`).

> **Engineering Note on Persistence:** The backend intentionally uses in-memory seed state because database persistence was outside the scope of this time-boxed Track 2 home page assessment. All company names and application records are 100% fictional demo data (`Northstar Labs`, `Orbit Systems`, `PixelForge`, etc.).

---

## 🌟 Key Features

- **Interactive Pipeline Simulator:** Live Kanban, Dense Data Table, and Funnel views demonstrating active stage progression.
- **Dynamic Analytics:** Real-time calculation of interview conversion rates, active offer titles, average compensation targets, and pipeline volume distribution.
- **Contextual Job Inspector:** Click any application card to review interview debriefs, compensation ranges, next steps, and stage timelines.
- **Stage Progression & Micro-Toasts:** Advance opportunities across Wishlist, Applied, Interviewing, and Offer stages with live REST API updates and instant toast feedback.
- **Responsive at 390px & 1440px:** Mobile-tailored stage selector tab bar and touch targets with zero horizontal scrolling.
- **Zero-FOUC Dark & Light Mode:** Immediate theme script in `<head>` preventing unstyled flicker before React hydration.
- **Command Palette (`Ctrl+K` / `⌘K`):** Fast keyboard-driven search and navigation across tracked applications.
- **Developer Easter Egg:** Discover the architecture overview modal via the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`).

---

## 🚀 Quickstart (Running Locally)

### Option A — Standard Monorepo Commands (From Root)
```bash
# Install dependencies across monorepo
npm run install:all

# Terminal 1 — Start Frontend (http://localhost:5173)
npm run dev

# Terminal 2 — Start Backend API (http://localhost:5001)
npm run backend:dev
```

### Option B — Subdirectory Commands
```bash
# Terminal 1 — Frontend
cd frontend
npm install
npm run dev

# Terminal 2 — Backend
cd backend
npm install
npm run dev
```

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Import repository to Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite** (`npm run build`, Output: `dist`).
4. Set Environment Variable `VITE_API_URL` to your deployed backend URL.
5. Click **Deploy**.

### Backend Deployment (Render / Railway)
1. Import repository to Render as a Web Service.
2. Set **Root Directory** to `backend`.
3. Build Command: `npm install`.
4. Start Command: `node src/server.js`.
5. Environment Variables: `PORT=5001`.

---

## 📄 Design Rationale

See [`DECISIONS.md`](./DECISIONS.md) for the 1-page writeup on product strategy, time-boxed trade-offs, and line-by-line engineering decisions.
