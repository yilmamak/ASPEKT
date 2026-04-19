const footerLinks = {
  Services: [
    { label: 'Get a Quote', href: '#quote' },
    { label: 'How it works', href: '#services' },
    { label: 'Sectors', href: '#sectors' },
  ],
  Sectors: [
    { label: 'Finance', href: '#finance' },
    { label: 'Logistics', href: '#logistics' },
    { label: 'Hospitality', href: '#hospitality' },
    { label: 'Legal', href: '#legal' },
    { label: 'HR', href: '#hr' },
    { label: 'E-commerce', href: '#ecommerce' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Case studies', href: '#cases' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'LinkedIn', href: '#linkedin' },
    { label: 'Twitter/X', href: '#twitter' },
    { label: 'Instagram', href: '#instagram' },
  ],
};

const Footer = () => {
  return (
    <footer className="py-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="/" className="inline-block text-[#F0F0F0] font-semibold text-lg tracking-tight hover-opacity">
              ASPEKT
            </a>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-[#F0F0F0] mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150">
              Privacy
            </a>
            <a href="#terms" className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150">
              Terms
            </a>
            <a href="#dpa" className="text-xs text-[#7A7A7E] hover:text-[#F0F0F0] transition-colors duration-150">
              DPA
            </a>
          </div>
          <p className="text-xs text-[#7A7A7E]">© 2026 Aspekt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
