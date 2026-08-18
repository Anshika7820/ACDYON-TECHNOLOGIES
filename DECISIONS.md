# HireFlow — Design Decisions (Track 2: Premium Home Page)

**Product:** HireFlow — Smart Job Application Workspace  
**Assessment:** Acdyon Technologies Frontend Engineering Assessment  
**Track:** Part 2 — The Premium Home Page  

---

### 1. Why this approach over the alternative rejected?

I designed HireFlow as an **interactive job application workspace backed by a lightweight REST API**, rather than a static marketing landing page with non-functional screenshots.

The core requirement of the assessment was to showcase the product directly rather than just making claims about it. For a job search tool, the clearest way to demonstrate value within the first three seconds is to place the interactive pipeline front and center. A reviewer can immediately see active roles across Wishlist, Applied, Interviewing, and Offer stages, click to inspect interview notes and upcoming round context, or move a card to observe state progression.

I rejected building a marketing page with large 3D graphics or long feature comparison matrices because they get in the way of communicating what the product actually does. 

All application records shown in the demo are fictional and clearly labeled as such. I deliberately omitted testimonials, user counts, and partner badges that I could not substantiate, keeping the copy focused entirely on product utility.

---

### 2. One trade-off made under the time limit, and what I'd do with a real week.

**The Trade-off:**  
Because this is a time-limited frontend assessment, I structured the backend as a lightweight in-memory Express REST API with client-side fallback rather than implementing full user authentication, multi-tenant database persistence, or cloud sync. 

This allowed me to spend my available time where it mattered most for Track 2: typographic hierarchy, interaction polish, mobile responsiveness at 390px, and an all-or-nothing Light/Dark theme system.

**With a real week:**
1. **Persistent Database & Auth:** Connect the Express REST API to a PostgreSQL/Prisma datastore with Supabase/Clerk authentication for persistent candidate profiles.
2. **Automated End-to-End Testing:** Write Playwright test suites covering the core interaction path (filtering, card expansion, stage advancement) across mobile and desktop breakpoints.
3. **Interactive Offer Comparison:** Add an offer evaluation tool to model base salaries, equity components, and start dates side-by-side.

---

### 3. Where did I use AI tools, and what did I personally verify or change?

**Where AI Assisted:**  
I used AI during development for initial component boilerplate scaffolding, brainstorming realistic interview round stages, and checking CSS styling approaches.

**What I Personally Designed, Changed, and Verified:**
- **Product Flow & Layout:** I decided the structure of the homepage, placing the interactive pipeline right beneath the hero to minimize time-to-value.
- **Mobile Responsive Architecture (390px):** I redesigned the 4-column desktop Kanban into an active stage tabbed view on mobile screens (<768px) to guarantee zero horizontal overflow and comfortable touch targets.
- **Frontend <-> Backend Integration:** I connected the frontend to the REST endpoints (`GET /api/applications`, `PATCH /api/applications/:id/stage`) with optimistic client updates.
- **Theme & Accessibility:** I implemented the Light/Dark mode token architecture and added `@media (prefers-reduced-motion)` support.
- **Content Honesty:** I reviewed and replaced marketing claims with straightforward, honest copy and added clear demo data disclosures.
