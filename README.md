# Telepact GitHub Pages Site

Static marketing site for the open-source Telepact project.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

This repository includes a Pages workflow at `.github/workflows/deploy-pages.yml`.

1. Push these files to your GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` (or run the workflow manually).

The workflow uploads this repository as a static artifact and deploys it to GitHub Pages.
