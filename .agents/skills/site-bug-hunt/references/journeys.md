# Priority journeys (Playwright Movies App)

Use these as an exploration map for `site-bug-hunt`. Paths are app-relative (prepend `basePath` `/playwright-movies-app` on GitHub Pages).

## 1. Logged-out home / browse

- `/` — popular / featured movies render  
- Category or sidebar browse (Popular, Top Rated, etc.)  
- Header branding, dark-mode toggle, search affordance  

## 2. Search

- Open search, type a known title, submit  
- Results list shows posters/titles; open one result  

## 3. Movie detail

- `/movie?id=<id>` — title, overview, artwork/poster, cast if present  
- Trailer / video modal if offered  
- Desktop **and** one mobile viewport (~375px): poster must stay readable (not full-bleed overflow)  

## 4. Auth

- Log In control → login form  
- Mock accepts any non-empty credentials  
- After login: user menu / profile affordance visible  

## 5. My Lists (logged-in)

- Open My Lists  
- Create a list (name + description)  
- Add a movie from search/detail into a list  
- View list detail; delete/share dialogs if present  
- Empty state: single `<main>`, no broken empty SVG  

## 6. Mobile chrome

- Viewport ~375×812  
- Hamburger opens nav drawer (`role="dialog"`)  
- Drawer: Escape closes; Tab stays inside; close control has a name  
- Lists and detail remain usable (no clipped primary CTA / poster flood)  

## 7. Obvious a11y smoke

- One primary `<main>` landmark per page  
- Icon-only controls have accessible names (`getByRole('button', { name: … })`)  
- Headings present on home / detail / lists  
- No keyboard trap on drawer/modals beyond intentional focus containment  

## Error paths

- Unknown route → sensible not-found / empty treatment  

## Related automated coverage

Existing specs live in `tests/` (`logged-out/`, `logged-in/`, helpers in `tests/helpers/`). Prefer discovering gaps the suite doesn’t cover (visual breakage, landmark mistakes, unnamed controls, mobile layout) rather than only re-walking what CI already asserts.
