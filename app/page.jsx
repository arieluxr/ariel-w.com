import { profile, news, projects, publications } from "../content/site";
import { CV_PAGE, Authors, Emph, Greeting, ProjectRow, Section, Ticker, formatMonth, newTab, withYear, publicFileExists } from "./components";

export default function Home() {
  const hasPhoto = publicFileExists(profile.photo);
  const [lede, ...bio] = profile.bio;
  const linkedin = profile.links.find((l) => l.label === "LinkedIn");
  const heroLinks = [
    profile.cv && { label: "CV", href: CV_PAGE },
    linkedin,
  ].filter(Boolean);

  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <div className={`hero-top${hasPhoto ? " has-photo" : ""}`}>
            <div className="intro">
              <h1 className="hello"><Greeting text={profile.greeting} name={profile.name} /></h1>
              {profile.statement && <p className="intro-lead"><Emph text={profile.statement} /></p>}
              <div className="intro-actions">
                {heroLinks.map((l) => (
                  <a key={l.label} href={l.href} className="btn btn-outline" {...newTab(l.href)}>
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
            {hasPhoto && (
              <figure className="portrait-wrap">
                <img className="portrait" src={profile.photo} alt={`Portrait of ${profile.name}`} />
              </figure>
            )}
          </div>
        </div>
      </section>

      {profile.status && <Ticker text={profile.status} />}

      <Section id="about" title="About">
        <p className="lede">{lede}</p>
        <div className="prose about-body">
          {bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>

      <Section id="projects" title="Selected work" aside={`${projects.length} projects`}>
        <ol className="project-list">
          {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i + 1} />)}
        </ol>
      </Section>

      <Section id="publications" title="Publications">
        <ul className="pub-list">
          {publications.map((p, i) => (
            <li key={i} className="pub">
              <p className="pub-title">{p.title}</p>
              <p className="pub-authors"><Authors text={p.authors} /></p>
              <p className="pub-meta">
                <span className="pub-venue">{withYear(p.venue, p.year)}</span>
                {p.acceptance && <span className="pub-rate">{p.acceptance} acceptance rate</span>}
                {p.links.map((l) => <a key={l.label} href={l.href} className="pub-link" {...newTab(l.href)}>{l.label} ↗</a>)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="news" title="News">
        <ol className="news">
          {news.map((n, i) => (
            <li key={i}>
              <time dateTime={n.date}>{formatMonth(n.date)}</time>
              <p>
                {n.text}
                {n.link && <> <a href={n.link.href} className="news-link" {...newTab(n.link.href)}>{n.link.label} ↗</a></>}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
