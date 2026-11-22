import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  HeartHandshake,
  HandHeart,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavbarTools from "@/components/navbar-tools";
import SiteFooter from "@/components/SiteFooter";

const features = [
  ["Lost & Found", "/services/lost-found", Heart],
  ["Government reports", "/services/city-reports", MapPin],
  ["Emergency contact", "/services/emergency", ShieldCheck],
  ["Community & services", "/services/community", Users],
] as const;

const values = [
  {
    title: "People first",
    description:
      "Simple ways to ask for help, share useful information, and support one another.",
    icon: HandHeart,
  },
  {
    title: "Local by design",
    description:
      "Tools and information organized around neighborhoods across Cambodia.",
    icon: MapPin,
  },
  {
    title: "Safer sharing",
    description:
      "Clear consent and privacy minded steps are part of every experience.",
    icon: ShieldCheck,
  },
  {
    title: "Useful every day",
    description:
      "Practical services help neighbors find answers and take the next step.",
    icon: Heart,
  },
];

const communityRoles = [
  ["Local volunteers", "Offer time, skills, and a helping hand nearby."],
  ["Service providers", "Share trusted local resources and support."],
  ["Neighborhood reporters", "Make local issues easier to see and follow."],
  ["People who find things", "Help reunite lost belongings with their owners."],
  ["Community organizers", "Connect neighbors with useful events and notices."],
  ["Safety supporters", "Help people share information carefully and safely."],
] as const;

function Brand() {
  return (
    <Link className="welcome-brand" href="/" aria-label="Found Cambodia home">
      <span className="brand-mark">f</span>
      <span>
        found<span className="brand-dot">.</span>
        <small>CAMBODIA</small>
      </span>
    </Link>
  );
}

export default function AboutPage() {
  return (
    <main className="welcome-page about-page">
      <header className="landing-nav about-nav">
        <Brand />
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about" aria-current="page">
            About
          </Link>
          <details className="nav-community-menu">
            <summary>
              Community <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <div className="nav-community-dropdown">
              {features.map(([name, href, Icon]) => (
                <Link href={href} key={href}>
                  <Icon size={15} aria-hidden="true" />
                  {name}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="landing-nav-actions">
          <NavbarTools />
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            className="button primary"
          >
            Get started <ArrowRight size={14} />
          </Button>
        </div>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <Badge variant="secondary">ABOUT FOUND CAMBODIA</Badge>
          <h1>
            Community support,
            <br />
            <em>all in one place.</em>
          </h1>
          <p>
            Found Cambodia brings practical community tools together so
            neighbors can find help, share local information, and make useful
            services easier to reach.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/#features" />}
            className="button primary"
          >
            Explore the four services <ArrowRight size={15} />
          </Button>
        </div>
        <div className="about-hero-art" aria-hidden="true">
          <div className="about-art-circle" />
          <div className="about-art-orbit" />
          <div className="about-art-people">
            <Users size={64} />
          </div>
          <span className="about-art-heart">
            <HeartHandshake size={30} />
          </span>
          <span className="about-art-pin">
            <MapPin size={24} />
          </span>
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-section-heading">
          <Badge variant="secondary">WHAT GUIDES US</Badge>
          <h2>
            A community platform built <em>around people.</em>
          </h2>
          <p>
            We bring everyday community needs into one clear, welcoming place.
          </p>
        </div>
        <div className="about-values-grid">
          {values.map(({ title, description, icon: Icon }) => (
            <Card className="about-value-card" key={title}>
              <span>
                <Icon size={20} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="about-purpose-grid">
        <article className="about-purpose-copy">
          <Badge variant="secondary">OUR MISSION</Badge>
          <h2>Make local help easier to find and offer.</h2>
          <p>
            We connect neighbors with practical tools for finding lost items,
            reporting local issues, reaching emergency contacts, and discovering
            community services.
          </p>
          <ul>
            <li>Make useful information easier to access.</li>
            <li>Help communities share updates and follow progress.</li>
            <li>Keep privacy and consent in view.</li>
          </ul>
        </article>
        <div className="about-purpose-art mission-art" aria-hidden="true">
          <div className="about-purpose-sun" />
          <div className="about-purpose-icon">
            <HandHeart size={74} />
          </div>
          <span className="about-purpose-spark">✳</span>
        </div>
        <div className="about-purpose-art vision-art" aria-hidden="true">
          <div className="about-purpose-sun" />
          <div className="about-purpose-icon">
            <MapPin size={74} />
          </div>
          <span className="about-purpose-spark">✳</span>
        </div>
        <article className="about-purpose-copy">
          <Badge variant="secondary">OUR VISION</Badge>
          <h2>Stronger neighborhoods, one small action at a time.</h2>
          <p>
            We imagine communities where people can take part, find trusted
            local resources, and support one another with confidence.
          </p>
          <ul>
            <li>Build connection between residents and services.</li>
            <li>Make community participation feel simple.</li>
            <li>Grow a safer, more helpful local network.</li>
          </ul>
        </article>
      </section>

      <section className="about-community-section">
        <div className="about-section-heading">
          <Badge variant="secondary">OUR COMMUNITY</Badge>
          <h2>
            Many ways to <em>make a difference.</em>
          </h2>
          <p>
            Found Cambodia is designed for everyone who wants to make local
            support easier to find.
          </p>
        </div>
        <div className="about-community-grid">
          {communityRoles.map(([title, description], index) => (
            <Card className="about-role-card" key={title}>
              <span className="about-role-avatar">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
