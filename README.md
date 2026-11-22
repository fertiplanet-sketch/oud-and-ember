# Oud & Ember — model website (DMD 1203 AI in Digital Media)

A 7-page static website for a fictional Emirati perfume house. Plain HTML, one CSS file and one JS file. No frameworks and no build step.

## Files
| File | What it is |
|---|---|
| `index.html` | Home: hero, collection, 30-second film |
| `about.html` | About Us |
| `scent-finder.html` | Feature 1: three-question perfume quiz |
| `ingredients.html` | Feature 2: signature ingredients and note families |
| `gift-builder.html` | Feature 3: gift options with live price |
| `journal.html` | Feature 4: articles, including AI disclosure |
| `contact.html` | Contact Us: details, social links, validated form |
| `style.css` | All styling (colours and fonts at the top) |
| `script.js` | Search, quiz, gift builder and form checks |
| `images/` | Logo and AI images (same file names = no code changes) |
| `video/film.mp4`, `video/film.vtt` | 30-second AI film and its captions |

## Replacing the placeholders
Save each Google Flow image under the **same file name** in `images/` (JPG; PNG for `logo.png`).
Join the two 15-second clips into `video/film.mp4`. If the narration changes, edit `video/film.vtt` to match.

## Publishing on GitHub Pages
1. Upload everything in this folder to the root of a public repository.
2. Go to **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then save.
3. The site appears at `https://<username>.github.io/<repo>/` within a minute or two.

## Notes
- The contact form checks input in the browser but sends nothing, because GitHub Pages has no server.
- The search covers every page and perfume. Its index sits at the top of `script.js`.
