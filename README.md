# Customizable Portfolio Starter

This is a no-build portfolio site inspired by immersive creative portfolios like [patrickheng.com](https://patrickheng.com/), but structured so you can customize it easily.

## What to edit

Open `/Users/Air/Documents/New project/config.js`.

That one file controls:

- Site name
- Navigation
- Hero text and buttons
- Colors
- About copy
- Projects
- Services
- Contact links

## Files

- `index.html` contains the layout skeleton.
- `styles.css` controls the visual design and responsive behavior.
- `script.js` renders the page from the config.
- `config.js` is the main customization file.

## How to preview

Open `/Users/Air/Documents/New project/index.html` in a browser.

If you want a local server later, we can also turn this into a React, Next.js, or GSAP-based version.

## Publish to GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

To publish:

1. Create a new GitHub repository.
2. Push this folder to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push changes to `main` and GitHub will deploy the site automatically.
