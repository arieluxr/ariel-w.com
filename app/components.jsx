import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { myNames } from "../content/site";

// True if a file exists in /public (checked at build time).
export function publicFileExists(src) {
  if (!src || src.startsWith("http")) return Boolean(src);
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatMonth(ym) {
  const [y, m] = ym.split("-");
  return m ? `${monthNames[Number(m) - 1]} ${y}` : y;
}

export const pad = (n) => String(n).padStart(2, "0");

// "CHI 2026" stays as is; a venue without its year gets one appended ("…Healthcare, 2026").
export const withYear = (venue, year) =>
  /^\d{4}$/.test(String(year)) && !String(venue).includes(String(year)) ? `${venue}, ${year}` : venue;

// Props that open a link in a new tab: anything off-site, PDFs, and the CV page.
// Same-page anchors, project pages and mailto links stay in the current tab.
export const CV_PAGE = "/cv/";
export const newTab = (href = "") =>
  /^https?:\/\//.test(href) || href.toLowerCase().endsWith(".pdf") || href === CV_PAGE
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

// Strip *emphasis* markers for plain-text uses (meta tags).
export const plain = (text) => text.replace(/\*/g, "");

// Render *emphasis* markers as the italic serif accent.
export function Emph({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
  );
}

// Scrolling marquee (跑馬燈). Screen readers get the text once; the moving copies are hidden.
// Two identical groups slide left by 50% so the loop is seamless.
export function Ticker({ text }) {
  const group = (key) => (
    <span className="ticker-group" key={key}>
      {Array.from({ length: 4 }, (_, i) => (
        <span className="ticker-item" key={i}>
          {text}
          <span className="ticker-sep">✱</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="ticker">
      <p className="sr-only">{text}</p>
      <div className="ticker-track" aria-hidden="true">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}

// The greeting with your name in bold: "Hi, I am **Ariel Wang**."
export function Greeting({ text, name }) {
  const i = text.indexOf(name);
  if (i === -1) return text;
  return <>{text.slice(0, i)}<strong>{name}{text.slice(i + name.length)}</strong></>;
}

// Section shell: mono label on the left, content on the right.
export function Section({ id, title, aside, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap section-grid">
        <header className="section-head">
          <p className="label">{title}</p>
          {aside && <p className="section-aside">{aside}</p>}
        </header>
        <div className="section-body">
          <h2 id={`${id}-title`} className="sr-only">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

// Bold the author's own name in an author list.
export function Authors({ text }) {
  const parts = text.split(", ");
  return (
    <span className="authors">
      {parts.map((name, i) => {
        const isMe = myNames.includes(name.replace("*", ""));
        return (
          <span key={i}>
            {isMe ? <strong>{name}</strong> : name}
            {i < parts.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </span>
  );
}

// A project's image: `image` in content/site.js if set, otherwise a file named after
// the project's slug in public/images/projects/ (e.g. teen-design-fiction.jpg).
const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif"];
export function projectImage(project) {
  if (project.image && publicFileExists(project.image)) return project.image;
  for (const ext of IMAGE_EXTS) {
    const src = `/images/projects/${project.slug}.${ext}`;
    if (publicFileExists(src)) return src;
  }
  return null;
}

// How an image sits in its frame: imageFocus picks the crop; imageFit: "contain" shows the
// whole image (no crop) on imageBg, for wide or multi-panel artwork.
export function imageStyle(project) {
  const style = {};
  if (project.imageFocus) style.objectPosition = project.imageFocus;
  if (project.imageFit) style.objectFit = project.imageFit;
  if (project.imageBg) style.backgroundColor = project.imageBg;
  return Object.keys(style).length ? style : undefined;
}

// One row of the project index on the home page: number, thumbnail, text, arrow.
export function ProjectRow({ project, index }) {
  const image = projectImage(project);
  return (
    <li>
      <Link href={`/projects/${project.slug}/`} className="project-row">
        <span className="project-num">{pad(index)}</span>
        <span className={`project-thumb${image ? "" : " project-thumb-empty"}`} aria-hidden="true">
          {image ? <img src={image} alt="" loading="lazy" style={imageStyle(project)} /> : <em>{project.mark}</em>}
        </span>
        <span className="project-main">
          <span className="project-title">{project.title}</span>
          <span className="project-summary">{project.summary}</span>
          <span className="project-venue">{withYear(project.venue, project.year)}</span>
        </span>
        <span className="project-arrow" aria-hidden="true">→</span>
      </Link>
    </li>
  );
}

// Big cover for a project page: image if provided, otherwise a typographic panel.
export function ProjectCover({ project, index }) {
  const image = projectImage(project);
  if (image) {
    return <div className="cover"><img src={image} alt="" style={imageStyle(project)} /></div>;
  }
  return (
    <div className="cover cover-type" aria-hidden="true">
      <span className="cover-num">{pad(index)}</span>
      <span className="cover-word"><em>{project.mark}</em></span>
    </div>
  );
}
