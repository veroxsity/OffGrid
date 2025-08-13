import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const featuredGuides = [
    { title: 'Plex Media Server on Ubuntu', description: 'Set up a Plex server that actually works.', category: 'Home Servers', difficulty: 'Beginner', time: '2-3 hours', href: '/guides/home-servers/plex-ubuntu', ukSpecific: true },
    { title: 'WireGuard VPN on Ubuntu', description: 'Roll your own VPN with real UK router steps.', category: 'VPN & Tunnels', difficulty: 'Intermediate', time: '45 minutes', href: '/guides/vpn-tunnels/wireguard-ubuntu', ukSpecific: true },
    { title: 'UK Router Port Forwarding', description: "BT, Sky, Virgin – stop guessing. Here's what works.", category: 'Networking', difficulty: 'Beginner', time: '20 minutes', href: '/guides/networking/uk-port-forwarding', ukSpecific: true },
  ];

  const categories = [
    { name: 'Home Servers', description: 'Plex, Nextcloud, Jellyfin', icon: '🖥️', href: '/guides/home-servers', guides: 8 },
    { name: 'VPN & Tunnels', description: 'Tunnels, mesh, routing', icon: '🔒', href: '/guides/vpn-tunnels', guides: 6 },
    { name: 'Networking', description: 'Forwarding, DNS, proxy', icon: '🌐', href: '/guides/networking', guides: 4 },
    { name: 'Security & Privacy', description: 'Threat modeling, crypto', icon: '🛡️', href: '/guides/security', guides: 6 },
    { name: 'Storage & Backup', description: 'RAID, ZFS, backups', icon: '💾', href: '/guides/storage', guides: 4 },
  ];

  return (
    <div className="bg-[var(--ds-background-primary)] text-[var(--ds-text-normal)]">
      {/* Hero */}
      <section className="header-discord">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              No Bullshit
              <span className="block text-[var(--ds-background-accent)]">Self-Hosting Guides</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--ds-text-muted)]">Real tutorials that work. No fluff. No affiliate nonsense. Just honest, repeatable steps.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg"><Link href="/guides">Browse All Guides</Link></Button>
              <Button size="lg" variant="outline"><Link href="/guides/home-servers/plex-ubuntu">Start with Plex →</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* UK Focus Banner */}
      <section className="bg-[var(--ds-background-accent)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
          <span className="mr-2 text-xl">🇬🇧</span>
          UK-focused guides with ISP-specific instructions. BT Hub ≠ Netgear.
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-14 bg-[var(--ds-background-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">Start Here</h2>
            <p className="text-[var(--ds-text-muted)] mt-1">Most requested guides. Copy, paste, done.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link key={guide.title} href={guide.href} className="group block">
                <Card className="card hover:border-[var(--ds-border-strong)] transition-colors">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-background-accent)]">{guide.category}</span>
                      {guide.ukSpecific && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-background-secondary)]">🇬🇧 UK</span>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-white">{guide.title}</CardTitle>
                    <CardDescription className="text-[var(--ds-text-muted)]">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-[var(--ds-text-muted)]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--ds-background-tertiary)] border border-[var(--ds-border-subtle)]">{guide.difficulty}</span>
                      <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{guide.time}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <p className="text-[var(--ds-text-muted)] mt-1">Find what you need fast.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group block">
                <Card className="text-center card hover:border-[var(--ds-border-strong)]">
                  <CardContent className="pt-8">
                    <div className="text-4xl mb-4 group-hover:scale-105 transition-transform">{category.icon}</div>
                    <CardTitle className="mb-2 group-hover:text-white">{category.name}</CardTitle>
                    <CardDescription className="text-[var(--ds-text-muted)]">{category.description}</CardDescription>
                    <div className="mt-4 inline-flex items-center text-sm text-[var(--ds-background-accent)]">{category.guides} guides<svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-14 bg-[var(--ds-background-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white">Why We're Different</h2>
            <p className="text-[var(--ds-text-muted)] mt-1 max-w-3xl mx-auto">Because most tutorials are written by people who've never broken anything.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💯', title: 'Brutal Honesty', text: "If something sucks, we'll tell you." },
              { icon: '🔒', title: 'Privacy First', text: 'Warnings up front. Privacy before convenience.' },
              { icon: '🇬🇧', title: 'UK Focused', text: 'Router guides that work for BT, Sky, Virgin.' },
              { icon: '⚡', title: 'Actually Works', text: 'Every command tested. No gaps.' },
            ].map((item) => (
              <div key={item.title} className="text-center card p-6">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--ds-text-muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
