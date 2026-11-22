"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";

export default function NavbarTools() {
  const [dark, setDark] = useState(false);
  const [language, setLanguage] = useState<"EN" | "KH">("EN");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("found-cambodia-theme");
    const savedLanguage = window.localStorage.getItem("found-cambodia-language");
    const useDarkTheme = savedTheme === "dark";
    setDark(useDarkTheme);
    setLanguage(savedLanguage === "KH" ? "KH" : "EN");
    document.documentElement.dataset.theme = useDarkTheme ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("found-cambodia-theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  };

  const chooseLanguage = (next: "EN" | "KH", menu: HTMLDetailsElement) => {
    setLanguage(next);
    window.localStorage.setItem("found-cambodia-language", next);
    menu.open = false;
  };

  return (
    <div className="navbar-tools" aria-label="Display and language settings">
      <button
        className="navbar-tool-button theme-toggle-button"
        type="button"
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={dark}
        title={dark ? "Light theme" : "Dark theme"}
        onClick={toggleTheme}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <details className="navbar-language-menu">
        <summary aria-label={`Language: ${language}`}>
          <span aria-hidden="true">{language === "EN" ? "🇬🇧" : "🇰🇭"}</span>
          {language}
          <ChevronDown size={13} aria-hidden="true" />
        </summary>
        <div className="navbar-language-dropdown">
          <button type="button" onClick={(event) => chooseLanguage("EN", event.currentTarget.closest("details")!)}>
            🇬🇧 English
          </button>
          <button type="button" onClick={(event) => chooseLanguage("KH", event.currentTarget.closest("details")!)}>
            🇰🇭 Khmer
          </button>
        </div>
      </details>
    </div>
  );
}
