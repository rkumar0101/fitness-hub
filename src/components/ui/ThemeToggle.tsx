"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("samz-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-sm font-extrabold text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      aria-label="Toggle day and dark mode"
      title="Toggle theme"
    >
      <span className="theme-toggle__moon" aria-hidden="true">
        Moon
      </span>
      <span className="theme-toggle__sun" aria-hidden="true">
        Sun
      </span>
    </button>
  );
}
