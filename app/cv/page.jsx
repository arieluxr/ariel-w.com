import { profile } from "../../content/site";

export const metadata = { title: "CV" };

// Shows the CV PDF inside a web page, so visitors read it in the browser
// instead of getting a download. The PDF itself lives at public/cv.pdf.
export default function CVPage() {
  return (
    <section className="cv-page">
      <div className="wrap cv-head">
        <div>
          <p className="label">Curriculum vitae</p>
          <h1 className="cv-title">{profile.fullName}</h1>
        </div>
        <div className="cv-actions">
          <a href={profile.cv} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            Open full screen <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.cv} className="btn btn-dark" download="CV_ArielWang.pdf">
            Download PDF <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="wrap">
        <iframe className="cv-frame" src={`${profile.cv}#view=FitH`} title={`CV of ${profile.fullName}`} />
      </div>
    </section>
  );
}
