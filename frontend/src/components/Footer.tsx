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
    'Community': [
      { name: 'Contributing', href: '/contribute' },
      { name: 'Style Guide', href: '/style-guide' },
      { name: 'GitHub', href: 'https://github.com/off-grid-freedom' },
      { name: 'Matrix Chat', href: '#' },
    ],
    'About': [
      { name: 'Mission', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'No Tracking', href: '/no-tracking' },
      { name: 'Open Source', href: '/open-source' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
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
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-white font-bold">Off-Grid Freedom</span>
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p className="mb-2">
                No tracking. No cookies. No bullshit.
              </p>
              <p>
                © {currentYear} Off-Grid Freedom. 
                <span className="ml-2">
                  Open source under{' '}
                  <Link href="/license" className="text-red-400 hover:text-red-300">
                    MIT License
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-400">
                🇬🇧 UK Legal Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-200">
                <p>
                  These guides are for educational purposes. You're responsible for following your local laws. 
                  Some techniques may violate your ISP's terms of service. We don't provide legal advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
