import "@fontsource-variable/manrope";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { profile } from "../content/site";
import { CV_PAGE, newTab, plain } from "./components";
import CursorBall from "./CursorBall";
import Header from "./Header";
import { publicFileExists } from "./components";

const description = plain(profile.statement);

export const metadata = {
  metadataBase: new URL("https://ariel-w.com"),
  title: { default: `${profile.name} — ${profile.fullName}`, template: `%s — ${profile.name}` },
  description,
  openGraph: { title: profile.name, description, url: "https://ariel-w.com" },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear();
  const hasPhoto = publicFileExists(profile.photo);
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>

        <Header
          name={profile.name}
          location={profile.location}
          photo={hasPhoto ? profile.photo : null}
          email={profile.email}
          cvHref={CV_PAGE}
        />

        <main id="main">{children}</main>

        <footer className="site-footer" id="contact">
          <div className="wrap">
            <p className="label">Contact</p>
            <p className="footer-cta">
              Say hello — <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <div className="footer-row">
              <ul className="footer-links">
                {profile.links.map((l) => (
                  <li key={l.label}><a href={l.href} {...newTab(l.href)}>{l.label} ↗</a></li>
                ))}
                <li><a href={CV_PAGE} {...newTab(CV_PAGE)}>CV ↗</a></li>
              </ul>
              <p className="footer-meta">© {year} {profile.fullName}</p>
            </div>
          </div>
        </footer>
        <CursorBall />
      </body>
    </html>
  );
}
