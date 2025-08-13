# Off-Grid Freedom Project Checklist

Status legend: ✅ Done | 🔄 In Progress / Partial | ⏳ Not Started | ⚠️ Needs Attention

---
## 1. Repository & Project Structure
- ✅ Monorepo root with `frontend/`, `content/`, `research/`, `docs/`
- ⏳ Missing planned `backend/` directory (present in docs but not implemented)
- ✅ `docker-compose.yml` scaffolded with services (backend, postgres, redis, meilisearch, frontend)
- ⏳ No `docker/` directory (referenced in README) — create for init scripts (only partial: postgres-init path referenced but absent)
- ✅ Research docs (phase1, phase2 week2) present
- ✅ Tech stack & planning documents (`techstack.md`, `plan.md`, `mvp.md`)

## 2. Frontend (Next.js App Router)
- ✅ Next.js 15 + React 19 configured
- ✅ Tailwind CSS + typography plugin integrated
- ✅ MDX pipeline (`mdx.ts` using next-mdx-remote/rsc, remark/rehype plugins)
- ✅ Guide pages: dynamic `[...slug]`, category pages, search page, guides index
- ✅ Admin UI skeleton: dashboard, guide CRUD (create, edit, list, delete) pages
- 🔄 Admin navigation links reference routes not yet implemented (`/admin/users`, `/admin/analytics`, `/admin/settings`, preview route)
- ✅ Dark mode styles (utility-based)
- 🔄 Accessibility: basic semantics ok, but needs audit (ARIA for nav, form labels completeness, focus outlines)
- ✅ Reusable UI components (buttons, cards, layout)
- ⏳ Table of Contents or MDX component mapping not fully leveraged (file exists but not confirmed wired)
- 🔄 Code preview in editor uses naive `dangerouslySetInnerHTML` (needs real MDX rendering / sanitization)
- ⚠️ Inconsistent content source paths between admin PUT/POST endpoints (`../content/en` vs `src/content/guides`)

## 3. Content System (MDX)
- ✅ Parsing frontmatter, metadata interfaces defined
- ✅ Sample guides in `content/en/...`
- 🔄 Internationalization structure planned (`de`, `es` folders exist but empty)
- ⏳ Validation for required frontmatter fields (no runtime/schema validation)
- ⏳ Automated slug collision detection / duplicate prevention
- 🔄 No incremental build / cache strategy (fresh FS reads each request)
- ⏳ Image handling / media pipeline not implemented

## 4. Search & Discovery
- ✅ Basic search endpoint `/api/search` (filters: q, category, difficulty, ukSpecific, tags)
- ✅ Client search page with filters
- 🔄 Relevance scoring simplistic (could add weighted fields, fuzzy, tag boosts)
- ⏳ Meilisearch/Elasticsearch integration (present in plan & docker-compose but unused in code)
- ⏳ Pre-generated offline indexes (planned in techstack doc)

## 5. Authentication & Authorization
- ✅ next-auth configured (GitHub, Google, Credentials)
- ✅ JWT session strategy with role propagation
- 🔄 No email verification / password reset flows
- 🔄 Admin role assignment via temporary endpoints (`/api/admin/setup`, `/api/admin/make-admin`) — needs removal & secure RBAC
- ⏳ 2FA (TOTP/WebAuthn) not implemented
- ⚠️ Credentials provider lacks brute-force mitigation & rate limiting
- ⏳ Session security headers hardening (e.g., `Secure` cookies review if using Credentials on prod domain)

## 6. Database & ORM
- ✅ Prisma schema (SQLite dev) with User, Account, Session, Bookmark, Role enum
- 🔄 Production target in docs is PostgreSQL; adjust datasource + migrations pipeline
- ⏳ Migrations folder/versioning not in repo (use `prisma migrate`)
- ⏳ Data seed script absent (for demo/test environment)
- 🔄 Bookmark model exists & used; Guide content still filesystem — decision about hybrid or DB metadata indexing pending

## 7. Admin / Content Management
- ✅ Create, edit, delete via API endpoints
- ⚠️ Path inconsistency: create writes to `../content/en`, update writes to `src/content/guides/...` (mismatch can orphan files)
- ⚠️ Delete uses `..\content\en` but update tries `src/content/guides` — unify base content directory
- 🔄 No draft/publish status field (frontmatter lacks `status: draft|published`)
- ⏳ No version history / audit log
- ⏳ No preview endpoint or staging vs production content separation
- 🔄 No markdown linting or content quality CI checks

## 8. Analytics & Metrics
- ✅ `/api/analytics` endpoint aggregates guide/bookmark stats
- 🔄 Not integrated into UI (admin analytics page missing)
- ⏳ Self-hosted analytics (Matomo/Plausible) not configured
- ⏳ Event tracking abstraction (custom events) absent

## 9. Performance & Caching
- 🔄 No explicit caching headers or revalidation strategies (`fetch` defaults used)
- ⏳ CDN strategy (Vercel static + stale-while-revalidate) not codified
- ⏳ Redis integration (planned) not present in code
- ⏳ Image optimization (Next/Image) not applied yet

## 10. Security Hardening
- 🔄 CSRF: next-auth protects auth routes; custom POST/PUT/DELETE endpoints lack CSRF/rate limit
- ⏳ Rate limiting (Redis or edge) not implemented
- ⏳ Content sanitization for MDX preview/editor (potential XSS if future embeds allowed)
- ⏳ Security headers (CSP, SEC-CH, Permissions-Policy) not centrally configured
- 🔄 Admin endpoints rely solely on role field; need defense-in-depth (e.g., middleware) & logging
- ⏳ Dependency audit workflow (e.g., `npm audit` CI) not set up

## 11. Internationalization (i18n)
- 🔄 Folder structure prepared (`content/de`, `content/es`)
- ⏳ Locale routing / language switcher not implemented
- ⏳ Translation pipeline / fallback logic absent

## 12. Testing & QA
- ⏳ No unit tests (Jest / Vitest)
- ⏳ No integration/e2e tests (Playwright / Cypress)
- ⏳ No lint-staged / pre-commit hooks configured
- 🔄 ESLint + TypeScript present (ensure strict mode settings)
- ⏳ Accessibility testing (axe, pa11y) not integrated

## 13. DevOps & Deployment
- 🔄 Dockerfiles referenced but not included in repo (frontend/backend Dockerfiles missing)
- 🔄 docker-compose references backend not present
- ⏳ CI pipeline (GitHub Actions) not included
- ⏳ Infrastructure-as-Code (Terraform) planned but absent
- ⏳ Secrets management strategy (dotenv only) — need Vault/SOPS or env-injection pipeline

## 14. Observability
- ⏳ Logging strategy (structured logs) not implemented
- ⏳ Error tracking (Sentry/OpenTelemetry) not integrated
- ⏳ Health checks for services (backend not built yet)

## 15. Search Engine Optimization
- ✅ Basic metadata per guide & global layout
- 🔄 OpenGraph enrichment (images, article tags) missing
- ⏳ Sitemap & robots.txt generation
- ⏳ Canonical URLs for multi-language future
- ⏳ Structured data (JSON-LD for articles) not added

## 16. Accessibility
- 🔄 Color contrast mostly ok; needs automated audit
- ⏳ Skip-to-content link missing
- ⏳ Keyboard focus states & focus trap in any modal (future) not validated
- ⏳ ARIA labeling for complex components (tags, difficulty badges) not explicit

## 17. Content Quality Workflow
- ⏳ Frontmatter schema enforcement (zod / ajv)
- ⏳ Linting for markdown (remark-lint) & broken link checking
- ⏳ Update cadence metadata (e.g., `needsReviewAfter`)

## 18. Future Features (From Docs/Plans)
- ⏳ Offline bundle generation
- ⏳ IPFS backup / distributed mirror
- ⏳ User submissions / community drafts
- ⏳ Rating / feedback system
- ⏳ Two-factor auth & WebAuthn
- ⏳ Advanced search (fuzzy, per-section weighting)
- ⏳ Tag browsing page

## 19. Immediate High-Priority Fixes
1. Unify content directory path usage in admin CRUD endpoints
2. Add draft/publish status to frontmatter + filtering
3. Remove or secure temporary admin setup endpoints
4. Create proper backend service or remove from docker-compose until ready
5. Introduce basic rate limiting + CSRF protection for write endpoints
6. Add migrations & switch Prisma to PostgreSQL (if moving beyond local dev)
7. Replace raw preview `dangerouslySetInnerHTML` with real MDX compile pipeline

## 20. Suggested Next Sprint Goals
- Implement secure admin middleware & path fixes
- Add Meilisearch integration & indexing job
- Introduce guide frontmatter validation + status
- Build `/admin/analytics` UI consuming existing analytics endpoint
- Add unit tests for lib functions (`mdx.ts`, `guide-utils.ts`)
- Add sitemap/robots generation script

---
Generated: 2025-08-13
