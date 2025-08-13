# Guide Authoring Standard

Use `content/en/_templates/guide-template.mdx` as the base. Every guide must include:

Frontmatter
- title, description, category, difficulty, time, status, tags
- author, lastUpdated, testedOn (at least 1), prerequisites
- ukSpecific: true when UK ISP/router details are relevant

Structure
- Intro (what/why/scope) + TL;DR
- Before you begin (validation + baseline packages)
- Security model and defaults (least privilege, firewall, no public admin)
- Step-by-step sections (Step 1, Step 2, ...)
  - Each command block followed by “What this does” and expected result
- Verification (status/health checks)
- Backups and data location (what to back up, sample command)
- Performance tuning (if applicable)
- Troubleshooting (common issues + diagnostic commands)
- Security hardening checklist
- UK-specific notes (if applicable)
- Uninstall / rollback
- FAQ and References

Content rules
- Prefer copy-pastable commands; annotate risky steps
- Default to secure configs (no guest access, no default passwords)
- Avoid exposing services to internet; suggest VPN or reverse proxy with TLS
- Use consistent paths and ports; call out placeholders clearly
- Include links to related guides where useful

Quality checks
- Headings present: Before you begin, Security model, Troubleshooting, Backups, Uninstall
- Code blocks followed by a brief explanation
- Frontmatter schema valid; tags present; lastUpdated is ISO date (YYYY-MM-DD)

Publishing
- Remove the “Editor checklist” section before publishing
- Update lastUpdated and testedOn after validation on real systems
