"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarTools from "@/components/navbar-tools";
import { requireDemoAccount } from "@/lib/utils";
import {
  CityModule,
  CommunityModule,
  EmergencyModule,
  HomeModule,
} from "./modules";

type Item = {
  id: number;
  title: string;
  category: string;
  type: "Lost" | "Found";
  place: string;
  city: string;
  date: string;
  color: string;
  icon: string;
  description: string;
  status: string;
  comments: number;
  photo?: string;
};

const initialItems: Item[] = [
  {
    id: 1,
    title: "Canvas tote bag",
    category: "Bags",
    type: "Found",
    place: "Wat Phnom",
    city: "Phnom Penh",
    date: "Today, 9:42 AM",
    color: "peach",
    icon: "👜",
    description: "Found near the east entrance. A small keychain is attached.",
    status: "Posted",
    comments: 3,
  },
  {
    id: 2,
    title: "Black wireless earbuds",
    category: "Electronics",
    type: "Lost",
    place: "AEON Mall Sen Sok",
    city: "Phnom Penh",
    date: "Today, 8:15 AM",
    color: "lavender",
    icon: "🎧",
    description:
      "Small black charging case, possibly left near the food court.",
    status: "Posted",
    comments: 5,
  },
  {
    id: 3,
    title: "Brown leather wallet",
    category: "Personal items",
    type: "Found",
    place: "Independence Monument",
    city: "Phnom Penh",
    date: "Yesterday",
    color: "sand",
    icon: "👛",
    description:
      "Found on the footpath. Cards and personal details are hidden for safety.",
    status: "Claim pending",
    comments: 2,
  },
  {
    id: 4,
    title: "Blue water bottle",
    category: "Personal items",
    type: "Lost",
    place: "Royal University of Phnom Penh",
    city: "Phnom Penh",
    date: "Yesterday",
    color: "sky",
    icon: "🧴",
    description:
      "Matte blue bottle with a few stickers. Last seen in the library.",
    status: "Posted",
    comments: 1,
  },
  {
    id: 5,
    title: "Silver bicycle",
    category: "Transport",
    type: "Found",
    place: "Riverside promenade",
    city: "Siem Reap",
    date: "Nov 18",
    color: "mint",
    icon: "🚲",
    description:
      "Left locked to the railing overnight. Please describe the lock to claim.",
    status: "Posted",
    comments: 4,
  },
  {
    id: 6,
    title: "Student ID card",
    category: "Documents",
    type: "Found",
    place: "Central Market",
    city: "Battambang",
    date: "Nov 17",
    color: "rose",
    icon: "🪪",
    description:
      "Found outside the market. Name and ID number are kept private.",
    status: "Posted",
    comments: 0,
  },
  {
    id: 7,
    title: "Green umbrella",
    category: "Personal items",
    type: "Lost",
    place: "Russian Market",
    city: "Phnom Penh",
    date: "Nov 16",
    color: "mint",
    icon: "☂️",
    description:
      "Dark green folding umbrella, left near the south entrance during the rain.",
    status: "Posted",
    comments: 2,
  },
  {
    id: 8,
    title: "Camera lens pouch",
    category: "Electronics",
    type: "Found",
    place: "Pub Street",
    city: "Siem Reap",
    date: "Nov 15",
    color: "lavender",
    icon: "📷",
    description:
      "Found after the evening market. Please describe the lens brand to claim.",
    status: "Posted",
    comments: 6,
  },
  {
    id: 9,
    title: "Red school backpack",
    category: "Bags",
    type: "Lost",
    place: "Wat Bo Primary School",
    city: "Siem Reap",
    date: "Nov 14",
    color: "rose",
    icon: "🎒",
    description:
      "Small red backpack with a hand-sewn name tag inside. Family is checking nearby posts.",
    status: "Posted",
    comments: 3,
  },
  {
    id: 10,
    title: "House keys with blue tag",
    category: "Personal items",
    type: "Found",
    place: "Kampot Riverside",
    city: "Kampot",
    date: "Nov 13",
    color: "sand",
    icon: "🔑",
    description:
      "Set of three keys on a blue fabric tag. Exact tag pattern is kept private.",
    status: "Returned",
    comments: 4,
  },
  {
    id: 11,
    title: "Prescription glasses",
    category: "Personal items",
    type: "Lost",
    place: "Battambang bus station",
    city: "Battambang",
    date: "Nov 12",
    color: "sky",
    icon: "👓",
    description:
      "Black round frames in a brown case. Might have been left in the waiting area.",
    status: "Posted",
    comments: 1,
  },
  {
    id: 12,
    title: "White phone charger",
    category: "Electronics",
    type: "Found",
    place: "Kampot public library",
    city: "Kampot",
    date: "Nov 11",
    color: "peach",
    icon: "🔌",
    description:
      "USB-C wall charger found by the reading tables. Describe the cable to claim.",
    status: "Posted",
    comments: 0,
  },
  {
    id: 13,
    title: "Blue passport holder",
    category: "Documents",
    type: "Lost",
    place: "Phnom Penh International Airport",
    city: "Phnom Penh",
    date: "Nov 10",
    color: "sky",
    icon: "🛂",
    description:
      "Blue fabric cover. Passport number and personal information are not shown publicly.",
    status: "Posted",
    comments: 7,
  },
  {
    id: 14,
    title: "Kids’ yellow jacket",
    category: "Personal items",
    type: "Found",
    place: "Kep Beach",
    city: "Kep",
    date: "Nov 9",
    color: "sand",
    icon: "🧥",
    description:
      "Found on a bench close to the beach path. Small size, yellow with a green lining.",
    status: "Posted",
    comments: 2,
  },
];

const categories = [
  "All items",
  "Personal items",
  "Electronics",
  "Bags",
  "Documents",
  "Transport",
];

function displayNameFromEmail(email: string) {
  return (
    email
      .split("@")[0]
      .split(/[._+-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Community member"
  );
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Home({
  module = "home",
  requireAuth = true,
  standalone = false,
}: {
  module?: string;
  requireAuth?: boolean;
  standalone?: boolean;
}) {
  const router = useRouter();
  const isLoggedIn = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => Boolean(window.localStorage.getItem("found-cambodia-demo-user")),
    () => false,
  );
  const [memberName, setMemberName] = useState("Guest");
  useEffect(() => {
    const storedUser = window.localStorage.getItem(
      "found-cambodia-demo-user",
    );
    if (!storedUser) {
      setMemberName("Guest");
      return;
    }
    const storedProfile = window.localStorage.getItem("found-cambodia-profile");
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile) as {
          name?: string;
          email?: string;
        };
        const emailMatches =
          storedUser.includes("@") &&
          profile.email?.toLowerCase() === storedUser.toLowerCase();
        setMemberName(
          storedUser.includes("@")
            ? emailMatches && profile.name
              ? profile.name
              : displayNameFromEmail(storedUser)
            : profile.name || storedUser,
        );
      } catch {
        setMemberName(
          storedUser.includes("@")
            ? displayNameFromEmail(storedUser)
            : storedUser,
        );
      }
    } else {
      setMemberName(
        storedUser.includes("@")
          ? displayNameFromEmail(storedUser)
          : storedUser,
      );
    }
  }, []);
  useEffect(() => {
    if (requireAuth && !isLoggedIn) router.replace("/login");
  }, [isLoggedIn, requireAuth, router]);
  const activeModule =
    module === "home"
      ? "home"
      : module === "city-reports"
        ? "city"
        : module === "emergency"
          ? "emergency"
          : module === "community-services"
            ? "community"
            : "lost";
  const [items, setItems] = useState(initialItems);
  const [tab, setTab] = useState("All items");
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All Cambodia");
  const [place, setPlace] = useState("All cities");
  const [dateFilter, setDateFilter] = useState("All dates");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modal, setModal] = useState<"post" | "claim" | "comments" | null>(
    null,
  );
  const [postPhoto, setPostPhoto] = useState("");
  const [selected, setSelected] = useState<Item | null>(null);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (tab === "All items" || item.type === tab) &&
          (category === "All items" || item.category === category) &&
          (city === "All Cambodia" || item.city === city) &&
          (place === "All cities" || item.place === place) &&
          (dateFilter === "All dates" || (dateFilter === "Today" ? item.date.startsWith("Today") : !item.date.startsWith("Nov "))) &&
          `${item.title} ${item.place} ${item.city} ${item.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [items, tab, category, city, place, dateFilter, query],
  );
  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };
  const open = (kind: "post" | "claim" | "comments", item?: Item) => {
    if ((kind === "post" || kind === "claim") && !requireDemoAccount()) return;
    setSelected(item ?? null);
    if (kind === "post") setPostPhoto("");
    setModal(kind);
  };
  const submitPost = (form: FormData) => {
    const title = String(form.get("title") || "New community post");
    const next: Item = {
      id: Date.now(),
      title,
      category: String(form.get("category") || "Personal items"),
      type: String(form.get("type") || "Lost") as "Lost" | "Found",
      place: String(form.get("place") || "Phnom Penh"),
      city: String(form.get("city") || "Phnom Penh"),
      date: "Just now",
      color: "mint",
      icon: String(form.get("icon") || "📦"),
      description: String(
        form.get("description") || "Posted by a community member.",
      ),
      status: "Posted",
      comments: 0,
      photo: postPhoto || undefined,
    };
    setItems((current) => [next, ...current]);
    setModal(null);
    setPostPhoto("");
    setTab("All items");
    setCategory("All items");
    setCity("All Cambodia");
    setPlace("All cities");
    setDateFilter("All dates");
    flash("Your post is live with your photo attached.");
  };
  const sendClaim = (form: FormData) => {
    if (selected)
      setItems((current) =>
        current.map((item) =>
          item.id === selected.id ? { ...item, status: "Claim pending" } : item,
        ),
      );
    setModal(null);
    flash("Claim sent to the finder. Your private details stay hidden.");
    void form;
  };

  if (requireAuth && !isLoggedIn)
    return (
      <main className="auth-loading">
        <div className="brand-mark">f</div>
        <p>Checking your demo session…</p>
      </main>
    );
  return (
    <main
      className={`app-shell ${standalone ? "service-shell" : ""} ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      {!standalone && (
        <aside className="sidebar">
          <a className="brand" href="/">
            <span className="brand-mark">f</span>
            <span className="brand-copy">
              found<span className="brand-dot">.</span>
              <small>CAMBODIA</small>
            </span>
          </a>
          <div className="side-label">WORKSPACE</div>
          <nav className="side-nav">
            <Link
              className={`nav-link ${activeModule === "home" ? "active" : ""}`}
              href="/dashboard"
              title="Home"
            >
              <Icon name="grid" /> <span className="nav-label">Home</span>
            </Link>
            <Link className="nav-link" href="/profile" title="My profile">
              <Icon name="profile" />
              <span className="nav-label">My profile</span>
            </Link>
            <div className="side-label core-nav-label">CORE FEATURES</div>
            <Link
              className={`nav-link ${activeModule === "lost" ? "active" : ""}`}
              href="/lost-found"
              title="Lost & Found"
            >
              <Icon name="heart" />
              <span className="nav-label">Lost &amp; Found</span>
            </Link>
            <Link
              className={`nav-link ${activeModule === "city" ? "active" : ""}`}
              href="/city-reports"
              title="Government reports"
            >
              <Icon name="pin" />
              <span className="nav-label">Government reports</span>
            </Link>
            <Link
              className={`nav-link ${activeModule === "emergency" ? "active" : ""}`}
              href="/emergency"
              title="Emergency contact"
            >
              <Icon name="shield" />
              <span className="nav-label">Emergency contact</span>
            </Link>
            <Link
              className={`nav-link ${activeModule === "community" ? "active" : ""}`}
              href="/community-services"
              title="Community & services"
            >
              <Icon name="grid" />
              <span className="nav-label">Community &amp; services</span>
            </Link>
          </nav>
          <div className="side-label location-label">BROWSE BY LOCATION</div>
          <div className="location-links">
            <button onClick={() => setCity("Phnom Penh")}>
              Phnom Penh{" "}
              <span>
                {
                  initialItems.filter((item) => item.city === "Phnom Penh")
                    .length
                }
              </span>
            </button>
            <button onClick={() => setCity("Siem Reap")}>
              Siem Reap{" "}
              <span>
                {
                  initialItems.filter((item) => item.city === "Siem Reap")
                    .length
                }
              </span>
            </button>
            <button onClick={() => setCity("Battambang")}>
              Battambang{" "}
              <span>
                {
                  initialItems.filter((item) => item.city === "Battambang")
                    .length
                }
              </span>
            </button>
            <button onClick={() => setCity("Kampot")}>
              Kampot{" "}
              <span>
                {initialItems.filter((item) => item.city === "Kampot").length}
              </span>
            </button>
            <button onClick={() => setCity("Kep")}>
              Kep{" "}
              <span>
                {initialItems.filter((item) => item.city === "Kep").length}
              </span>
            </button>
            <button onClick={() => setCity("All Cambodia")}>
              All Cambodia <span>{initialItems.length}</span>
            </button>
          </div>
          <div className="sidebar-bottom">
            <div className="community-card">
              <div className="community-emoji">✦</div>
              <b>Good things find their way.</b>
              <p>A little help from the community makes a big difference.</p>
              <a href="#how">
                Our safety promise <span>↗</span>
              </a>
            </div>
            {isLoggedIn && <Link className="user-row" href="/profile">
              <div className="avatar">
                {memberName[0]?.toUpperCase() || "S"}
              </div>
              <div>
                <b>{memberName}</b>
                <small>Community member</small>
              </div>
              <span className="user-menu-dots">•••</span>
            </Link>}
          </div>
        </aside>
      )}

      <section className="main-area" id="home">
        <header className="topbar">
          {!standalone && (
            <button
              className="sidebar-toggle"
              type="button"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={sidebarCollapsed}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>
          )}
          {!standalone && (
            <nav className="app-primary-nav" aria-label="Main navigation">
              <Link
                href="/dashboard"
                aria-current={activeModule === "home" ? "page" : undefined}
              >
                Home
              </Link>
              <Link href="/about">About</Link>
              <details
                className={`nav-community-menu ${activeModule !== "home" ? "is-active" : ""}`}
              >
                <summary>
                  Community <ChevronDown size={13} aria-hidden="true" />
                </summary>
                <div className="nav-community-dropdown">
                  <Link href="/lost-found">Lost &amp; Found</Link>
                  <Link href="/city-reports">Government reports</Link>
                  <Link href="/emergency">Emergency contact</Link>
                  <Link href="/community-services">Community &amp; services</Link>
                </div>
              </details>
            </nav>
          )}
          {standalone && (
            <div className={`breadcrumb ${activeModule === "emergency" ? "emergency-brand-cell" : ""}`}>
              {activeModule === "emergency" ? <Link className="service-national-brand" href="/"><span>♛</span><b>National Community<br/>Services Platform</b></Link> : <><Link href="/">Home</Link> <span>/</span>{" "}<b>{activeModule === "home" ? "Platform overview" : activeModule === "lost" ? "Lost & found" : activeModule === "city" ? "Government reports" : "Community & services"}</b></>}
            </div>
          )}
          {standalone && (
            <nav className="service-top-nav" aria-label="Service pages">
              <Link href="/about">About</Link>
              <Link className={activeModule === "lost" ? "active" : ""} href="/services/lost-found">Lost &amp; Found</Link>
              <Link className={activeModule === "city" ? "active" : ""} href="/services/city-reports">Government reports</Link>
              <Link className={activeModule === "emergency" ? "active" : ""} href="/services/emergency">Emergency contact</Link>
              <Link href="/services/community">Community &amp; services</Link>
            </nav>
          )}
          <div className="top-actions">
            <NavbarTools />
            {(activeModule === "lost" || activeModule === "community" || activeModule === "emergency") && (
              <span className="location-pill">
                <Icon name="pin" size={15} />
                <select
                  aria-label="Choose location"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>All Cambodia</option>
                  <option>Phnom Penh</option>
                  <option>Siem Reap</option>
                  <option>Battambang</option>
                  <option>Kampot</option>
                  <option>Kep</option>
                </select>
              </span>
            )}
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() =>
                flash(
                  "You’re all caught up — we’ll notify you about new matches.",
                )
              }
            >
              <Bell size={18} />
            </button>
            {isLoggedIn && <Link
              className="dashboard-user-link"
              href="/profile"
              aria-label={`Open ${memberName} profile`}
            >
              <span className="avatar small-avatar">
                {memberName[0]?.toUpperCase() || "S"}
              </span>
              <b>{memberName}</b>
              <ChevronDown size={13} />
            </Link>}
          </div>
        </header>
        {activeModule === "lost" ? (
          <div className="content">
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="live-dot" /> CAMBODIA COMMUNITY BOARD
                </div>
                <h1>
                  Lost something?
                  <br />
                  <em>Let’s bring it home.</em>
                </h1>
                <p>
                  A little kindness goes a long way. Find what’s missing, or
                  help someone find their way back to it.
                </p>
                <div className="hero-actions">
                  <Button
                    className="button primary"
                    onClick={() => open("post")}
                  >
                    <Plus size={16} /> Post an item
                  </Button>
                  <button
                    className="button secondary"
                    onClick={() => {
                      setTab("Lost");
                      document
                        .getElementById("listings")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Browse lost items <ArrowRight size={15} />
                  </button>
                </div>
              </div>
              <div
                className="hero-art"
                aria-label="Illustration of a returned lost item"
              >
                <div className="sun-orbit orbit-one" />
                <div className="sun-orbit orbit-two" />
                <div className="art-sun" />
                <div className="art-bag">👜</div>
                <div className="art-spark spark-one">✳</div>
                <div className="art-spark spark-two">✦</div>
                <div className="art-card">
                  <span className="mini-check">✓</span>
                  <div>
                    <b>Back where it belongs</b>
                    <small>One good deed at a time</small>
                  </div>
                </div>
                <span className="art-caption">GOOD THINGS COME AROUND</span>
              </div>
            </section>
            <section className="stats-row">
              <div className="stat">
                <span className="stat-icon green">↗</span>
                <div>
                  <b>1,284</b>
                  <small>Items reunited</small>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon peach">◷</span>
                <div>
                  <b>68</b>
                  <small>Open posts</small>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon lilac">♡</span>
                <div>
                  <b>2,406</b>
                  <small>Kind neighbors</small>
                </div>
              </div>
              <div className="stats-note">
                <span>✳</span> Every post brings us a little closer.
              </div>
            </section>
            <section className="listing-section" id="listings">
              <div className="section-heading">
                <div>
                  <div className="eyebrow muted">THE COMMUNITY BOARD</div>
                  <h2>
                    Find your way to <em>what’s yours.</em>
                  </h2>
                </div>
                <Button
                  className="button primary post-small"
                  onClick={() => open("post")}
                >
                  <Plus size={16} /> Post an item
                </Button>
              </div>
              <div className="filter-bar">
                <label className="search-box">
                  <Icon name="search" size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items, places, or keywords..."
                  />
                  <kbd>⌘ K</kbd>
                </label>
                <label className="category-select">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === "All items" ? "All categories" : c}</option>
                    ))}
                  </select>
                  <span>⌄</span>
                </label>
                <label className="category-select extra-filter">
                  <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by province">
                    {["All Cambodia", "Phnom Penh", "Siem Reap", "Battambang", "Kampot", "Kep"].map((option) => <option key={option} value={option}>{option === "All Cambodia" ? "All provinces" : option}</option>)}
                  </select><span>⌄</span>
                </label>
                <label className="category-select extra-filter">
                  <select value={place} onChange={(e) => setPlace(e.target.value)} aria-label="Filter by city">
                    {["All cities", ...Array.from(new Set(items.map((item) => item.place)))].map((option) => <option key={option}>{option}</option>)}
                  </select><span>⌄</span>
                </label>
                <label className="category-select extra-filter">
                  <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} aria-label="Filter by date">
                    {["All dates", "Today", "This week"].map((option) => <option key={option}>{option}</option>)}
                  </select><span>⌄</span>
                </label>
              </div>
              <div className="tabs" role="tablist">
                {["All items", "Lost", "Found"].map((option) => (
                  <button
                    key={option}
                    role="tab"
                    aria-selected={tab === option}
                    className={tab === option ? "selected" : ""}
                    onClick={() => setTab(option)}
                  >
                    {option}
                    <span>
                      {option === "All items"
                        ? items.length
                        : items.filter((i) => i.type === option).length}
                    </span>
                  </button>
                ))}
                <div className="results-label">
                  Showing <b>{filtered.length} items</b>
                </div>
              </div>
              <div className="item-grid">
                {filtered.map((item) => (
                  <article className="item-card" key={item.id}>
                    <div className={`item-visual ${item.color}`}>
                      {item.photo && (
                        <img
                          className="item-photo"
                          src={item.photo}
                          alt={`Photo of ${item.title}`}
                        />
                      )}
                      <span className={`type-tag ${item.type.toLowerCase()}`}>
                        {item.type}
                      </span>
                      {!item.photo && (
                        <span className="item-emoji">{item.icon}</span>
                      )}
                      <button
                        className="save-button"
                        aria-label="Save item"
                        onClick={() => flash("Saved to your watchlist.")}
                      >
                        <Icon name="heart" size={17} />
                      </button>
                    </div>
                    <div className="item-info">
                      <div className="item-meta">
                        {item.category}
                        <span>·</span>
                        {item.date}
                      </div>
                      <h3>{item.title}</h3>
                      <div className="item-place">
                        <Icon name="pin" size={14} />
                        {item.place}, {item.city}
                      </div>
                      <div className="card-footer">
                        <span
                          className={`status ${item.status === "Claim pending" ? "pending" : ""}`}
                        >
                          <i /> {item.status}
                        </span>
                        <div className="card-buttons">
                          <button
                            className="comments-button"
                            onClick={() => open("comments", item)}
                          >
                            ♡ {item.comments}
                          </button>
                          {item.type === "Found" && (
                            <button
                              className="claim-button"
                              onClick={() => open("claim", item)}
                            >
                              That’s mine <span>→</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <span>⌕</span>
                  <b>No items found just yet</b>
                  <p>Try another search or clear your filters.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setCategory("All items");
                      setCity("All Cambodia");
                      setPlace("All cities");
                      setDateFilter("All dates");
                      setTab("All items");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
              <div className="load-row">
                <span>
                  You’re all caught up — check back soon for new posts.
                </span>
                <button
                  onClick={() => {
                    setItems([...items]);
                    flash("You’re viewing the latest posts.");
                  }}
                >
                  ↻ &nbsp;Refresh
                </button>
              </div>
            </section>
            <section className="lost-found-extras">
              <article className="how-it-works">
                <h2>How it works</h2>
                <div className="how-steps">{[["1", "Post", "Post lost or found items with details and photos."], ["2", "Secret detail", "Add a hidden detail only the finder knows."], ["3", "Claim", "The owner describes the item and its secret detail."], ["4", "Approve & return", "Finder approves and returns the item safely."]].map(([number, title, description]) => <div className="how-step" key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></div>)}</div>
              </article>
              <article className="matching-suggestions"><header><h2>Matching suggestions</h2><button onClick={() => { setTab("All items"); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}>View all</button></header>
                {[{ icon: "🔑", title: "Key with Toyota keychain", place: "Toul Kork, Phnom Penh", badge: "FOUND", age: "2 hours ago" }, { icon: "🎒", title: "Black backpack", place: "Russian Market, Phnom Penh", badge: "LOST", age: "5 hours ago" }].map((suggestion) => <div className="suggestion-row" key={suggestion.title}><span>{suggestion.icon}</span><div><small>{suggestion.badge}</small><b>{suggestion.title}</b><p><Icon name="pin" size={12}/>{suggestion.place}</p></div><time>{suggestion.age}</time></div>)}
              </article>
            </section>
            <section className="safety-strip" id="how">
              <span className="safety-icon">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <b>A little care makes a safer community.</b>
                <p>
                  Keep personal details private. Meet in a public place. Never
                  share passwords or payment details.
                </p>
              </div>
              <a
                href="#safety"
                onClick={(e) => {
                  e.preventDefault();
                  flash(
                    "Claims are verified by a private detail only the finder knows.",
                  );
                }}
              >
                Read our safety tips <span>→</span>
              </a>
            </section>
            <footer className="footer">
              <span>© 2025 Found Cambodia</span>
              <span>
                Made with <b>♥</b> for our community
              </span>
              <a href="#how">Community guidelines</a>
            </footer>
          </div>
        ) : (
          <div className="content">
            {activeModule === "home" ? (
              <HomeModule memberName={isLoggedIn ? memberName : null} />
            ) : activeModule === "city" ? (
              <CityModule notify={flash} />
            ) : activeModule === "emergency" ? (
              <EmergencyModule notify={flash} />
            ) : (
              <CommunityModule notify={flash} />
            )}
          </div>
        )}
      </section>
      {notice && (
        <div className="toast">
          <span>✓</span>
          {notice}
        </div>
      )}
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <section className="dialog" role="dialog" aria-modal="true">
            <button
              className="dialog-close"
              aria-label="Close"
              onClick={() => setModal(null)}
            >
              ×
            </button>
            {modal === "post" ? (
              <>
                <div className="dialog-icon">✳</div>
                <div className="eyebrow muted">HELP MAKE THE CONNECTION</div>
                <h2>Post an item</h2>
                <p className="dialog-intro">
                  Share the basics. Keep one identifying detail private so the
                  owner can prove it’s theirs.
                </p>
                <form action={submitPost}>
                  <div className="form-row">
                    <label>
                      Is it lost or found?
                      <select name="type">
                        <option>Lost</option>
                        <option>Found</option>
                      </select>
                    </label>
                    <label>
                      Category
                      <select name="category">
                        {categories.slice(1).map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    What is it called?
                    <input
                      name="title"
                      required
                      placeholder="e.g. Blue backpack"
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Where was it?
                      <input
                        name="place"
                        required
                        placeholder="Place or neighborhood"
                      />
                    </label>
                    <label>
                      City
                      <select name="city">
                        <option>Phnom Penh</option>
                        <option>Siem Reap</option>
                        <option>Battambang</option>
                        <option>Kampot</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Short description
                    <input
                      name="description"
                      placeholder="Color, brand, or helpful context"
                    />
                  </label>
                  <label className="upload-box">
                    ▧ &nbsp; Add an item photo{" "}
                    <small>Optional · previewed in this demo</small>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setPostPhoto(file ? URL.createObjectURL(file) : "");
                      }}
                    />
                  </label>
                  {postPhoto && (
                    <img
                      className="upload-preview"
                      src={postPhoto}
                      alt="Selected item preview"
                    />
                  )}
                  <div className="private-note">
                    <Icon name="shield" size={18} />
                    <span>
                      <b>Keep one detail to yourself.</b>
                      <br />A hidden detail helps the finder verify the real
                      owner.
                    </span>
                  </div>
                  <Button className="button primary full-button" type="submit">
                    Publish community post <ArrowRight size={15} />
                  </Button>
                </form>
              </>
            ) : modal === "claim" ? (
              <>
                <div className="dialog-icon">♡</div>
                <div className="eyebrow muted">
                  A LITTLE PROOF GOES A LONG WAY
                </div>
                <h2>Is this yours?</h2>
                <p className="dialog-intro">
                  Tell the finder something only the real owner would know about{" "}
                  <b>{selected?.title}</b>. Your answer stays private.
                </p>
                <form action={sendClaim}>
                  <label>
                    What’s a detail that proves it’s yours?
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe a mark, detail, or what’s inside…"
                    />
                  </label>
                  <div className="private-note">
                    <Icon name="shield" size={18} />
                    <span>
                      <b>Your details stay private.</b>
                      <br />
                      The finder will review your claim before approving.
                    </span>
                  </div>
                  <button className="button primary full-button">
                    Send claim <span>→</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="dialog-icon">♡</div>
                <div className="eyebrow muted">COMMUNITY SIGHTINGS</div>
                <h2>{selected?.title}</h2>
                <p className="dialog-intro">{selected?.description}</p>
                <div className="comment-list">
                  <div>
                    <span className="comment-avatar">M</span>
                    <p>
                      <b>Mary L.</b>
                      <small>Is this close to the library entrance?</small>
                    </p>
                  </div>
                  <div>
                    <span className="comment-avatar coral">V</span>
                    <p>
                      <b>Vicheka</b>
                      <small>
                        I saw something similar near the main gate yesterday.
                      </small>
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!requireDemoAccount()) return;
                    if (selected)
                      setItems((current) =>
                        current.map((i) =>
                          i.id === selected.id
                            ? { ...i, comments: i.comments + 1 }
                            : i,
                        ),
                      );
                    setModal(null);
                    flash("Your comment was added.");
                  }}
                >
                  <label>
                    Add a comment
                    <input required placeholder="Share a helpful sighting…" />
                  </label>
                  <button
                    className="button primary full-button"
                    onClick={(event) => {
                      if (!requireDemoAccount()) event.preventDefault();
                    }}
                  >
                    Post comment <span>→</span>
                  </button>
                </form>
                <p className="comment-rule">
                  Comments help find an item. Only a verified claim can
                  establish ownership.
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
