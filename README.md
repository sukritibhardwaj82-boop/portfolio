# Open Sourcery · GitHub Pages and Actions demo

A plain HTML, CSS and JavaScript website. No installs, no build step.
To see it on your laptop, double-click `index.html`.

## Put it online

1. Click **Use this template** → **Create a new repository**. Set it to **Public**.
2. In your new repo: **Settings** → **Pages** → under **Source**, pick **GitHub Actions**.
3. Open the **Actions** tab. Each run is GitHub building and publishing your site.
   - Green tick: your site is live. The link is on the `deploy` box in the run.
   - Red cross: click the run, click the red step, read the red line. It tells you what's wrong.
   - After fixing, use **Re-run all jobs**, or **Run workflow** on the left.
4. Your site lives at `https://<your-username>.github.io/<repo-name>/`

## What's in here

| File | What it is |
|---|---|
| `index.html` | Home page |
| `projects.html` | Projects page |
| `style.css` | How everything looks |
| `script.js` | The black/white switch, the intro animation, the copy button |
| `.github/workflows/deploy.yml` | The GitHub Actions workflow that publishes the site |

Every change that lands on `main` publishes the site again by itself.

## Git on your laptop

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
git switch -c my-branch        # new branch
git add .                      # stage changes
git commit -m "what you did"   # save a snapshot
git push -u origin my-branch   # send the branch to GitHub
```

GitHub doesn't accept your account password for `git push`.
Sign in through VS Code, GitHub Desktop, or `gh auth login` instead.
