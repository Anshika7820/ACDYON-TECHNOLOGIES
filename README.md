# HireFlow — Smart Job Application Command Center

> Built for the **Acdyon Technologies Frontend Engineering Assessment** (Part 2: Premium Home Page).

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-6366f1?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)

---

## 🌟 Overview & Assessment Alignment

**HireFlow** is a purpose-built, high-clarity job application command center engineered for software engineers, product designers, and technical candidates.

### Assessment Track 2 Requirement Compliance:

| Assessment Requirement | HireFlow Implementation |
| :--- | :--- |
| **Clear Value Proposition + Hero CTA** | Hero headline, value proposition, immediate interactive demo trigger, command menu. |
| **Shows the Product (Not Just Claims)** | Interactive Kanban Pipeline, Dense Data Table, Funnel Analytics, and round inspector drawer with real-world tech roles. |
| **Motion / Micro-Interaction That Earns Its Keep** | Smooth card elevation, live metric counter recalculations, dynamic stage advancement, and view transitions. |
| **Responsive at 390px & 1440px (No Horizontal Scroll)** | Mobile-tailored stage tabs and slide-out navigation for 390px viewports; multi-column grid at 1440px desktop. |
| **All-or-Nothing Dark Mode Support** | Complete Dark/Light mode theme system with CSS variables, persistence, and zero unstyled flicker. |
| **Honesty Over Fluff (No Fake Social Proof)** | Absolutely zero fabricated testimonials, zero fake user counts, zero misleading partner logos. |
| **Bonus Round Easter Egg** | Unlocked via the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) or **5 clicks on the HireFlow logo**! |
| **1-Page DECISIONS.md** | Complete written rationale defending all design choices, trade-offs, and AI verification. |

---

## 📁 Repository Structure

```
hireflow/
├── frontend/                  # React + Vite + Tailwind CSS Client Application
│   ├── public/                # Static assets (logo SVG)
│   ├── src/
│   │   ├── components/        # Modular UI components (Navbar, Hero, DashboardMockup, etc.)
│   │   ├── context/           # ThemeContext (complete light/dark mode)
│   │   ├── data/              # Realistic application dataset & stage constants
│   │   ├── App.jsx            # Main app orchestrator & Easter egg listener
│   │   ├── main.jsx           # Entrypoint
│   │   └── index.css          # Design system tokens & utility classes
│   ├── index.html             # HTML5 document with Google fonts and SEO metadata
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Custom design system configuration
│   └── vite.config.js         # Vite bundler configuration
│
├── backend/                   # Node.js + Express REST API Server
│   ├── src/
│   │   ├── routes/            # /api/applications and /api/health routes
│   │   ├── data/              # Seed application records
│   │   └── server.js          # Express app entrypoint with CORS & logging
│   ├── package.json           # Backend dependencies
│   └── .env.example           # Environment variables template
│
├── DECISIONS.md               # Mandatory 1-page assessment engineering writeup
├── README.md                  # Complete documentation
└── package.json               # Root monorepo scripts for easy local execution
```

---

## 💻 Local Quickstart

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Run Frontend (Vite)
```bash
npm run dev
# Running at http://localhost:5173
```

### 3. Run Backend (Express API)
```bash
npm run backend:dev
# Running at http://localhost:5000
```

---

## 🚀 Deployment Instructions

### Deploy Frontend (Vercel / Netlify / GitHub Pages)
1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New Project"** and select your repository.
4. Set **Root Directory** to `frontend`.
5. Framework Preset: **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
6. Click **Deploy**.

### Deploy Backend (Optional - Render / Railway)
1. Set **Root Directory** to `backend`.
2. Start Command: `node src/server.js`.
3. Port: `5000` (or `PORT` environment variable).

---

## 📄 Submission Checklist

- [x] Live Deployed URL
- [x] GitHub Repository Link
- [x] 1-Page `DECISIONS.md`
- [x] Form submission: [Acdyon Assessment Form](https://forms.gle/qeqpHhvYGWA3ftY69)
