# Contributing to Off-Grid Freedom

Welcome to the Off-Grid Freedom project. This guide will help you set up your development environment and contribute to our mission of providing honest, working tutorials for digital privacy and self-hosting.

## Philosophy

- **Brutal Honesty**: If something sucks, we say so. No corporate bullshit.
- **Actually Works**: Every command is tested. Every config file is included.
- **Security First**: Privacy warnings upfront, not buried in footnotes.
- **UK Focus**: Because BT Hub configuration isn't the same as generic guides.

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - MDX

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/off-grid-freedom/site.git
   cd site
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev

   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/health

## Project Structure

```
/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Express API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Data models
│   │   └── index.ts         # Server entry point
│   └── package.json
├── content/                 # MDX guide files
│   ├── en/                  # English guides
│   ├── de/                  # German guides
│   └── es/                  # Spanish guides
├── docker/                  # Docker configurations
├── docs/                    # Additional documentation
└── research/                # Phase 1 research (completed)
```

## Writing Guides

### Content Guidelines

Follow our [Guide Template](../research/content-strategy.md) structure:

1. **Title & Metadata** - Clear, searchable title with frontmatter
2. **TL;DR** - One sentence explaining value proposition
3. **Prerequisites** - Exact hardware, software, skills needed
4. **Step-by-Step Instructions** - Every command, every config
5. **Security/Privacy Notes** - Upfront warnings about data leaks
6. **Troubleshooting** - Top 5 ways people screw up
7. **Making It Better** - Performance tweaks, scaling
8. **References** - Official docs, community resources

### Style Guide

- **Tone**: Conversational but authoritative. Sarcasm allowed.
- **Voice**: "Here's how to do X properly" not "You might want to consider..."
- **Code**: Always include full context, show expected output
- **Screenshots**: Consistent browser/terminal theme, annotated
- **UK Focus**: Router brands, ISP specifics, legal considerations

### Testing Your Guides

1. **Clean Environment**: Test on fresh Ubuntu VM/container
2. **Copy-Paste Commands**: Every command must work exactly as written
3. **Screenshots**: Take screenshots of key steps
4. **Troubleshooting**: Document what went wrong during testing

## Code Style

### TypeScript/JavaScript

- Use ESLint and Prettier configurations
- Prefer functional components and hooks
- Use TypeScript strict mode
- Comment complex business logic

### CSS/Tailwind

- Mobile-first responsive design
- Use semantic HTML5 elements
- Maintain accessibility (WCAG 2.1 AA)
- Dark mode support

### API Design

- RESTful endpoints where possible
- Consistent error response format
- Rate limiting on all endpoints
- Comprehensive input validation

## Security Requirements

### Frontend Security

- No tracking scripts or analytics
- CSP headers prevent XSS
- No inline scripts in production
- HTTPS-only in production

### Backend Security

- Helmet.js for security headers
- Rate limiting on all endpoints
- Input validation and sanitization
- JWT with short expiration times

### Content Security

- All guides include security warnings
- Privacy implications documented
- Regular security reviews
- Dependency vulnerability scanning

## Testing

### Frontend Testing

```bash
cd frontend
npm run test
npm run test:e2e
```

### Backend Testing

```bash
cd backend
npm run test
npm run test:integration
```

### Content Testing

- Spell check: Use VS Code spell checker
- Link validation: Check all external links work
- Technical accuracy: Test every command
- UK specifics: Verify router instructions

## Deployment

### Development Deployment

```bash
# Using Docker Compose
docker-compose up -d

# Manual deployment
./scripts/deploy-dev.sh
```

### Production Deployment

1. **Environment Setup**: Configure production `.env` files
2. **Build Applications**: `npm run build` for both frontend/backend
3. **Database Migration**: Run any pending migrations
4. **Health Checks**: Verify all services are running
5. **SSL Configuration**: Ensure HTTPS is properly configured

## Common Issues

### "Module not found" errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check import paths are correct
- Verify TypeScript configuration

### MDX rendering issues
- Check frontmatter YAML syntax
- Verify MDX plugins are installed
- Test with simpler MDX content first

### API connection errors
- Check backend is running on correct port
- Verify CORS configuration
- Check environment variables

## Submitting Changes

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow style guides
   - Include tests where appropriate
   - Update documentation

3. **Test Thoroughly**
   - Run all tests
   - Test in development environment
   - Verify builds work

4. **Submit Pull Request**
   - Clear description of changes
   - Link to related issues
   - Include screenshots for UI changes

## Community

- **Matrix Chat**: [#offgrid-freedom:matrix.org](https://matrix.to/#/#offgrid-freedom:matrix.org)
- **GitHub Discussions**: For feature requests and general discussion
- **Issues**: For bugs and specific problems

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

Remember: We're building something that actually helps people escape digital surveillance. Every guide should feel like advice from someone who genuinely cares if you succeed.
