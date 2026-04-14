# CRM Order Management API – Documentation Automation

This project demonstrates a **Docs-as-Code workflow** for API documentation. Every push to `master` automatically validates the OpenAPI spec, generates Markdown from it, builds a full documentation site, and deploys it live to GitHub Pages.

## Documentation

**No setup required!** View the generated API documentation in any of these ways:

| View | Link | Format |
|------|------|--------|
| **Live Documentation Portal** | [API Documentation](https://jc-techpubqa.github.io/api-doc-automation/) | Full styled site with dark mode, search |
| **Interactive Swagger UI** (on live site) | [Swagger UI](https://jc-techpubqa.github.io/api-doc-automation/swagger-ui/) | Try-it-out interface |

> **How it works:** The `docs/generated-api-doc.md` file is auto-generated from the OpenAPI spec via Python script (`scripts/generate_docs.py`). GitHub renders it as Markdown, and the live site serves the same content with full styling.

## Project Objective

This project showcases the skills and tools used by modern technical writers building developer documentation:

| Skill | Tool / Practice |
|-------|-----------------|
| API documentation | OpenAPI 3.0.3 specification with schemas, examples, `$ref` reuse |
| Docs-as-Code | Markdown, Git-based authoring workflow |
| Documentation automation | Python script generating Markdown from OpenAPI spec |
| OpenAPI validation | Spectral linting with custom ruleset |
| Documentation portal | MkDocs Material – navigation, search, dark mode, code copy |
| CI/CD pipeline | GitHub Actions – validate → generate → build → deploy |
| Hosting | GitHub Pages (live, auto-deployed on push) |
| Interactive reference | Swagger UI with authentication support |

## Architecture

```text
OpenAPI Spec (YAML)
      │
      ├── Spectral Lint (CI validates spec quality)
      │
      ├── generate_docs.py (auto-generates Markdown)
      │
      ├── Swagger UI (interactive browser-based reference)
      │
      └── MkDocs Material (full documentation portal)
                │
         GitHub Actions CI/CD
                │
         GitHub Pages (live site)
```

## Project Structure

```text
api-doc-automation/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: validate → generate → build → deploy
│
├── docs/
│   ├── index.md                      # Home page – overview and quick links
│   ├── getting-started.md            # Setup guide
│   ├── authentication.md             # API key auth, rate limits, best practices
│   ├── generated-api-doc.md          # Full endpoint reference (auto-generated)
│   ├── error-handling.md             # Error codes, examples, handling patterns
│   ├── api-versioning.md             # API versioning strategy
│   ├── changelog.md                  # Version history and roadmap
│   ├── swagger.md                    # Swagger UI landing page
│   │
│   ├── openapi/
│   │   └── v1/
│   │       └── openapi.yaml    # OpenAPI 3.0.3 specification (source of truth)
│   │
│   └── swagger-ui/
│       ├── index.html          # Swagger UI HTML shell
│       └── swagger-config.js   # Swagger UI configuration
│
├── scripts/
│   └── generate_docs.py        # Automation: OpenAPI → Markdown generator
│
├── .spectral.yaml              # OpenAPI linting ruleset (Spectral)
├── mkdocs.yml                  # MkDocs site configuration
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Ensure that you have the following installed on your local machine:

*   Python 3.11+
*   pip

### Clone the repository

```sh
git clone https://github.com/<username>/api-doc-automation.git
cd api-doc-automation
```

### Install dependencies

```sh
pip install mkdocs-material pyyaml
```

### Generate API docs from spec

```sh
python scripts/generate_docs.py
```

This reads `docs/openapi/v1/openapi.yaml` and writes `docs/generated-api-doc.md`.

### Serve docs locally

```sh
mkdocs serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

### (Optional) Validate the OpenAPI spec

```sh
npm install -g @stoplight/spectral-cli
spectral lint docs/openapi/v1/openapi.yaml --ruleset .spectral.yaml
```

## Setup GitHub Pages

**To get your live portal working, follow these steps:**

### Push Code to GitHub

To push your local code to GitHub:

1. Add all files to Git:

   ```sh
   git add .
   ```

2. Commit your changes:

   ```sh
   git commit -m "Initial portfolio commit"
   ```

3. Push to GitHub (master branch):

   ```sh
   git push -u origin master
   ```

4. Wait 30 seconds for files to sync on GitHub.

### Verify Workflow File

To verify the GitHub Actions workflow file is present:

1. Go to your repository on GitHub.
2. Navigate to `.github/workflows/deploy.yml` to verify the file is there.
3. If not, the push didn't work – try pushing again.

### Run the Workflow

To trigger the CI/CD workflow that builds and deploys the docs:

1. Go to **Actions** tab in your repository.
2. In the left sidebar, you should see **Validate, Build & Deploy API Docs**.
3. Click **Validate, Build & Deploy API Docs**.
4. You should see past runs (if any).
5. Click **Run workflow** (top right).
6. Select **`master`** branch.
7. Click **Run workflow**.
8. Wait 3-5 minutes for all jobs to complete.

### Configure GitHub Pages

To configure GitHub Pages to serve your documentation:

1. Once workflow succeeds, go to **Settings → Pages**.
2. Check **Build and deployment** section appears.
3. Under **Source:**

   - Select **Deploy from a branch**.
   - **Branch:** Select `gh-pages` (folder: `/ (root)`).
   - Click **Save**.

4. Wait 1-2 minutes for Pages to activate.

### Visit Your Live Site

Once everything is set up, your site will be live at:

*   **API Documentation** `https://<GitHub domain>/api-doc-automation/`
*   **Swagger UI:** `https://<GitHub domain>/api-doc-automation/swagger-ui/`

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `master`:

| Job | What it does |
|-----|--------------|
| Validate | Runs Spectral to lint the OpenAPI spec against custom rules |
| Generate | Runs `generate_docs.py` to produce Markdown from the spec |
| Build | Builds the MkDocs site with all assets including Swagger UI |
| Deploy | Deploys the built site to GitHub Pages |

## API Overview

The **CRM Order Management API** is a RESTful API for managing customer orders.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders` | Create a new order |
| `GET` | `/orders` | List all orders (with status filter + pagination) |
| `GET` | `/orders/{orderId}` | Get a specific order by ID |
| `PUT` | `/orders/{orderId}` | Update an existing order |
| `DELETE` | `/orders/{orderId}` | Delete an order |
| `POST` | `/orders/search` | Search orders with advanced filters |
| `PATCH` | `/orders/bulk-update` | Update status for multiple orders |

### Project Workflows

**Edit the API specification:**

1. Update the `docs/openapi/v1/openapi.yaml` file.
2. Run the `python scripts/generate_docs.py` script to regenerate Markdown.
3. Run `mkdocs serve` to preview changes.
4. Git commit and push to master → CI/CD pipeline auto-deploys.

**Edit documentation:**

1. Markdown files in `docs/` are editable directly.
2. Run `mkdocs serve` to preview.
3. Generated files (`docs/generated-api-doc.md`) are overwritten by the script.

**Customize the site:**

- Edit `mkdocs.yml` to change theme, navigation, plugins.
- Theme configuration in the `theme:` section.

## Troubleshooting

The following sections cover common issues you may encounter when setting up or using the API documentation.

### Issue: Don't see "Validate, Build & Deploy API Docs" in Actions?

**Issue:** Unable to trigger workflow, or workflow does not appear in **Actions** tab. You might not have pushed `.github/workflows/deploy.yml` to GitHub yet.

**Resolution:** Try: `git push -u origin master` again. Wait 30 seconds and refresh the **Actions** tab.

### Issue: Workflow failed

**Issue:** One of the workflow jobs (Validate, Generate, Build, Deploy) failed with an error.

**Resolution:** Check the job logs in **Actions** tab for errors
