# Off-Grid Freedom Site — AI Coding Agent Instructions

## Project Overview
This is a privacy-focused platform for self-hosting and off-grid technology tutorials. The project emphasizes security, decentralization, and censorship resistance while providing comprehensive guides for homelab enthusiasts and privacy advocates.

## Architecture Philosophy
- **Privacy-first design**: Security before convenience, minimal tracking, self-hosted analytics
- **Decentralized approach**: Static exports for censorship resistance, IPFS backup integration
- **Content-driven**: MDX-based guides with embedded code examples and syntax highlighting
- **Progressive enhancement**: Core functionality works without JavaScript, enhanced UX with React

## Tech Stack (Planned Implementation)
- **Frontend**: Next.js with static export capability, React 18+, Tailwind CSS, MDX for content
- **Backend**: Node.js/Express API, PostgreSQL with Prisma ORM, Redis for caching
- **Search**: Meilisearch or Elasticsearch for full-text search with offline capability
- **Auth**: JWT-based with OAuth (GitHub, ProtonMail), optional 2FA
- **Hosting**: Vercel (frontend), VPS (backend), Docker containerization

## Key Development Patterns

### Content Strategy
- Target 50+ detailed guides covering homeservers, VPN/tunneling, mesh networking, port forwarding
- Each guide includes troubleshooting templates, screenshots, and video embeds
- Multilingual support (EN, DE, ES initially) with translation workflows
- Content categorization using tag system for cross-referencing

### Security Requirements
- Strict HTTPS with HSTS headers
- CSP, XSS, and CSRF protection implementation
- Rate limiting and bot protection
- Regular security scanning with Dependabot integration
- Disaster recovery with automated DB snapshots and IPFS backups

### Development Workflow
- Git branching: `main` (production), `dev` (staging), feature branches
- Staging environment on VPS for testing
- Load testing for 1000+ concurrent users
- Beta testing phase with 20-50 invited users before public launch

## Critical File Structure (When Implemented)
```
/frontend/          # Next.js application
/backend/           # Express API server
/content/           # MDX guide files
/docker/            # Container configurations
/docs/              # Additional documentation
plan.md             # Comprehensive development roadmap
mvp.md              # MVP feature requirements
techstack.md        # Complete technology specifications
```

## Development Priorities
1. **Phase 1**: Research and architecture finalization
2. **Phase 2**: Foundation setup (Next.js + API + DB schema)
3. **Phase 3**: Content engine with MDX rendering and search
4. **Phase 4**: Community features (bookmarks, user submissions)
5. **Phase 5**: Security hardening and performance optimization
6. **Phase 6**: Beta testing and launch preparation

## Content Examples to Implement
- Plex Media Server installation and configuration
- WireGuard VPN setup on VPS
- Cloudflare Tunnel configuration
- Yggdrasil mesh networking basics
- ZFS storage pool setup for redundancy
- Router port forwarding guides

## Special Considerations
- Generate static HTML bundles for offline access and censorship bypass
- Implement content versioning for guide updates
- Plan for optional Matrix chat integration for community discussions
- Design for eventual IPFS content distribution
- Consider mobile-first responsive design for accessibility

When contributing code, prioritize security, privacy, and performance. Follow the planned architecture closely and maintain consistency with the privacy-first philosophy throughout implementation.
