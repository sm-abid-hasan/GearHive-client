"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const LIGHT = "gearlight";
const DARK = "geardark";
const STORAGE_KEY = "gearhive-theme";


export default function ThemeToggle() {
  const [theme, setTheme] = useState(null); 


  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === DARK ? DARK : LIGHT);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === DARK ? LIGHT : DARK;
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={theme === DARK ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === DARK ? "Light mode" : "Dark mode"}
    >
      {theme === DARK ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
    </button>
  );
}
