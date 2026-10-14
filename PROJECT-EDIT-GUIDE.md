# Change Project Thumbnails & Links

You only need to edit **`project-settings.js`**.

## 1. Change a thumbnail

1. Put your screenshot/photo inside `assets/img/projects/`.
2. Example file: `learnhub-new.jpg`.
3. Open `project-settings.js`.
4. Change:

```js
thumbnail: "assets/img/projects/learnhub.svg"
```

to:

```js
thumbnail: "assets/img/projects/learnhub-new.jpg"
```

PNG, JPG, WEBP and SVG files are supported. For the best result use a **landscape image around 1200 × 700 px**.

## 2. Add or change a project link

In `project-settings.js`, change the `url` value:

```js
url: "https://your-project-link.com/"
```

If a project is private, leave it blank:

```js
url: ""
```

When a URL is blank, the **Visit project** button is automatically hidden.

## Already added

- LearnHUB → https://learnhub.regent.ac.za/
- NOVA → https://nova.regent.ac.za/
- Leadworks → https://leadworks.org.za/

The other three project URLs are intentionally blank until you add the correct public links.

## GitHub Pages

After changing images or links, commit and push the files. GitHub Pages will update automatically when your repository is published from the branch/root folder.
