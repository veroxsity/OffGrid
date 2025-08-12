# Site Architecture & Information Design

## Navigation Structure

### Primary Navigation
```
Home
├── Home Servers
│   ├── Media (Plex, Jellyfin)
│   ├── Cloud Storage (Nextcloud, Syncthing)
│   ├── Photos (Immich)
│   ├── Automation (Home Assistant)
│   └── Documents (Paperless-ngx)
├── VPN & Tunnels
│   ├── VPN Servers (WireGuard, OpenVPN)
│   ├── Mesh Networks (Tailscale, Yggdrasil)
│   ├── Tunnels (Cloudflare, ngrok)
│   └── Privacy (Tor, Anonymity)
├── Networking
│   ├── Port Forwarding
│   ├── DNS & Domains
│   ├── Reverse Proxy
│   └── Security
├── Storage & Backup
│   ├── RAID & ZFS
│   ├── Backup Strategies
│   ├── Encryption
│   └── Recovery
└── Security & Privacy
    ├── Threat Modeling
    ├── OPSEC
    ├── Tools & Software
    └── Physical Security
```

### Secondary Navigation
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Time Investment**: <1hr, 1-3hrs, 3+hrs
- **Cost**: Free, <£50, £50+
- **Tags**: #security, #privacy, #uk-specific, #troubleshooting

## Content Taxonomy

### Guide Classification System
```yaml
guide_metadata:
  title: "WireGuard VPN on DigitalOcean VPS"
  category: "VPN & Tunnels"
  subcategory: "VPN Servers"
  difficulty: "intermediate"
  time_required: "2-3 hours"
  cost_estimate: "£5/month"
  prerequisites: 
    - "Basic Linux command line"
    - "SSH access comfort"
  tags: ["vpn", "privacy", "vps", "wireguard", "uk"]
  last_updated: "2024-08-12"
  tested_on: ["Ubuntu 22.04", "Debian 11"]
  uk_specific: true
```

### Content Template Structure
```markdown
# Guide Title

## Why This Matters (One sentence hook)

## Prerequisites
- Hardware needed
- Software required
- Accounts to create
- Skills assumed

## Step-by-Step Instructions
### Part 1: Setup
### Part 2: Configuration  
### Part 3: Testing

## Security & Privacy Gotchas
- What data leaks
- Common mistakes
- Hardening steps

## Troubleshooting
- Error messages
- Common failures
- Fix procedures

## Going Further
- Performance optimization
- Advanced configuration
- Related guides

## References
- Official docs
- Community resources
- Updates & changelog
```

## User Journey Mapping

### New User Path
1. **Landing Page** → Clear value proposition
2. **Category Browse** → Find relevant area
3. **Guide Selection** → Difficulty-appropriate choice
4. **Guide Completion** → Success metrics
5. **Related Content** → Deep dive into ecosystem

### Power User Path
1. **Search** → Direct to specific guide
2. **Quick Reference** → Skip to configuration
3. **Troubleshooting** → Problem-solving focus
4. **Advanced Guides** → Complex implementations

### Mobile User Considerations
- Readable code blocks on small screens
- Collapsible sections for long guides
- Offline reading capability
- Quick copy-paste for commands

## Search & Discoverability

### Search Strategy
- **Primary Search**: Full-text with Meilisearch
- **Faceted Search**: Filter by difficulty, category, time
- **Smart Suggestions**: Auto-complete for technical terms
- **Related Content**: ML-powered recommendations

### SEO Considerations
- **Target Keywords**: "self-hosting", "privacy", "homelab", "VPN setup"
- **Long-tail**: "wireguard VPN UK setup tutorial"
- **Geographic**: "UK router port forwarding", "British ISP"
- **Problem-solving**: "plex not working", "nextcloud slow"

### Content Discoverability
- **Landing Pages**: Topic overviews with guide links
- **Series**: Multi-part guides with clear progression
- **Cross-references**: Links between related guides
- **Glossary**: Technical term definitions

## Performance Requirements

### Loading Speed Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3s
- **Cumulative Layout Shift**: <0.1

### Optimization Strategy
- Static site generation for guide content
- Lazy loading for images and videos
- CDN delivery for global access
- Minimal JavaScript for core functionality

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum ratio
- **Keyboard Navigation**: Full site accessibility
- **Screen Readers**: Semantic HTML, ARIA labels
- **Font Sizing**: Responsive text scaling

### Code Accessibility
- High contrast syntax highlighting
- Zoom-friendly code blocks
- Clear focus indicators
- Alternative text for screenshots

## Internationalization Architecture

### Technical Implementation
- **i18n Framework**: Next.js built-in internationalization
- **Content Structure**: Separate MDX files per language
- **URL Structure**: `/en/`, `/de/`, `/es/` prefixes
- **Fallbacks**: English as default for missing translations

### Content Localization
- **Cultural Adaptation**: Local ISPs, laws, tools
- **Technical Accuracy**: Native speaker review
- **Update Workflow**: Sync changes across languages
- **Community Contributions**: Translation pull requests

## Analytics & Privacy

### Privacy-Respecting Analytics
- **Self-hosted Plausible**: Basic visitor metrics
- **No Personal Data**: IP anonymization
- **No Cookies**: Cookieless tracking
- **Open Source**: Transparent data collection

### Metrics to Track
- **Popular Guides**: Most visited content
- **User Journeys**: Common navigation paths
- **Search Queries**: Content gap identification
- **Completion Rates**: Guide effectiveness
- **Error Patterns**: UX improvement opportunities

## Content Management Workflow

### Creation Process
1. **Research Phase**: Community needs assessment
2. **Outline Creation**: Structure and scope
3. **Technical Testing**: Verify all steps work
4. **Content Writing**: Follow style guide
5. **Review Process**: Technical and editorial
6. **Publication**: Deploy and announce

### Maintenance Schedule
- **Monthly Reviews**: Check for outdated info
- **Quarterly Updates**: Major software updates
- **Annual Audits**: Complete guide refresh
- **Breaking Changes**: Emergency updates

### Version Control
- **Git-based**: All content in version control
- **Branching**: Feature branches for new guides
- **Reviews**: Pull request workflow
- **Rollbacks**: Easy reversion for broken updates
