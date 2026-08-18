# HireFlow — Design Decisions (Track 2: Premium Home Page)

**Product:** HireFlow — Smart Job Application Workspace  
**Assessment:** Acdyon Technologies Frontend Engineering Assessment  
**Track:** Part 2 — The Premium Home Page  

---

### 1. Why this approach over the alternative rejected?

I chose to put the working interactive application pipeline immediately below the hero because the assessment asks to show the product directly, not just describe it. 

For a job search tool, value is communicated by showing active roles across Wishlist, Applied, Interviewing, and Offer stages, allowing a reviewer to inspect interview debrief notes or advance a card across stages within the first three seconds.

I rejected building a traditional SaaS marketing landing page with large 3D illustrations, fake user counts ("10,000 active users"), or fabricated customer testimonials. Every company name in the workspace (`Northstar Labs`, `Orbit Systems`, `PixelForge`, etc.) is 100% fictional demo data and explicitly labeled as such.

---

### 2. One trade-off made under the time limit, and what I'd do with a real week.

**The Trade-off:**  
Because Track 2 specifically evaluates the home page experience, UI craft, and mobile responsiveness, I structured the backend as a lightweight Node + Express REST API using in-memory state with client fallback rather than provisioning a multi-tenant database (PostgreSQL/MongoDB) or user authentication.

This allowed me to focus my available time where it mattered most for this assessment: 390px mobile tabbed UX, dynamic analytics calculation, full-stack REST API wiring (`GET`, `POST`, `PATCH`, `DELETE`), and an all-or-nothing Light/Dark theme system with zero FOUC flicker.

**With a real week:**
1. **Persistent Database & Auth:** Connect Express to PostgreSQL with Prisma ORM and Clerk/Supabase Auth for multi-user persistent profiles.
2. **Automated End-to-End Testing:** Add Playwright test coverage for stage transitions, search filtering, and 390px touch interaction paths.
3. **Offer Evaluation Tooling:** Add a side-by-side offer comparison tool modeling base salaries, equity vesting schedules, and start dates.

---

### 3. Where did I use AI tools, and what did I personally verify or change?

**Where AI Assisted:**  
AI was used for initial component boilerplate scaffolding, brainstorming realistic interview round scenarios, and syntax verification for Tailwind utility classes.

**What I Personally Designed, Verified, and Tested Line-by-Line:**
- **Product Architecture & Layout:** Designed the homepage layout and placed the interactive dashboard front-and-center.
- **390px Mobile Engineering:** Built the mobile stage selector tab bar (`<768px`) to guarantee zero horizontal page overflow (`scrollWidth === innerWidth`).
- **REST API & Data Boundary:** Implemented and tested all Express endpoints (`/api/health`, `/api/applications`, `/api/applications/:id`, `POST`, `PATCH`, `DELETE`) with strict stage validation (`400 Bad Request`).
- **Dynamic Analytics & State:** Implemented live calculations for conversion rates, offer titles, and average compensation targets.
- **Zero-FOUC Theme System:** Added immediate theme initialization in `<head>` to prevent unstyled flicker before hydration.
