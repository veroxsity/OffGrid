import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Start': [
      { name: 'Plex Media Server', href: '/guides/plex-ubuntu' },
      { name: 'WireGuard VPN', href: '/guides/wireguard-vps' },
      { name: 'Port Forwarding', href: '/guides/uk-router-forwarding' },
      { name: 'Nextcloud Setup', href: '/guides/nextcloud-secure' },
    ],
    'Privacy & Security': [
      { name: 'Threat Modeling', href: '/guides/threat-modeling' },
      { name: 'Disk Encryption', href: '/guides/disk-encryption' },
      { name: 'OPSEC Basics', href: '/guides/opsec-guide' },
      { name: 'Anonymous VPS', href: '/guides/anonymous-vps' },
    ],
    Community: [
      { name: 'Contributing', href: '/contribute' },
      { name: 'Style Guide', href: '/style-guide' },
      { name: 'GitHub', href: 'https://github.com/off-grid-freedom' },
      { name: 'Matrix Chat', href: '#' },
    ],
    About: [
      { name: 'Mission', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'No Tracking', href: '/no-tracking' },
      { name: 'Open Source', href: '/open-source' },
    ],
  } as const;

  return (
    <footer className="mt-16 bg-[var(--ds-background-tertiary)] text-[var(--ds-text-muted)] border-t border-[var(--ds-border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[12px] text-[var(--ds-text-muted)] font-semibold uppercase tracking-wider mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--ds-text-normal)] hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-[var(--ds-border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--ds-background-accent)] text-white flex items-center justify-center">⚡</div>
            <span className="text-[var(--ds-text-normal)] font-semibold">Off-Grid Freedom</span>
          </div>

          <p className="text-sm">
            © {currentYear} Off-Grid Freedom · No tracking. No cookies. No bullshit. ·
            <span className="ml-1">Open source under{' '}
              <Link href="/license" className="text-[var(--ds-background-accent)] hover:underline">MIT License</Link>
            </span>
          </p>
        </div>

        {/* Legal/Notice Banner */}
        <div className="mt-6 p-4 rounded-[8px] bg-[var(--ds-background-secondary)] border border-[var(--ds-border-subtle)]">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-yellow-400">🇬🇧 UK Legal Notice</h3>
              <p className="mt-1 text-sm text-yellow-200/90">These guides are for educational purposes. You're responsible for following your local laws. Some techniques may violate your ISP's terms of service. We don't provide legal advice.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
