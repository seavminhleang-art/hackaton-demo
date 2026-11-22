"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Compass,
  Heart,
  Home,
  LockKeyhole,
  LogOut,
  MapPin,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarTools from "@/components/navbar-tools";

type Profile = {
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  language: string;
  address: string;
  bio: string;
};
const defaultProfile: Profile = {
  name: "Sokha Chan",
  username: "sokhachan",
  email: "sokha@example.com",
  phone: "",
  city: "Phnom Penh",
  language: "English",
  address: "",
  bio: "Helping neighbors find what is lost and supporting a stronger community.",
};

const featureLinks = [
  [Heart, "Lost & Found", "/services/lost-found"],
  [MapPin, "Government reports", "/services/city-reports"],
  [ShieldCheck, "Emergency contact", "/services/emergency"],
  [Users, "Community & services", "/services/community"],
] as const;

export default function ProfileApp() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [avatar, setAvatar] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const [saved, setSaved] = useState(false);
  const [noticePrefs, setNoticePrefs] = useState({
    matches: true,
    reports: true,
    community: false,
  });
  const [privacyPrefs, setPrivacyPrefs] = useState({
    showProfile: true,
    shareCity: true,
    showEmail: false,
  });

  useEffect(() => {
    const tab = window.location.hash.slice(1);
    if (["notifications", "privacy", "password"].includes(tab))
      setActiveTab(tab);
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("found-cambodia-demo-user");
    if (!user) {
      router.replace("/login");
      return;
    }
    try {
      const stored = window.localStorage.getItem("found-cambodia-profile");
      if (stored)
        setProfile({
          ...defaultProfile,
          ...(JSON.parse(stored) as Partial<Profile>),
        });
      else
        setProfile((current) => ({
          ...current,
          name: user.includes("@") ? "Community member" : user,
          email: user.includes("@") ? user : current.email,
        }));
      const storedPrefs = window.localStorage.getItem(
        "found-cambodia-profile-prefs",
      );
      if (storedPrefs) {
        const prefs = JSON.parse(storedPrefs) as {
          notifications?: typeof noticePrefs;
          privacy?: typeof privacyPrefs;
        };
        if (prefs.notifications) setNoticePrefs(prefs.notifications);
        if (prefs.privacy) setPrivacyPrefs(prefs.privacy);
      }
      setAvatar(
        window.localStorage.getItem("found-cambodia-profile-avatar") || "",
      );
      setReady(true);
    } catch {
      setReady(true);
    }
  }, [router]);

  const update = (field: keyof Profile, value: string) =>
    setProfile((current) => ({ ...current, [field]: value }));
  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(
      "found-cambodia-profile",
      JSON.stringify(profile),
    );
    window.localStorage.setItem("found-cambodia-demo-user", profile.name);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };
  const savePreferences = () => {
    window.localStorage.setItem(
      "found-cambodia-profile-prefs",
      JSON.stringify({ notifications: noticePrefs, privacy: privacyPrefs }),
    );
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };
  const logout = () => {
    window.localStorage.removeItem("found-cambodia-demo-user");
    router.replace("/");
  };
  const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = String(reader.result || "");
      setAvatar(image);
      window.localStorage.setItem("found-cambodia-profile-avatar", image);
    };
    reader.readAsDataURL(file);
  };

  if (!ready)
    return (
      <main className="auth-loading">
        <div className="brand-mark">f</div>
        <p>Opening your profile…</p>
      </main>
    );
  const initials =
    profile.name
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "FC";

  return (
    <main className="app-shell profile-shell">
      <aside className="sidebar profile-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">f</span>
          <span>
            found<span className="brand-dot">.</span>
            <small>CAMBODIA</small>
          </span>
        </Link>
        <div className="side-label">OVERVIEW</div>
        <nav className="side-nav">
          <Link className="nav-link" href="/dashboard">
            <Home size={16} /> Dashboard
          </Link>
          <Link className="nav-link active" href="/profile">
            <UserRound size={16} /> My profile
          </Link>
        </nav>
        <div className="side-label">CORE FEATURES</div>
        <nav className="side-nav">
          {featureLinks.map(([Icon, label, href]) => (
            <Link className="nav-link" href={href} key={href}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          <Link className="nav-link" href="/profile#notifications">
            <Bell size={16} /> Notifications
          </Link>
          <Link className="nav-link" href="/profile#privacy">
            <Settings size={16} /> Settings
          </Link>
        </nav>
        <div className="profile-help">
          <CircleHelp size={17} />
          <b>Need help?</b>
          <p>
            Check the community guide or get in touch with the Found Cambodia
            team.
          </p>
          <Link href="/about">
            Community guide <span>→</span>
          </Link>
        </div>
        <Link className="user-row profile-user-row" href="/profile">
          <div className="avatar">{initials}</div>
          <div>
            <b>{profile.name}</b>
            <small>Community member</small>
          </div>
          <ChevronDown size={14} />
        </Link>
        <button className="profile-logout" type="button" onClick={logout}>
          <LogOut size={15} />
          Log out
        </button>
      </aside>

      <section className="main-area profile-main">
        <header className="topbar profile-topbar">
          <nav className="app-primary-nav" aria-label="Main navigation">
            <Link href="/dashboard">Home</Link>
            <Link href="/about">About</Link>
            <details className="nav-community-menu">
              <summary>
                Community <ChevronDown size={13} aria-hidden="true" />
              </summary>
              <div className="nav-community-dropdown">
                {featureLinks.map(([Icon, label, href]) => (
                  <Link href={href} key={href}>
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
          <div className="top-actions">
            <NavbarTools />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => router.push("/profile#notifications")}
            >
              <Bell size={17} />
            </Button>
            <details className="profile-account-menu">
              <summary className="profile-top-user" aria-label="Account menu">
                {avatar ? <img src={avatar} alt="" /> : <span>{initials}</span>}
                {profile.name}
                <ChevronDown size={13} />
              </summary>
              <div className="profile-account-dropdown">
                <Link href="/profile">
                  <UserRound size={15} /> Profile
                </Link>
                <button type="button" onClick={logout}>
                  <LogOut size={15} /> Log out
                </button>
              </div>
            </details>
          </div>
        </header>
        <div className="profile-content">
          <div className="profile-heading">
            <div>
              <h1>Profile</h1>
              <p>Manage your account settings and personal information.</p>
            </div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <b>Profile</b>
            </div>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              const tab = String(value);
              setActiveTab(tab);
              window.history.replaceState(
                null,
                "",
                tab === "account" ? "/profile" : `/profile#${tab}`,
              );
            }}
            className="profile-tabs"
          >
            <TabsList variant="line" className="profile-tab-list">
              <TabsTrigger value="account">
                <UserRound size={14} />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell size={14} />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <ShieldCheck size={14} />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="password">
                <LockKeyhole size={14} />
                Change password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="profile-cover">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="profile-identity">
                <label
                  className="profile-avatar-upload"
                  title="Change profile photo"
                >
                  {avatar ? (
                    <img src={avatar} alt="Profile" />
                  ) : (
                    <span>{initials}</span>
                  )}
                  <i>
                    <Input
                      type="file"
                      accept="image/*"
                      aria-label="Upload profile photo"
                      onChange={changeAvatar}
                    />
                    <Compass size={13} />
                  </i>
                </label>
                <div>
                  <h2>{profile.name}</h2>
                  <small>@{profile.username || "communitymember"}</small>
                  <Badge variant="secondary">
                    <Users size={12} /> Member
                  </Badge>
                </div>
              </div>
              <Card className="profile-form-card">
                <CardHeader className="profile-card-heading">
                  <div className="profile-card-icon">
                    <UserRound size={17} />
                  </div>
                  <div>
                    <CardTitle>Personal details</CardTitle>
                    <p>
                      Update your personal information. Make sure your details
                      are accurate.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="profile-form" onSubmit={saveProfile}>
                    <label>
                      Full name
                      <Input
                        value={profile.name}
                        onChange={(e) => update("name", e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Username
                      <Input
                        value={profile.username}
                        onChange={(e) => update("username", e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Email address
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => update("email", e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Phone number
                      <Input
                        value={profile.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+855"
                      />
                    </label>
                    <label>
                      City
                      <select
                        value={profile.city}
                        onChange={(e) => update("city", e.target.value)}
                      >
                        {[
                          "Phnom Penh",
                          "Siem Reap",
                          "Battambang",
                          "Kampot",
                          "Kep",
                          "Other",
                        ].map((city) => (
                          <option key={city}>{city}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Preferred language
                      <select
                        value={profile.language}
                        onChange={(e) => update("language", e.target.value)}
                      >
                        <option>English</option>
                        <option>Khmer</option>
                        <option>French</option>
                      </select>
                    </label>
                    <label>
                      Address
                      <Input
                        value={profile.address}
                        onChange={(e) => update("address", e.target.value)}
                        placeholder="Neighborhood or street (optional)"
                      />
                    </label>
                    <label>
                      About me
                      <Input
                        value={profile.bio}
                        onChange={(e) => update("bio", e.target.value)}
                        placeholder="A short introduction"
                      />
                    </label>
                    <div className="profile-form-actions">
                      <span>
                        {saved
                          ? "✓ Changes saved"
                          : "Your profile is stored in this browser demo."}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setProfile(defaultProfile)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" id="notifications">
              <Card className="profile-settings-card">
                <CardHeader>
                  <CardTitle>Notification preferences</CardTitle>
                  <p>Choose which community updates you want to receive.</p>
                </CardHeader>
                <CardContent className="profile-toggle-list">
                  {(
                    [
                      [
                        "matches",
                        "Lost item matches",
                        "Let me know when a new post may match one of my items.",
                      ],
                      [
                        "reports",
                        "Report status updates",
                        "Tell me when a city report changes status.",
                      ],
                      [
                        "community",
                        "Community news",
                        "Send occasional volunteer and local service updates.",
                      ],
                    ] as const
                  ).map(([key, title, detail]) => (
                    <label className="profile-toggle" key={key}>
                      <span>
                        <b>{title}</b>
                        <small>{detail}</small>
                      </span>
                      <input
                        type="checkbox"
                        checked={noticePrefs[key]}
                        onChange={(e) =>
                          setNoticePrefs((current) => ({
                            ...current,
                            [key]: e.target.checked,
                          }))
                        }
                      />
                    </label>
                  ))}
                  <Button onClick={savePreferences}>
                    Save preferences <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="privacy" id="privacy">
              <Card className="profile-settings-card">
                <CardHeader>
                  <CardTitle>Privacy and sharing</CardTitle>
                  <p>
                    Control what is visible when you take part in the community.
                  </p>
                </CardHeader>
                <CardContent className="profile-toggle-list">
                  {(
                    [
                      [
                        "showProfile",
                        "Show my community profile",
                        "Let other members see your name and public contributions.",
                      ],
                      [
                        "shareCity",
                        "Show my city",
                        "Display your city on your public community profile.",
                      ],
                      [
                        "showEmail",
                        "Show my email address",
                        "Email is hidden by default. Only turn this on if you want it public.",
                      ],
                    ] as const
                  ).map(([key, title, detail]) => (
                    <label className="profile-toggle" key={key}>
                      <span>
                        <b>{title}</b>
                        <small>{detail}</small>
                      </span>
                      <input
                        type="checkbox"
                        checked={privacyPrefs[key]}
                        onChange={(e) =>
                          setPrivacyPrefs((current) => ({
                            ...current,
                            [key]: e.target.checked,
                          }))
                        }
                      />
                    </label>
                  ))}
                  <Button onClick={savePreferences}>
                    Save privacy settings <ArrowRight size={14} />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="profile-settings-card">
                <CardHeader>
                  <CardTitle>Change password</CardTitle>
                  <p>Password changes are simulated in this demo.</p>
                </CardHeader>
                <CardContent>
                  <form
                    className="profile-password-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSaved(true);
                      window.setTimeout(() => setSaved(false), 3000);
                    }}
                  >
                    <label>
                      Current password
                      <Input type="password" required minLength={6} />
                    </label>
                    <label>
                      New password
                      <Input type="password" required minLength={6} />
                    </label>
                    <label>
                      Confirm new password
                      <Input type="password" required minLength={6} />
                    </label>
                    <div className="profile-form-actions">
                      <span>
                        {saved
                          ? "✓ Password updated in this demo"
                          : "Use at least 6 characters."}
                      </span>
                      <Button type="submit">Update password</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <footer className="profile-footer">
            <span>© 2026 Found Cambodia · Community platform demo</span>
            <nav>
              <Link href="/about">Community guidelines</Link>
              <Link href="/about">Privacy policy</Link>
              <Link href="/about">About us</Link>
            </nav>
          </footer>
        </div>
      </section>
    </main>
  );
}
