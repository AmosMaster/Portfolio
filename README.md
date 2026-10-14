# Amos Chauke Portfolio

A simple, GitHub Pages-ready portfolio built with plain HTML, CSS and JavaScript.

## Open locally
Double-click `index.html`. No npm, build tools or server are required.

## Publish on GitHub Pages
1. Create a GitHub repository.
2. Upload all files and folders from this package to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save. GitHub will publish the site.

## Main files
- `index.html` — portfolio content
- `styles.css` — design and responsive styling
- `script.js` — navigation, animations, project modal and contact form
- `assets/img/amos-profile.png` — profile photograph
- `assets/docs/Amos-Chauke-CV.pdf` — downloadable CV

## Edit projects
Project cards are in the `#projects` section in `index.html`.
Project modal copy is stored in the `projects` object inside `script.js`.

## Contact form
The form uses `mailto:` and opens the visitor's default mail application. If you later want a serverless form, you can connect Formspree or a similar service.


## Edit project thumbnails and links

Open `PROJECT-EDIT-GUIDE.md`. Project image paths and live URLs are kept in `project-settings.js` so you do not need to edit the main HTML for routine project updates.
