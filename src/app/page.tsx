"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  FileText,
  HandHeart,
  Heart,
  MapPin,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import NavbarTools from "@/components/navbar-tools";
import SiteFooter from "@/components/SiteFooter";

const features = [
  {
    icon: Heart,
    name: "Lost & Found",
    detail: "Post a lost or found item and help it get home safely.",
    href: "/services/lost-found",
    count: "14 sample posts",
    tone: "blue",
  },
  {
    icon: MapPin,
    name: "Government reports",
    detail: "Report a neighborhood issue and follow its progress.",
    href: "/services/city-reports",
    count: "5 sample reports",
    tone: "coral",
  },
  {
    icon: ShieldCheck,
    name: "Emergency contact",
    detail:
      "Find official hotline numbers and explore a consent-based demo report.",
    href: "/services/emergency",
    count: "3 demo incidents",
    tone: "lilac",
  },
  {
    icon: Users,
    name: "Community & services",
    detail: "Browse local services, notices, and volunteer opportunities.",
    href: "/services/community",
    count: "6 sample services",
    tone: "green",
  },
];

export default function HomePage() {
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const sendFeedback = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    setFeedback("");
  };

  return (
    <main className="landing-page" id="top">
      <header className="landing-nav">
        <Link
          className="welcome-brand"
          href="/"
          aria-label="Found Cambodia home"
        >
          <span className="brand-mark">f</span>
          <span>
            found<span className="brand-dot">.</span>
            <small>CAMBODIA</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <details className="nav-community-menu">
            <summary>
              Community <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <div className="nav-community-dropdown">
              {features.map(({ href, icon: Icon, name }) => (
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
            className="button primary"
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Get started <ArrowRight size={14} />
          </Button>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <Badge variant="secondary">
            <span className="live-dot-small" /> CAMBODIA COMMUNITY PLATFORM
          </Badge>
          <h1>
            Small actions.
            <br />
            <em>Stronger communities.</em>
          </h1>
          <p>
            Find what’s lost, report local issues, reach emergency contacts, and
            discover useful services—all in one place.
          </p>
          <div className="landing-hero-actions">
            <Button
              className="button primary"
              nativeButton={false}
              render={<Link href="#features" />}
            >
              Explore the platform <ArrowRight size={15} />
            </Button>
            <Link href="#how-it-works">
              How it works <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="landing-trust-line">
            <ShieldCheck size={16} /> Practical help, built around community and
            privacy.
          </div>
        </div>
        <div className="landing-hero-art" aria-hidden="true">
          <div className="landing-art-orbit orbit-a" />
          <div className="landing-art-orbit orbit-b" />
          <div className="landing-art-circle" />
          <span className="landing-art-main">🤝</span>
          <span className="landing-art-spark">✳</span>
          <Card className="landing-art-note">
            <span>✓</span>
            <div>
              <b>A little help goes a long way</b>
              <small>Neighbors helping neighbors</small>
            </div>
          </Card>
          <Card className="landing-art-float">
            <span>👜</span>
            <small>Found nearby</small>
          </Card>
        </div>
      </section>

      <section className="landing-stats" aria-label="Sample platform activity">
        {(
          [
            [Heart, "14", "Lost & found posts"],
            [FileText, "5", "City reports"],
            [Users, "6", "Local services"],
            [ShieldCheck, "3", "Emergency hotlines"],
          ] as const
        ).map(([Icon, value, label]) => (
          <div className="landing-stat" key={String(label)}>
            <span>
              <Icon size={18} />
            </span>
            <div>
              <b>{value}</b>
              <small>{label}</small>
            </div>
          </div>
        ))}
        <small className="landing-demo-note">SAMPLE DEMO DATA</small>
      </section>

      <section className="landing-about" id="about">
        <div className="landing-section-heading">
          <div>
            <Badge variant="secondary">ABOUT FOUND CAMBODIA</Badge>
            <h2>
              Community support, <em>all in one place.</em>
            </h2>
            <p>
              Found Cambodia brings practical community tools together so
              neighbors can help one another, find useful services, and make
              local issues easier to see.
            </p>
          </div>
        </div>
        <div className="landing-about-values">
          <Card size="sm">
            <span>
              <HandHeart size={19} />
            </span>
            <h3>People first</h3>
            <p>
              Simple ways to ask for help, share useful information, and offer
              support.
            </p>
          </Card>
          <Card size="sm">
            <span>
              <MapPinned size={19} />
            </span>
            <h3>Local by design</h3>
            <p>
              Tools and information organized around communities across
              Cambodia.
            </p>
          </Card>
          <Card size="sm">
            <span>
              <ShieldCheck size={19} />
            </span>
            <h3>Safer sharing</h3>
            <p>
              Clear consent and privacy-minded flows are part of the experience.
            </p>
          </Card>
        </div>
      </section>

      <section className="landing-section" id="features">
        <div className="landing-section-heading">
          <div>
            <Badge variant="secondary">ONE COMMUNITY HUB</Badge>
            <h2>
              Everything you need to <em>lend a hand.</em>
            </h2>
            <p>
              Choose a service to learn more or open its interactive reporting
              tools.
            </p>
          </div>
          <Link href="#about">
            About Found Cambodia <ArrowRight size={14} />
          </Link>
        </div>
        <div className="landing-feature-grid">
          {features.map(({ icon: Icon, name, detail, href, count, tone }) => (
            <Link className="landing-feature-link" href={href} key={href}>
              <Card className="landing-feature-card">
                <div className={`landing-feature-icon ${tone}`}>
                  <Icon size={21} />
                </div>
                <Badge variant="outline">{count}</Badge>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <p>{detail}</p>
                </CardHeader>
                <CardContent>
                  Explore feature <ArrowUpRight size={14} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-community" id="updates">
        <div className="landing-section-heading">
          <div>
            <Badge variant="secondary">AROUND THE COMMUNITY</Badge>
            <h2>
              Local updates that <em>matter.</em>
            </h2>
            <p>
              Examples of the kinds of notices and activity neighbors can find.
            </p>
          </div>
          <Link href="/services/community">
            Open community services <ArrowRight size={14} />
          </Link>
        </div>
        <div className="landing-update-grid">
          <Card className="landing-update-card">
            <Badge variant="outline">SAFETY · SAMPLE</Badge>
            <span className="landing-update-icon rain">🌧️</span>
            <h3>Heavy rain watch</h3>
            <b>Phnom Penh · Chamkar Mon</b>
            <p>
              Water levels may rise near low-lying roads. Avoid flooded
              underpasses and check local updates.
            </p>
            <small>Public notice · Demo</small>
          </Card>
          <Card className="landing-update-card">
            <Badge variant="outline">ROADS · SAMPLE</Badge>
            <span className="landing-update-icon road">🚧</span>
            <h3>Road works on Street 271</h3>
            <b>Phnom Penh · Mean Chey</b>
            <p>
              One lane is closed near the market. Follow posted diversions while
              work is underway.
            </p>
            <small>Public notice · Demo</small>
          </Card>
          <Card className="landing-update-card">
            <Badge variant="outline">COMMUNITY · SAMPLE</Badge>
            <span className="landing-update-icon help">🌱</span>
            <h3>Neighbors ready to help</h3>
            <b>Siem Reap · Wat Bo</b>
            <p>
              Find volunteer opportunities and local service information shared
              for the community.
            </p>
            <small>Community board · Demo</small>
          </Card>
        </div>
      </section>

      <section className="landing-steps" id="how-it-works">
        <div className="landing-section-heading">
          <div>
            <Badge variant="secondary">HOW IT WORKS</Badge>
            <h2>
              Help starts with <em>one small step.</em>
            </h2>
          </div>
        </div>
        <div className="landing-step-grid">
          <Card className="landing-step-card">
            <span>01</span>
            <h3>Choose a service</h3>
            <p>
              Open Lost & Found, city reports, emergency contact, or community
              services.
            </p>
          </Card>
          <Card className="landing-step-card">
            <span>02</span>
            <h3>Share what’s needed</h3>
            <p>
              Use a clear report, location, and optional photo where the service
              supports it.
            </p>
          </Card>
          <Card className="landing-step-card">
            <span>03</span>
            <h3>Stay connected</h3>
            <p>
              Follow sample statuses, find local resources, or see how a report
              moves through the demo.
            </p>
          </Card>
        </div>
      </section>

      <section className="landing-feedback" id="feedback">
        <div>
          <Badge variant="secondary">YOUR VOICE MATTERS</Badge>
          <h2>Help us make this more useful.</h2>
          <p>Share feedback about the Found Cambodia demo.</p>
        </div>
        <Card>
          <CardHeader>
            <div className="landing-feedback-icon">
              <MessageCircle size={17} />
            </div>
            <div>
              <CardTitle>Send a suggestion</CardTitle>
              <p>Your feedback stays in this browser demo.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={sendFeedback}>
              <Textarea
                rows={3}
                value={feedback}
                onChange={(event) => {
                  setFeedback(event.target.value);
                  setSent(false);
                }}
                placeholder="What should we improve?"
                required
              />
              <Button type="submit">
                Send feedback <ArrowRight size={14} />
              </Button>
              {sent && (
                <small role="status">
                  Thanks — your feedback was received in this demo.
                </small>
              )}
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="landing-faq" id="faq">
        <div>
          <Badge variant="secondary">GOOD TO KNOW</Badge>
          <h2>
            Frequently asked <em>questions.</em>
          </h2>
          <p>Quick answers about using this community platform demo.</p>
        </div>
        <div className="landing-faq-list">
          <details>
            <summary>
              Is Found Cambodia connected to real emergency services?
              <span>+</span>
            </summary>
            <p>
              No. Emergency reporting is a demo flow. For urgent help, call the
              official local hotline directly.
            </p>
          </details>
          <details>
            <summary>
              Can I submit a report or add a photo?<span>+</span>
            </summary>
            <p>
              Yes. The feature pages let you submit demo reports and preview
              selected photos in your browser. They are not uploaded to a
              server.
            </p>
          </details>
          <details>
            <summary>
              Do I need an account to explore?<span>+</span>
            </summary>
            <p>
              You can browse the public service pages without signing in. Sign
              in to open the dashboard view.
            </p>
          </details>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
