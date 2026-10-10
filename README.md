# Dr. Arpi Melikyan — Portfolio

A static, dependency-free portfolio site. No build step: open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Editing content

All text lives in **`content.js`**. Edit the values there and refresh. Layout and animations adapt automatically:

- Remove an item from a list to remove it from the page; set a list to `[]` to hide its section.
- Leave a `url` empty (`""`) to hide that link or button.
- `person.cvFile` shows a "Download CV" button when set (e.g. `assets/Arpi-Melikyan-CV.pdf`).
- `person.portrait` points at the hero photo (`assets/img/portrait.jpg`).
- An appearance with a `video` block (a Vimeo `url`, a fallback `thumb` and a `duration`) gets a click to play thumbnail that expands into an embedded player.
- The site avoids hyphens and dashes in visible text; keep new content consistent.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `content.js` | All site content |
| `styles.css` | Design tokens, layout, animations |
| `main.js` | Renders content, scroll and hover animations, video player |

Animations respect the visitor's "reduce motion" setting.

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
