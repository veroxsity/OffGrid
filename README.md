# Off-Grid Freedom Site

Privacy-focused platform for self-hosting and off-grid technology tutorials. Emphasizes security, decentralization, and censorship resistance while providing comprehensive guides for homelab enthusiasts and privacy advocates.

## 🎯 Mission

No censorship. No bullshit. Give people real, actionable knowledge to live off-grid—digitally or physically. Guides must empower, not confuse. Help users dodge government snooping, surveillance capitalism, and tech fads.

## 🏗️ Architecture

- **Privacy-first design**: Security before convenience, minimal tracking, self-hosted analytics
- **Decentralized approach**: Static exports for censorship resistance, IPFS backup integration
- **Content-driven**: MDX-based guides with embedded code examples and syntax highlighting
- **Progressive enhancement**: Core functionality works without JavaScript, enhanced UX with React

## 🔧 Tech Stack

- **Frontend**: Next.js with static export capability, React 18+, Tailwind CSS, MDX for content
- **Backend**: Node.js/Express API, PostgreSQL with Prisma ORM, Redis for caching
- **Search**: Meilisearch for full-text search with offline capability
- **Auth**: JWT-based with OAuth (GitHub, ProtonMail), optional 2FA
- **Hosting**: Vercel (frontend), VPS (backend), Docker containerization

## 📁 Project Structure

```
/frontend/          # Next.js application
/backend/           # Express API server
/content/           # MDX guide files
  /en/             # English guides
  /de/             # German guides
  /es/             # Spanish guides
/docker/            # Container configurations
/docs/              # Additional documentation
/research/          # Phase 1 research (completed)
```

## 🚀 Development Status

- ✅ **Phase 1**: Research and architecture finalization (COMPLETED)
- 🔄 **Phase 2**: Foundation setup (Next.js + API + DB schema) (IN PROGRESS)
- ⏳ **Phase 3**: Content engine with MDX rendering and search
- ⏳ **Phase 4**: Community features (bookmarks, user submissions)
- ⏳ **Phase 5**: Security hardening and performance optimization
- ⏳ **Phase 6**: Beta testing and launch preparation

## 📖 Content Categories

- **Home Servers** (Plex, Nextcloud, Jellyfin, Home Assistant, Immich)
- **VPN/Tunnels** (WireGuard, OpenVPN, Cloudflare Tunnel, Tailscale)
- **Networking** (Port forwarding, mesh nets, reverse proxy, DNS)
- **Security & Privacy** (Threat modeling, encryption, OPSEC)
- **Storage & Backup** (RAID, ZFS, encrypted backups, disaster recovery)

## 🇬🇧 UK Focus

Special emphasis on UK-specific challenges:
- Router brand differences (BT Hub, Sky, Virgin Media)
- ISP limitations and workarounds
- Legal considerations and privacy laws
- Local VPS provider recommendations

## 🛡️ Security First

Every guide includes:
- Threat modeling considerations
- Privacy implications upfront
- Security hardening by default
- Regular security updates

## 📝 Development

```bash
# Frontend (Next.js)
cd frontend
npm install
npm run dev

# Backend (Express API)
cd backend
npm install
npm run dev

# Full stack with Docker
docker-compose up -d
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Open source under [MIT License](LICENSE).

---

**Warning**: This project prioritizes privacy and security over convenience. Some features may be more complex to implement than typical web applications. This is intentional.
