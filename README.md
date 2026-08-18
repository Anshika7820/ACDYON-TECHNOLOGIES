# HireFlow — Smart Job Application Workspace

> A focused, high-clarity job application command center built for the **Acdyon Technologies Frontend Engineering Assessment** (Part 2: Premium Home Page).

---

## 🌟 Architecture Overview

```
                 USER
                   ↓
      React 18 + Vite (Frontend)
                   ↓  REST API / HTTP
      Node.js + Express (Backend)
                   ↓
         Live Client State
```

- **Frontend (`frontend/`):** React 18, Vite 6, Tailwind CSS, Lucide Icons.
- **Backend (`backend/`):** Node.js, Express REST API (`GET /api/applications`, `PATCH /api/applications/:id/stage`, `POST /api/applications`, `GET /api/health`).

---

## 🌟 Key Features

- **Interactive Pipeline Simulator:** Live Kanban, Dense Data Table, and Funnel views demonstrating active stage progression.
- **Contextual Job Inspection:** Click any application card to review interview round debriefs, notes, and timeline milestones.
- **Stage Progression:** Advance opportunities across Wishlist, Applied, Interviewing, and Offer stages with live REST API updates.
- **Responsive at 390px & 1440px:** Mobile-tailored stage selector and touch targets with zero horizontal scrolling.
- **Complete Dark & Light Mode:** All-or-nothing theme toggle with persistent storage and zero unstyled flicker.
- **Command Palette (`⌘K`):** Fast keyboard-driven search and navigation.
- **Developer Easter Egg:** Discover the secret mode via the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`).

---

## 🚀 Quickstart (Running Locally)

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Start both Frontend & Backend
```bash
# Terminal 1 — Frontend (Vite)
npm run dev
# Running at http://localhost:5173

# Terminal 2 — Backend API (Express)
npm run backend:dev
# Running at http://localhost:5001
```

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Import repository to Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite** (`npm run build`, Output: `dist`).
4. (Optional) Set Environment Variable `VITE_API_URL` to your deployed backend URL.
5. Click **Deploy**.

### Backend Deployment (Render / Railway)
1. Import repository to Render as a Web Service.
2. Set **Root Directory** to `backend`.
3. Build Command: `npm install`.
4. Start Command: `node src/server.js`.
5. Environment Variables: `PORT=5001`.

---

## 📄 Design Rationale

See [`DECISIONS.md`](./DECISIONS.md) for the 1-page writeup on product strategy, time-boxed trade-offs, and engineering decisions.
