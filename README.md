# Linq Job Board

A job listings application built with React, TypeScript, and Vite. Features URL-synced search and filters, React Query for data fetching, and a responsive design with Tailwind CSS.

**Live demo:** https://linq-job-board.vercel.app
**Repository:** https://github.com/strudast/linq-job-board

---

## Tech stack

- **React 18** with **TypeScript** — type-safe component layer
- **Vite** — build tool and dev server
- **React Router v6** — client-side routing for list and details pages
- **TanStack Query (React Query)** — server-state management, caching, loading and error states
- **Tailwind CSS v4** — utility-first styling
- **Lucide React** — icon set

---

## Features

- Browse a paginated list of job postings
- Open a dedicated details page for each job
- Search jobs by title (debounced to avoid hammering the API)
- Filter by "actively recruiting" status
- Sort by publish date, ascending or descending
- All filter, search, sort, and pagination state lives in the URL — refresh-safe and shareable
- Loading, error, and empty states everywhere data is fetched

---

## Getting started

Prerequisites: Node.js 20 or newer.

```bash
git clone https://github.com/strudast/linq-job-board.git
cd linq-job-board
npm install
npm run dev
```

The app runs at http://localhost:5173.

To build for production:

```bash
npm run build
npm run preview
```

---

## Project structure

src/
├── components/         Reusable UI components
│   ├── CompanyAvatar.tsx
│   ├── JobCard.tsx
│   ├── JobFilters.tsx
│   ├── Pagination.tsx
│   ├── RecruitingBadge.tsx
│   └── SearchBar.tsx
├── hooks/
│   └── useDebounce.ts
├── lib/
│   ├── api.ts          API client and request shaping
│   └── types.ts        Job interface (matches API response)
├── pages/
│   ├── JobListPage.tsx
│   └── JobDetailsPage.tsx
├── App.tsx             Router and React Query providers
└── main.tsx

---

## Decisions & tradeoffs

**URL as the source of truth for filter state.** Search query, sort order, recruiting filter, and current page are all read from and written to URL search params via React Router's `useSearchParams`. This means:

- Refresh preserves state
- URLs are shareable (paste a filtered view to a colleague and they see the same thing)
- Browser back/forward buttons walk through filter history naturally
- No need for a separate state management library

The tradeoff is slightly more boilerplate when reading/writing params, but the UX win is substantial.

**React Query over `useEffect` + `fetch`.** TanStack Query handles caching, deduplication, loading and error states, and refetch logic out of the box. Each unique combination of filters becomes its own cache entry via the `queryKey`, so toggling back to a previous filter combo shows cached results instantly. Avoids reinventing the wheel and reduces stateful glue code.

**Debounced search.** The search input maintains local state for instant typing feedback, while a 300ms debounced version is synced to the URL and triggers the API call. Without the debounce, typing "engineer" would fire eight separate requests.

**`isFetching` vs `isLoading` to dim the list.** `isLoading` is true only on the very first fetch; `isFetching` covers every in-flight request. Dimming the list on subsequent refetches (filter changes, pagination) gives a subtle "something is happening" cue without flashing a jarring full-page loading state.

**Avatar color hashing instead of stored colors.** Company avatars get a deterministic color from a hash of the company name, so the same company always renders the same color without storing palette data per company.

**Tailwind v4 over a CSS framework or custom CSS.** The `@import "tailwindcss"` setup in v4 needs zero configuration — no `tailwind.config.js`, no PostCSS step. Speeds development without locking us into a heavy component library that would constrain the design.

**Semantic HTML for the details page.** The Job ID / Department / Job Type / etc. block uses a real `<dl>` / `<dt>` / `<dd>` definition list rather than divs, so screen readers announce it correctly as a list of key-value pairs.

**Filters reset pagination.** When the user changes search, sort, or recruiting filter, the page automatically returns to page 1. Otherwise a user on page 5 of "all jobs" who toggles a filter would see an empty page 5 of the narrower result set.

---

## What I'd add with more time

- **Tests.** A small Vitest + React Testing Library suite — at minimum, unit tests for `useDebounce` and integration tests confirming filter changes propagate to the URL.
- **Skeleton loaders** instead of plain "Loading…" text, for a more polished feel during fetches.
- **Page titles per route** using a small helper (or `react-helmet-async`) so browser tabs reflect the current job or filter context.
- **A 404 route** for unknown paths.
- **Optimistic prefetch** on card hover (`queryClient.prefetchQuery`) so opening a job from the list feels instant.
- **Accessibility audit** with axe DevTools — keyboard navigation between cards, focus states on filter controls, ARIA live regions for result count changes.
- **A small custom hook** to wrap the search-params read/write pattern, since it's repeated in a couple of places.

---

## API

Data comes from the MockAPI endpoint provided in the assessment:

https://69a17dae2e82ee536fa15e5d.mockapi.io/api/jobs

The `getJobs` and `getJobById` functions in `src/lib/api.ts` build query strings using `URLSearchParams` and throw on non-2xx responses so React Query can transition cleanly into its error state.