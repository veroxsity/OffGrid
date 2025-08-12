# Off-Grid Freedom Site — Full Tech Stack

This is the complete technology blueprint. Every tool, library, and service is chosen for speed, privacy, security, and ease of scaling.

---

## 1. Frontend
**Frameworks / Libraries**
- **Next.js** — Static & SSR pages, ability to generate fully static guides for ultimate speed/censorship-resistance.
- **React 18+** — Interactive UI components.
- **Tailwind CSS** — Clean, rapid styling without bloated CSS files.
- **Framer Motion** — Smooth transitions, animations for a polished feel.
- **MDX** — Write guides in Markdown but embed live code examples.
- **React Syntax Highlighter** — For code blocks in guides.

**UI Basics**
- Mobile-first responsive.
- Dark/Light modes with local storage.
- Accessibility built in (ARIA attributes, high contrast mode).

---

## 2. Backend
**Core Stack**
- **Node.js** (LTS) with **Express** — Fast API handling.
- **PostgreSQL** — Rock-solid relational DB for guides, users, settings.
- **Prisma** ORM — Type-safe DB queries, schemas in code.
- **Redis** — Session caching, search indexing, and rate-limiting.

**Security Layer**
- JWT tokens for stateless authentication.
- OAuth integration (GitHub, ProtonMail, etc.).
- Optional 2FA (TOTP or WebAuthn).

**Extra Services**
- **BullMQ / RabbitMQ** — Background jobs (e.g., bulk content import).
- **WebSockets** — Real-time updates or live Q&A events.

---

## 3. Hosting & Deployment
- **Frontend:** Vercel for zero-config static deployments + CDN.
- **Backend:** DigitalOcean, Hetzner, or Linode for full VPS control.
- **Database Hosting:** Self-hosted PostgreSQL on VPS or Render for managed.
- **Containerisation:** Docker for backend + DB portability.
- **Infrastructure-as-Code:** Terraform to provision cloud environments.

---

## 4. Off-Grid & Privacy Tools
- **VPN:** WireGuard + OpenVPN + SoftEther guides.
- **Tunnelling:** Cloudflare Tunnels, Tailscale, NordVPN Meshnet.
- **Homeservers:** Plex, Jellyfin, Nextcloud, Immich (photo server), Home Assistant.
- **Decentralised Networking:** Yggdrasil, cjdns.
- **Private Search:** SearXNG self-hosted.

---

## 5. Search & Indexing
- **Elasticsearch** or **Meilisearch** — lightning-fast, full-text search.
- Pre-generate search indexes for offline bundles.

---

## 6. Privacy & Compliance
- All analytics are either **Matomo** (self-hosted) or **Plausible**.
- CSP headers and strict HTTPS everywhere.
- No third-party scripts without necessity.
