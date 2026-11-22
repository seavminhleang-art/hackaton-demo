"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim().toLowerCase();
    let name = String(data.get("name") || "").trim();
    if (isRegister) {
      name ||= "Community member";
      window.localStorage.setItem(
        "found-cambodia-profile",
        JSON.stringify({ name, email, username: name.toLowerCase().replaceAll(" ", "") }),
      );
    } else {
      try {
        const savedProfile = JSON.parse(
          window.localStorage.getItem("found-cambodia-profile") || "null",
        ) as { name?: string; email?: string } | null;
        if (savedProfile?.email?.toLowerCase() === email && savedProfile.name) {
          name = savedProfile.name;
        }
      } catch {
        // Use the email name below when no readable profile is saved.
      }
      if (!name) {
        name = email
          .split("@")[0]
          .split(/[._+-]+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ") || "Community member";
        window.localStorage.setItem(
          "found-cambodia-profile",
          JSON.stringify({ name, email, username: name.toLowerCase().replaceAll(" ", "") }),
        );
      }
    }
    window.localStorage.setItem("found-cambodia-demo-user", name);
    const next = new URLSearchParams(window.location.search).get("next");
    const returnTo = next?.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";
    router.push(returnTo);
  };
  return (
    <main className="auth-page">
      <div className="auth-aside">
        <Link className="welcome-brand" href="/">
          <span className="brand-mark">f</span>
          <span>
            found<span className="brand-dot">.</span>
            <small>CAMBODIA</small>
          </span>
        </Link>
        <div className="auth-aside-message">
          <span>✳</span>
          <h2>
            Good things happen
            <br />
            when we look out
            <br />
            for each other.
          </h2>
          <p>A connected community starts with one small action.</p>
        </div>
        <small className="auth-aside-foot">A COMMUNITY PLATFORM DEMO</small>
      </div>
      <section className="auth-main">
        <Card className="auth-card">
          <div className="eyebrow muted">
            {isRegister ? "JOIN THE COMMUNITY" : "WELCOME BACK"}
          </div>
          <h1>{isRegister ? "Create your account" : "Sign in to Found"}</h1>
          <p>
            {isRegister
              ? "Join neighbors making a difference across Cambodia."
              : "Continue to your community dashboard."}
          </p>
          <form onSubmit={submit}>
            {isRegister && (
              <label>
                Your name
                <Input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Sokha Chan"
                />
              </label>
            )}
            <label>
              Email address
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <Input
                name="password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={6}
                required
                placeholder="At least 6 characters"
              />
            </label>
            {isRegister && (
              <label className="auth-check">
                <input type="checkbox" required />
                <span>
                  I agree to follow the community guidelines and keep personal
                  information private.
                </span>
              </label>
            )}
            <Button className="button primary auth-submit" type="submit">
              {isRegister ? "Create demo account" : "Sign in to dashboard"}{" "}
              <ArrowRight size={15} />
            </Button>
          </form>
          <div className="auth-switch">
            {isRegister ? (
              <>
                Already have an account? <Link href="/login">Sign in</Link>
              </>
            ) : (
              <>
                New to Found? <Link href="/register">Create an account</Link>
              </>
            )}
          </div>
          <div className="auth-demo-note">
            Demo mode: any valid email and password will open the sample
            dashboard. No account data is sent to a server.
          </div>
        </Card>
        <Link className="auth-back" href="/">
          ← Back to welcome page
        </Link>
      </section>
    </main>
  );
}
