import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Users } from "lucide-react";

const services = [
  ["Lost & Found", "/services/lost-found", Heart],
  ["Government reports", "/services/city-reports", MapPin],
  ["Emergency contact", "/services/emergency", ShieldCheck],
  ["Community & services", "/services/community", Users],
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-columns">
          <div className="site-footer-brand-column">
            <Link className="welcome-brand site-footer-brand" href="/">
              <span className="brand-mark">f</span>
              <span>
                found<span className="brand-dot">.</span>
                <small>CAMBODIA</small>
              </span>
            </Link>
            <p>
              Practical community tools that help neighbors find support and
              share useful local information.
            </p>
          </div>

          <nav className="site-footer-links" aria-label="Quick links">
            <h2>Quick links</h2>
            <Link href="/">Home</Link>
            <Link href="/#home-how-title">How to use</Link>
            <Link href="/services/community">Community services</Link>
          </nav>

          <nav className="site-footer-links" aria-label="Services">
            <h2>Our services</h2>
            {services.map(([name, href]) => (
              <Link href={href} key={href}>
                {name}
              </Link>
            ))}
          </nav>

          <div className="site-footer-contact">
            <h2>Location &amp; contact</h2>
            <p>
              <MapPin size={15} /> Communities across Cambodia
            </p>
            <Link href="/#feedback">Send a suggestion</Link>
            <small>Found Cambodia is a community platform demo.</small>
          </div>

          <div className="site-footer-community">
            <h2>Built around community</h2>
            <p>
              Find local resources, share only the details needed, and take a
              practical next step.
            </p>
            <div aria-label="Community services">
              {services.map(([name, href, Icon]) => (
                <Link href={href} aria-label={name} key={href}>
                  <Icon size={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 Found Cambodia · Community platform demo</span>
          <span>Sample interactions stay in this browser.</span>
        </div>
      </div>
    </footer>
  );
}
