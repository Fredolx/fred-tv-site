# fred-tv-site

Landing page for Fred TV, served at <https://tv.fredol.dev>. Built with [Zola](https://www.getzola.org/) 0.23+ (Tera 2).

```bash
zola serve   # http://127.0.0.1:1111
zola build   # outputs to public/
```

## Where things live

| What | Where |
|---|---|
| Store links, donation links | `zola.toml` → `[extra]` |
| FAQ entries (Markdown answers) | `content/_index.md` front matter |
| Page layout | `templates/index.html` |
| Reusable bits (icons, badges, device frames) | `templates/components.html` |
| Styles | `sass/main.scss` |

## Screenshots

Screenshots live in `static/screenshots/` (`desktop/`, `mobile/`, `tv/`). Zola resizes them to WebP at build time, so full-resolution originals are fine. Use 8-bit PNG or JPG: Zola can't convert 16-bit PNGs.

All three lists are in `zola.toml` under `[extra]`:

- `carousel`: the hero carousel, in display order. Each entry has `file`, `platform` (`desktop`, `mobile` or `tv`) and `alt`.
- `desktop_screens`: the desktop gallery in the "Fred TV for desktop" section.
- `mobile_screens` and `tv_screen`: the phone frames and the Android TV frame in the mobile section. A missing file stops the build with an error.

## JavaScript

JavaScript is only used for the hero carousel and the desktop screenshot switcher.

## Deploying

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`.

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. DNS: add a `CNAME` record `tv` → `fredolx.github.io`.
3. `static/CNAME` already contains `tv.fredol.dev`. Enable **Enforce HTTPS** once the certificate is issued.
