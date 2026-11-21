"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { id: "top", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/#about" },
  { id: "projects", label: "Work", href: "/#projects" },
  { id: "publications", label: "Publications", href: "/#publications" },
  { id: "news", label: "News", href: "/#news" },
];

// Which section is on screen. On a project page "Work" is current; other pages (CV) have none.
function useActiveSection() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const offPage = pathname.startsWith("/projects") ? "projects" : null;
  const [active, setActive] = useState(onHome ? "top" : offPage);

  useEffect(() => {
    if (!onHome) { setActive(offPage); return; }
    let frame;
    const update = () => {
      frame = null;
      const sections = ITEMS.filter((i) => i.id !== "top")
        .map((i) => document.getElementById(i.id))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);
      const line = 140; // just below the header
      let current = "top";
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      // At the very bottom, the last section wins even if it's too short to reach the line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onHome, offPage]);

  return { active, onHome };
}

// True once the page has scrolled past the top, so the side pills can step away.
function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);
  return scrolled;
}

function NavLinks({ active, onHome, onNavigate }) {
  return ITEMS.map((item) => (
    <Link
      key={item.id}
      data-id={item.id}
      href={item.href}
      className={active === item.id ? "is-active" : undefined}
      aria-current={active === item.id ? "true" : undefined}
      onClick={(e) => {
        if (item.id === "top" && onHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
        onNavigate?.();
      }}
    >
      {item.label}
    </Link>
  ));
}

// Desktop: pill nav with a black pill that slides to the current section.
function PillNav({ active, onHome }) {
  const navRef = useRef(null);
  const lensRef = useRef(null);

  useLayoutEffect(() => {
    const place = () => {
      const nav = navRef.current, lens = lensRef.current;
      if (!nav || !lens) return;
      const link = nav.querySelector(`[data-id="${active}"]`);
      if (!link || !link.offsetWidth) { lens.classList.remove("is-ready"); return; }
      lens.style.width = `${link.offsetWidth}px`;
      lens.style.transform = `translateX(${link.offsetLeft}px)`;
      // First placement: appear in place, without sliding in from the left.
      if (!lens.classList.contains("is-ready")) requestAnimationFrame(() => lens.classList.add("is-ready"));
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <nav className="pill-nav glass" aria-label="Main" ref={navRef}>
      <span className="nav-lens" ref={lensRef} aria-hidden="true" />
      <NavLinks active={active} onHome={onHome} />
    </nav>
  );
}

// Narrow screens: a "Menu" button that opens a glass dropdown.
function MenuNav({ active, onHome, email, cvHref }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div className="menu-nav" ref={wrapRef}>
      <button
        type="button"
        className="menu-button glass"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Menu"}
        <span className={`menu-icon${open ? " is-open" : ""}`} aria-hidden="true"><i /><i /></span>
      </button>
      <div id="site-menu" className={`menu-panel glass${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Main" className="menu-links">
          <NavLinks active={active} onHome={onHome} onNavigate={() => setOpen(false)} />
        </nav>
        <div className="menu-actions">
          <a href={`mailto:${email}`} className="btn header-cta-menu">Email me <span aria-hidden="true">↗</span></a>
          <a href={cvHref} className="btn btn-outline" target="_blank" rel="noopener noreferrer">CV <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}

export default function Header({ name, location, photo, email, cvHref }) {
  const { active, onHome } = useActiveSection();
  const scrolled = useScrolled();

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-inner">
        <Link href="/" className="brand-pill glass" aria-label={`${name}, home`}>
          {photo && <img className="brand-avatar" src={photo} alt="" />}
          <span className="brand-text">
            <span className="brand-name">{name}</span>
            {location && <span className="brand-meta">{location}</span>}
          </span>
        </Link>
        <PillNav active={active} onHome={onHome} />
        <a href={`mailto:${email}`} className="btn header-cta">
          Email me <span aria-hidden="true">↗</span>
        </a>
        <MenuNav active={active} onHome={onHome} email={email} cvHref={cvHref} />
      </div>
    </header>
  );
}
