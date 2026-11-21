import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../content/site";
import { ProjectCover, newTab, pad } from "../../components";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    ["Year", project.year],
    ["Published at", project.acceptance
      ? <>{project.venue}<span className="fact-note">{project.acceptance} acceptance rate</span></>
      : project.venue],
    ["With", project.collaborators],
    ["Methods", project.methods],
  ].filter(([, v]) => v);

  return (
    <article className="project-page">
      <header className="wrap project-head">
        <p className="label project-crumb">
          <Link href="/#projects">← Selected work</Link>
          <span>{pad(index + 1)} / {pad(projects.length)}</span>
        </p>
        <h1 className="project-h1">{project.title}</h1>
        <dl className="facts-strip">
          {facts.map(([k, v]) => (
            <div className="fact" key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </header>

      <div className="wrap">
        <ProjectCover project={project} index={index + 1} />
      </div>

      <div className="wrap project-body">
        <div className="project-text">
          <p className="lede">{project.summary}</p>
          <div className="prose">
            {project.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
        {project.links.length > 0 && (
          <aside className="project-links">
            <p className="label">Read more</p>
            <ul>
              {project.links.map((l) => (
                <li key={l.label}><a href={l.href} {...newTab(l.href)}>{l.label}<span aria-hidden="true">↗</span></a></li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      <nav className="next-project" aria-label="Next project">
        <Link href={`/projects/${next.slug}/`} className="wrap next-link">
          <span className="label">Next project</span>
          <span className="next-title">{next.title}<span className="next-arrow" aria-hidden="true">→</span></span>
        </Link>
      </nav>
    </article>
  );
}
