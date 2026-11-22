import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  PhoneCall,
  ShieldAlert,
  Users,
} from "lucide-react";
import NavbarTools from "@/components/navbar-tools";
import SiteFooter from "@/components/SiteFooter";

const actions = [
  {
    href: "/services/lost-found",
    icon: Heart,
    title: "Lost or found an item?",
    khmer: "ស្វែងរក ឬរាយការណ៍របស់បាត់",
    help: "Find an item or report one you found.",
    action: "Open Lost & Found",
    tone: "blue",
  },
  {
    href: "/services/city-reports",
    icon: MapPin,
    title: "Report a local problem",
    khmer: "រាយការណ៍បញ្ហាក្នុងសហគមន៍",
    help: "Tell your local office about a road, light, or waste problem.",
    action: "Report a problem",
    tone: "gold",
  },
  {
    href: "/services/emergency",
    icon: ShieldAlert,
    title: "Get emergency help",
    khmer: "សុំជំនួយបន្ទាន់",
    help: "See emergency numbers and share a location in the demo.",
    action: "Open emergency help",
    tone: "red",
  },
  {
    href: "/services/community",
    icon: Users,
    title: "Find a nearby service",
    khmer: "ស្វែងរកសេវាកម្មនៅជិតអ្នក",
    help: "Browse local services and community information.",
    action: "Find a service",
    tone: "green",
  },
];

export default function HomePage() {
  return (
    <main className="community-home">
      <header className="landing-nav community-home-old-nav">
        <Link className="community-home-brand" href="/" aria-label="Home">
          <span className="community-home-mark">ក</span>
          <span><b>National Community Services Platform</b><small>Community help in Cambodia</small></span>
        </Link>
        <nav aria-label="Main services">
          <Link className="community-home-active-link" href="/">Home</Link>
          <Link href="/services/lost-found">Lost &amp; Found</Link>
          <Link href="/services/city-reports">Local problems</Link>
          <Link href="/services/emergency">Emergency help</Link>
          <Link href="/services/community">Nearby services</Link>
        </nav>
        <div className="landing-nav-actions">
          <NavbarTools />
          <Link className="community-home-get-started" href="/register">
            Get started <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="community-home-content">
        <section className="home-emergency-notice" aria-labelledby="emergency-notice-title">
          <span className="home-emergency-icon"><ShieldAlert size={22} /></span>
          <div className="home-emergency-copy">
            <h1 id="emergency-notice-title">Need help right now?</h1>
            <p>For immediate danger, call emergency services. This website is a community demo and does not dispatch responders.</p>
          </div>
          <div className="home-emergency-calls" aria-label="Emergency numbers in Cambodia">
            <a href="tel:117"><b>117</b><small>Police</small></a>
            <a href="tel:118"><b>118</b><small>Fire</small></a>
            <a href="tel:119"><b>119</b><small>Ambulance</small></a>
          </div>
        </section>

        <section className="home-start-section" aria-labelledby="home-start-title">
          <div className="home-section-title">
            <div><span>START HERE · ចាប់ផ្តើមទីនេះ</span><h2 id="home-start-title">What do you need help with?</h2></div>
            <p>Choose one. You can change your mind at any time.</p>
          </div>
          <div className="home-action-grid">
            {actions.map(({ href, icon: Icon, title, khmer, help, action, tone }) => (
              <Link className={`home-action-card ${tone}`} href={href} key={href}>
                <span className="home-action-icon"><Icon size={25} aria-hidden="true" /></span>
                <span className="home-action-title">{title}</span>
                <span className="home-action-khmer" lang="km">{khmer}</span>
                <span className="home-action-help">{help}</span>
                <span className="home-action-go">{action}<ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-how-section" aria-labelledby="home-how-title">
          <h2 id="home-how-title">Using this service is simple</h2>
          <ol>
            <li><b>1</b><span>Choose the service you need.</span></li>
            <li><b>2</b><span>Follow the short steps on that page.</span></li>
            <li><b>3</b><span>Ask someone you trust to help if needed.</span></li>
          </ol>
        </section>

        <p className="home-data-note"><PhoneCall size={15} /> Emergency calls go directly to the phone service. Other reports on this demo site are examples and are not sent to government offices.</p>
      </div>
      <SiteFooter />
    </main>
  );
}
