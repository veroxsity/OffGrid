# MVP — Minimum Viable Product Blueprint

The fastest route to getting the core platform usable, while still being feature-rich.

---

## MVP Goals
- Get first version live within 8–12 weeks.
- Site should stand on its own without relying on centralised services.
- First 20 high-value guides ready.

---

## Features to Ship

### 1. Home & Navigation
- Responsive front page with categories: Homeservers, VPS, VPN/Tunnels, Meshnets, Port Forwarding.
- Tag system for guides (e.g., Security, Networking, Storage).

---

### 2. Guide System
- Markdown-based guides rendered using MDX.
- Syntax highlighting for commands.
- Search bar powered by a lightweight search engine (e.g., Meilisearch) for instant results.
- Pagination and "related guides" section.

**MVP Example Guides:**
1. Plex Media Server on Ubuntu.
2. Self-hosting Nextcloud.
3. WireGuard VPN on VPS.
4. Cloudflare Tunnel setup.
5. Yggdrasil mesh install.
6. Setting up a ZFS storage pool for redundancy.
7. Port forwarding on popular routers.

---

### 3. Authentication (Optional)
- Basic email/password + OAuth (GitHub, Proton).
- JWT-based session tokens.
- Save/bookmark guides.

---

### 4. Admin Tools
- Content upload interface.
- Draft/publish cycle.
- Featured guides flag.

---

### 5. Hosting/Infra
- **Frontend:** Next.js static export → Vercel.
- **Backend:** Node/Express → Docker → VPS.
- **Database:** PostgreSQL on VPS.
- Cloudflare for HTTPS, DNS, and optional tunnelling.
