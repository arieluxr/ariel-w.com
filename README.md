# ariel-w.com

Personal website of Chun-Han Ariel Wang, built with Next.js and exported as a static site for GitHub Pages.

## Edit content

Almost everything lives in **`content/site.js`**: bio, status line, news, projects, publications, and links. Search it for `TODO` to find what still needs filling in.

- Profile photo: `public/images/profile.jpg` (square). Until it exists, the site shows a placeholder.
- CV: `public/cv.pdf`
- Project images (optional): add a file to `public/images/` and set `image: "/images/file.jpg"` on the project. Without one, the card shows the project's `mark` word.
- New project page: add an object to `projects` with a unique `slug`. The page at `/projects/<slug>/` is generated automatically.

Design tokens (colors, type scale, grid) are at the top of `app/globals.css`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `ariel-w.com`) and push this folder to `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**. Every push to `main` now builds and deploys (`.github/workflows/deploy.yml`).
3. Custom domain: `public/CNAME` already contains `ariel-w.com`. At the domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`
4. Back in **Settings → Pages**, enter `ariel-w.com` as the custom domain and tick **Enforce HTTPS** once it's available.
