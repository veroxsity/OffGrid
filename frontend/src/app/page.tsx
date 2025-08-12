import Link from 'next/link';

export default function Home() {
  const featuredGuides = [
    {
      title: "Plex Media Server on Ubuntu",
      description: "Stop paying Netflix. Set up your own media server that actually works.",
      category: "Home Servers",
      difficulty: "Beginner",
      time: "2-3 hours",
      href: "/guides/home-servers/plex-ubuntu",
      ukSpecific: true,
    },
    {
      title: "WireGuard VPN on Ubuntu",
      description: "Build your own VPN server. Complete with UK router setup.",
      category: "VPN & Tunnels", 
      difficulty: "Intermediate",
      time: "45 minutes",
      href: "/guides/vpn-tunnels/wireguard-ubuntu",
      ukSpecific: true,
    },
    {
      title: "UK Router Port Forwarding",
      description: "BT, Sky, Virgin - stop making this harder than it needs to be.",
      category: "Networking",
      difficulty: "Beginner", 
      time: "20 minutes",
      href: "/guides/networking/uk-port-forwarding",
      ukSpecific: true,
    },
  ];

  const categories = [
    {
      name: "Home Servers",
      description: "Plex, Nextcloud, Jellyfin - ditch the cloud corporations",
      icon: "🖥️",
      href: "/guides/home-servers",
      guides: 8,
    },
    {
      name: "VPN & Tunnels", 
      description: "Secure tunnels, mesh networks, fuck ISP snooping",
      icon: "🔒",
      href: "/guides/vpn-tunnels",
      guides: 6,
    },
    {
      name: "Networking",
      description: "Port forwarding, DNS, reverse proxy - make it work",
      icon: "🌐", 
      href: "/guides/networking",
      guides: 4,
    },
    {
      name: "Security & Privacy",
      description: "Threat modeling, encryption, operational security",
      icon: "🛡️",
      href: "/guides/security",
      guides: 6,
    },
    {
      name: "Storage & Backup",
      description: "RAID, ZFS, encrypted backups - don't lose your shit",
      icon: "💾",
      href: "/guides/storage", 
      guides: 4,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              No Bullshit<br />
              <span className="text-red-400">Self-Hosting Guides</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real tutorials that actually work. No corporate fluff, no affiliate links, 
              no hand-waving. Just honest, brutal guides for digital freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/guides"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Browse All Guides
              </Link>
              <Link
                href="/guides/home-servers/plex-ubuntu"
                className="border border-gray-300 text-white hover:bg-gray-700 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start with Plex →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* UK Focus Banner */}
      <section className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <span className="text-2xl mr-3">🇬🇧</span>
            <p className="text-lg font-medium">
              UK-focused guides with ISP-specific instructions. Because BT Hub isn't the same as a Netgear.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Start Here
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The most requested guides. Copy-paste commands that work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-600 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      {guide.category}
                    </span>
                    {guide.ukSpecific && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        🇬🇧 UK
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {guide.difficulty}
                    </span>
                    <span>{guide.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find exactly what you need. No endless scrolling through irrelevant crap.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {category.guides} guides →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why We're Different</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Because most self-hosting tutorials are written by people who've never broken anything.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">💯</div>
              <h3 className="text-lg font-bold mb-2">Brutal Honesty</h3>
              <p className="text-gray-300">If something sucks, we'll tell you. No corporate bullshit.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-bold mb-2">Privacy First</h3>
              <p className="text-gray-300">Security warnings upfront. Your privacy matters more than convenience.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🇬🇧</div>
              <h3 className="text-lg font-bold mb-2">UK Focused</h3>
              <p className="text-gray-300">Router guides that work with BT, Sky, Virgin. Legal considerations included.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2">Actually Works</h3>
              <p className="text-gray-300">Every command tested. Every config file included. No gaps.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
