# Phase 1 Research — Off-Grid Freedom Site

## Community Survey Strategy

### Target Communities to Research
- **Reddit**: r/selfhosted, r/homelab, r/privacy, r/degoogle, r/piracy, r/preppers
- **Lemmy**: privacy.thenobody.club, lemmy.ml/c/privacy, sopuli.xyz/c/selfhosted
- **Hacker News**: Search for homelab, self-hosting, VPN, mesh networking posts
- **Matrix/Discord**: Self-hosting communities, privacy-focused servers
- **Forums**: LinuxServer.io, Unraid community, TrueNAS forums

### Research Questions
1. **Content Gaps**: What tutorials are people constantly asking for but can't find good guides?
2. **Pain Points**: What makes current guides shit? (Too corporate? Missing steps? Outdated?)
3. **Tool Preferences**: Which self-hosting tools are trending vs. dying?
4. **Security Concerns**: What privacy/security topics need better coverage?
5. **Geographic Needs**: UK-specific networking/legal considerations

## Identified Content Voids (Initial Research)

### High-Demand, Poor Coverage Areas
- **Router Configuration**: Brand-specific port forwarding (BT, Sky, Virgin Media, EE)
- **UK VPS Setup**: GDPR-compliant hosting, UK-based providers, legal considerations
- **Mesh Networking**: Practical Yggdrasil guides beyond basic install
- **Privacy Threat Modeling**: Realistic threat assessment for average users
- **Homelab Security**: Securing self-hosted services from script kiddies
- **Backup Strategies**: 3-2-1 backup with encryption for paranoid users

### Overcovered But Badly Done
- **Plex Setup**: Too many assume you know Docker/Linux already
- **VPN Guides**: Generic instructions that don't work with UK ISPs
- **Nextcloud**: Installation guides that skip security hardening
- **Home Assistant**: Overwhelming complexity, no "just the basics" path

## Content Scope Planning

### Tier 1 Guides (Must-Have for Launch) - 20 Guides
**Home Servers (8 guides)**
1. Plex Media Server on Ubuntu (complete noob-friendly)
2. Jellyfin setup with hardware transcoding
3. Nextcloud with proper HTTPS and external access
4. Immich photo server (Google Photos replacement)
5. Home Assistant basics (no IoT complexity)
6. Paperless-ngx document management
7. Vaultwarden password manager
8. Syncthing file sync setup

**VPN/Tunnels (6 guides)**
9. WireGuard VPN on DigitalOcean VPS
10. Cloudflare Tunnel for home services
11. Tailscale mesh VPN setup
12. OpenVPN with UK-specific considerations
13. SoftEther VPN for advanced users
14. Bypassing ISP blocking with tunnels

**Networking (4 guides)**
15. Port forwarding on UK routers (BT, Sky, Virgin)
16. Dynamic DNS with privacy-focused providers
17. Reverse proxy with Nginx Proxy Manager
18. Basic network security hardening

**Privacy & Security (2 guides)**
19. Threat modeling for normal humans
20. Disk encryption for sensitive data

### Tier 2 Guides (Post-Launch) - 15 Guides
**Advanced Networking**
- Yggdrasil mesh networking
- cjdns setup
- Setting up a Tor relay
- Creating a local DNS resolver

**Advanced Self-Hosting**
- Docker Compose mastery
- Kubernetes homelab cluster
- Database backup automation
- Monitoring with Grafana/Prometheus

**Security Deep Dives**
- Email privacy setup (ProtonMail + custom domain)
- Anonymous VPS procurement
- Cryptocurrency privacy
- OPSEC for activists

**Storage & Backup**
- ZFS storage pools
- Automated encrypted backups
- RAID vs ZFS comparison

### Tier 3 Guides (Future) - 15 Guides
**Decentralized Tech**
- IPFS node setup
- Blockchain node hosting
- Matrix server setup
- Mastodon instance

**Physical Security**
- Off-grid internet via satellite
- Faraday cage construction
- Hardware security keys
- Air-gapped systems

## Language Support Strategy

### Phase 1 Languages
- **English (UK)**: Primary, includes UK-specific legal/ISP info
- **German**: Large privacy-conscious community
- **Spanish**: Growing self-hosting community

### Translation Workflow
1. Write master guide in English
2. Technical accuracy review by native speakers
3. Cultural adaptation (laws, ISPs, tools available)
4. Ongoing maintenance as tools update

### Localization Considerations
- UK: Focus on BT/Sky/Virgin routers, GDPR, UK VPS providers
- Germany: Strict privacy laws, different ISP landscape
- Spain: EU regulations, local hosting options

## Security-First Design Principles

### Privacy Before Convenience
- No tracking scripts, even for analytics
- Self-hosted Plausible or Matomo only
- No affiliate links or sponsored content
- Static site generation for censorship resistance

### Content Security
- All guides include security hardening steps
- Highlight privacy leaks in recommended tools
- Include threat modeling for each setup
- Regular security review of all guides

### Platform Security
- HTTPS everywhere with HSTS
- CSP headers
- Rate limiting
- Bot protection
- Regular dependency updates

## Next Steps for Phase 1
1. **Community Research** (Week 1): Survey target communities, compile FAQ lists
2. **Competitor Analysis** (Week 1): Audit existing tutorial sites for gaps
3. **Content Planning** (Week 2): Finalize guide list, create content templates
4. **Site Architecture** (Week 2): Design information architecture and navigation
5. **Technical Specs** (Week 2): Lock in tech stack decisions

## Success Metrics for Phase 1
- [ ] 50+ community pain points identified
- [ ] 20 Tier 1 guides planned with outlines
- [ ] Site map with clear navigation structure
- [ ] Technical architecture diagram
- [ ] Content creation workflow defined
- [ ] Security requirements documented
