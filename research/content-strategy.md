# Content Strategy & Guide Specifications

## Content Philosophy

### Core Principles
1. **Brutal Honesty**: If something sucks, we say so. No corporate bullshit.
2. **Complete Instructions**: Every command, every config, no "figure it out yourself" gaps.
3. **Security First**: Privacy warnings upfront, not buried in footnotes.
4. **Real-World Testing**: Every guide tested on actual hardware/VPS.
5. **UK Focus**: British ISPs, laws, and infrastructure considerations.

### Content Quality Standards
- **No Fluff**: Cut the 3-paragraph intros explaining what a VPN is.
- **Working Code**: All commands and configs copy-pasteable and functional.
- **Screenshots**: Visual proof that steps work as described.
- **Troubleshooting**: Address the 5 most common ways people screw up.
- **Security Warnings**: Highlight data leaks and privacy gotchas clearly.

## Guide Template Specification

### Required Structure
```markdown
# [Tool/Service] Setup Guide

## TL;DR
One sentence explaining what this gives you and why you'd want it.

## What You Need
- **Hardware**: Specific requirements (RAM, disk, CPU)
- **Software**: OS versions, dependencies
- **Accounts**: Services you need to sign up for
- **Time**: Realistic estimate including troubleshooting
- **Cost**: Monthly/one-time expenses
- **Skills**: What you should know already

## The Setup

### Step 1: [Descriptive Name]
```bash
# Exact commands here
sudo apt update && sudo apt upgrade -y
```

**What this does**: Brief explanation of the command.

**Screenshot/Output**: What you should see.

### Step 2: [Next Action]
[Continue with numbered steps...]

## Security & Privacy Notes
- **Data Leaks**: What information this setup exposes
- **Logs**: What gets logged where and how to clean it
- **Network**: What ports are open and to whom
- **Updates**: How to keep this secure long-term

## When It Goes Wrong
### "Command not found" errors
**Problem**: [Common error message]
**Fix**: [Exact solution]

### Connection timeouts
**Problem**: Can't reach the service
**Fix**: Check firewall, ports, DNS

[Continue with common issues...]

## Making It Better
- Performance tweaks
- Additional security
- Scaling considerations
- Integration with other services

## References
- Official documentation
- Community forums
- Security advisories
- Related guides on this site
```

## Content Categories & Guide List

### Home Servers (Priority 1)
**Media Servers**
1. **Plex Media Server on Ubuntu** - Complete setup with external access
2. **Jellyfin with Hardware Transcoding** - Intel QuickSync optimization
3. **Immich Photo Server** - Google Photos replacement with face recognition

**Cloud Storage & Sync**
4. **Nextcloud with External Access** - Including HTTPS and security hardening
5. **Syncthing Setup** - Peer-to-peer file synchronization
6. **Paperless-ngx** - Document management and OCR

**Home Automation & Tools**
7. **Home Assistant Basics** - Core setup without IoT complexity
8. **Vaultwarden Password Manager** - Bitwarden-compatible self-hosted
9. **Uptime Kuma Monitoring** - Keep track of your services

### VPN & Tunnels (Priority 1)
**VPN Servers**
10. **WireGuard VPN on DigitalOcean** - UK-optimized setup
11. **OpenVPN with Easy-RSA** - Traditional VPN for older devices
12. **SoftEther VPN** - Multi-protocol VPN server

**Mesh & Tunnels**
13. **Tailscale Mesh VPN** - Zero-config mesh networking
14. **Cloudflare Tunnel** - Expose home services without port forwarding
15. **Yggdrasil Mesh Network** - Decentralized networking basics

### Networking (Priority 2)
**Router Configuration**
16. **Port Forwarding on UK Routers** - BT, Sky, Virgin Media, EE specific
17. **Dynamic DNS Setup** - No-IP, DuckDNS, Cloudflare alternatives
18. **DMZ vs Port Forwarding** - Security implications explained

**Reverse Proxy & Security**
19. **Nginx Proxy Manager** - Easy HTTPS for multiple services
20. **Fail2ban Setup** - Automated intrusion prevention
21. **UFW Firewall Configuration** - Ubuntu firewall made simple

### Storage & Backup (Priority 2)
**Storage Systems**
22. **ZFS Storage Pool** - Redundancy and data integrity
23. **RAID vs ZFS Comparison** - When to use what
24. **Encrypted External Backup** - 3-2-1 backup strategy

**Backup Solutions**
25. **Restic Automated Backups** - Encrypted, deduplicated backups
26. **Rclone Cloud Sync** - Multi-cloud backup strategy
27. **Disaster Recovery Planning** - Actually test your backups

### Security & Privacy (Priority 1)
**Privacy Fundamentals**
28. **Threat Modeling for Humans** - Realistic risk assessment
29. **OPSEC for Self-Hosters** - Operational security basics
30. **Disk Encryption Setup** - LUKS for sensitive data

**Advanced Privacy**
31. **Anonymous VPS Setup** - Cryptocurrency payments and Tor
32. **Secure Email Setup** - ProtonMail with custom domain
33. **Browser Privacy Hardening** - Firefox and Chromium configuration

## Content Creation Workflow

### Research Phase (Week 1)
1. **Community Needs Assessment**
   - Reddit/Lemmy post analysis
   - Discord/Matrix questions
   - Support forum common issues
   
2. **Existing Content Audit**
   - What guides already exist?
   - What's wrong with current tutorials?
   - What gaps need filling?

3. **Technical Feasibility**
   - Can we test this properly?
   - Hardware/software requirements
   - Legal considerations (UK law)

### Planning Phase (Week 2)
1. **Outline Creation**
   - Step-by-step breakdown
   - Prerequisites identification
   - Common failure points
   
2. **Resource Gathering**
   - Test hardware setup
   - Account creation
   - Screenshot planning

### Creation Phase (Weeks 3-4)
1. **Technical Testing**
   - Complete setup from scratch
   - Document every command
   - Screenshot each step
   - Test common variations

2. **Writing & Documentation**
   - Follow template strictly
   - No assumed knowledge
   - Include troubleshooting
   - Security considerations

3. **Review Process**
   - Technical accuracy check
   - Security review
   - Style guide compliance
   - Fresh eyes test

### Publication Phase (Week 5)
1. **Final Testing**
   - Clean environment test
   - Commands work copy-paste
   - Screenshots current
   
2. **SEO Optimization**
   - Title and meta description
   - Internal linking
   - Related content suggestions

3. **Launch & Monitoring**
   - Community announcement
   - Feedback collection
   - Error reports tracking

## Style Guide Enforcement

### Tone & Voice
- **Conversational but authoritative**: "Here's how to do X properly"
- **Sarcasm allowed**: If ISPs or corporations deserve criticism
- **No corporate speak**: Avoid "solutions" and "leverage"
- **British English**: Colour, favourite, etc.

### Technical Writing Standards
- **Code blocks**: Always include full context
- **Commands**: Show expected output
- **Variables**: Clearly mark what users need to change
- **Warnings**: Use callout boxes for important security notes

### Visual Standards
- **Screenshots**: Consistent browser/terminal theme
- **Annotations**: Red arrows/boxes for important UI elements
- **Code highlighting**: Syntax appropriate for language
- **Responsive images**: Work on mobile devices

## Quality Assurance Process

### Pre-Publication Checklist
- [ ] All commands tested in clean environment
- [ ] Screenshots are current and clear
- [ ] Security warnings are prominent
- [ ] Troubleshooting covers top 5 issues
- [ ] Related guides are linked
- [ ] Mobile formatting checked
- [ ] Loading speed under 3 seconds

### Post-Publication Monitoring
- **Community Feedback**: Reddit, Discord, comments
- **Error Reports**: Broken commands, outdated info
- **Analytics**: Drop-off points, search queries
- **Updates Needed**: Software versions, security patches

### Maintenance Schedule
- **Weekly**: Check for urgent security updates
- **Monthly**: Review analytics and user feedback  
- **Quarterly**: Full guide review and updates
- **Annually**: Complete content audit and refresh
