# CRM Order Management API — Documentation Automation

> 📌 **Portfolio Note:** Replace `jayshree-chatterjee` with your GitHub username in the links below and in `mkdocs.yml` before uploading.

[![Validate, Build & Deploy](https://github.com/jayshree-chatterjee/order-management-automation/actions/workflows/deploy.yml/badge.svg)](https://github.com/jayshree-chatterjee/order-management-automation/actions/workflows/deploy.yml)
[![OpenAPI 3.0](https://img.shields.io/badge/OpenAPI-3.0.3-green)](docs/openapi/v1/openapi.yaml)
[![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-blue)](https://squidfunk.github.io/mkdocs-material/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A project demonstrating a **Docs-as-Code workflow** for API documentation. Every push to `main` automatically validates the OpenAPI spec, generates Markdown from it, builds a full documentation site, and deploys it live to GitHub Pages.

---

## 📖 View the Generated Documentation

**No setup required!** View the generated API documentation in any of these ways:

| View | Link | Format |
|------|------|--------|
| **Live Documentation Portal** | [jayshree-chatterjee.github.io/order-management-automation](https://jayshree-chatterjee.github.io/order-management-automation/) | Full styled site with dark mode, search |
| **Generated API Reference** (Markdown) | [docs/generated-api.md](docs/generated-api.md) | GitHub-rendered markdown |
| **Documentation Guide** | [docs/README.md](docs/README.md) | Overview of all docs (start here!) |
| **OpenAPI Specification** | [docs/openapi/v1/openapi.yaml](docs/openapi/v1/openapi.yaml) | Raw YAML spec |
| **Interactive Swagger UI** (on live site) | [jayshree-chatterjee.github.io/order-management-automation/swagger-ui](https://jayshree-chatterjee.github.io/order-management-automation/swagger-ui/) | Try-it-out interface |

> **How it works:** The `docs/generated-api.md` file is auto-generated from the OpenAPI spec via the Python script (`scripts/generate_docs.py`). GitHub renders it as Markdown, and the live site serves the same content with full styling.

---

## What This Project Demonstrates

This project showcases the skills and tools used by modern technical writers building developer documentation:

| Skill | Tool / Practice |
|-------|-----------------|
| API documentation | OpenAPI 3.0.3 specification with schemas, examples, `$ref` reuse |
| Docs-as-Code | Markdown, Git-based authoring workflow |
| Documentation automation | Python script generating Markdown from OpenAPI spec |
| OpenAPI validation | Spectral linting with custom ruleset |
| Documentation portal | MkDocs Material — navigation, search, dark mode, code copy |
| CI/CD pipeline | GitHub Actions — validate → generate → build → deploy |
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
order-management-automation/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: validate → generate → build → deploy
│
├── docs/
│   ├── index.md                # Home page — overview and quick links
│   ├── getting-started.md      # Setup guide and first API call
│   ├── authentication.md       # API key auth, rate limits, best practices
│   ├── order-management-api.md # Full endpoint reference (human-authored)
│   ├── error-handling.md       # Error codes, examples, handling patterns
│   ├── changelog.md            # Version history and roadmap
│   ├── swagger.md              # Swagger UI landing page
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

*   Python 3.11+
*   pip

### Step 1 — Clone the repository

```sh
git clone https://github.com/your-username/order-management-automation.git
cd order-management-automation
```

### Step2 — Install dependencies

```sh
pip install mkdocs-material pyyaml
```

### Step 3 — Generate API docs from spec

```sh
python scripts/generate_docs.py
```

This reads `docs/openapi/v1/openapi.yaml` and writes `docs/generated-api.md`.

### Step 4 — Serve docs locally

```sh
mkdocs serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Step 5 — (Optional) Validate the OpenAPI spec

```sh
npm install -g @stoplight/spectral-cli
spectral lint docs/openapi/v1/openapi.yaml --ruleset .spectral.yaml
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

| Job | What it does |
|-----|--------------|
| **Validate** | Runs Spectral to lint the OpenAPI spec against custom rules |
| **Generate** | Runs `generate_docs.py` to produce Markdown from the spec |
| **Build** | Builds the MkDocs site with all assets including Swagger UI |
| **Deploy** | Deploys the built site to GitHub Pages |

Pull requests trigger the Validate and Build jobs (but not Deploy), so every pull request gets spec validation and a build check.

## API Overview

The **CRM Order Management API** is a RESTful API for managing customer orders.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders` | Create a new order |
| `GET` | `/orders` | List all orders (with status filter + pagination) |
| `GET` | `/orders/{orderId}` | Get a specific order by ID |
| `PUT` | `/orders/{orderId}` | Update an existing order |
| `DELETE` | `/orders/{orderId}` | Delete an order |

**Authentication:** API key via `X-API-Key` header
**Rate limit:** 100 requests/minute per key

---

## For Interviewers: What This Demonstrates

This project showcases **production-grade technical writing + DevOps skills**:

### Technical Writing
- **API Design & Documentation**: Industry-standard OpenAPI 3.0.3 spec with complete schemas, examples, and error handling
- **Audience-Focused Content**: Clear Getting Started guide, security best practices, real-world authentication examples
- **Comprehensive Reference**: Full endpoint documentation with examples in multiple languages (curl, Python, JavaScript)
- **Error Documentation**: Structured error handling with codes, examples, and resolution guidance

### Engineering & Automation
- **Documentation Automation**: Python script that dynamically generates Markdown from OpenAPI (DRY principle)
- **CI/CD Pipeline**: GitHub Actions workflow with validation → generation → build → deploy stages
- **Quality Enforcement**: Spectral linting catches OpenAPI spec issues before deployment
- **Source of Truth**: Single OpenAPI spec generates multiple outputs (Markdown, Swagger UI, HTML portal)

### Developer Experience
- **Interactive Reference**: Swagger UI with try-it-out capability integrated into the docs site
- **Multiple Formats**: Markdown for reading, OpenAPI for tooling, Swagger for testing
- **Professional Portal**: MkDocs Material site with dark mode, search, mobile-responsive layout
- **Version Control**: Complete changelogsand semantic versioning

### Bonus: Real-World Complexity
- **Advanced Endpoints**: Search with filters & pagination, bulk operations (not just simple CRUD)
- **Authentication**: API key auth with rate limiting, error scenarios
- **Status Transitions**: State machine patterns (order lifecycle: CREATED → PROCESSING → SHIPPED → DELIVERED)

---

## Local Development

### Prerequisites
- Python 3.11+
- pip (or your preferred Python package manager)
- Node.js 20+ (for Spectral linting — optional)
- Git

### Setup

1. **Clone and enter the project:**
   ```sh
   git clone https://github.com/jayshree-chatterjee/order-management-automation.git
   cd order-management-automation
   ```

2. **Create a virtual environment (recommended):**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Generate Markdown docs from the OpenAPI spec:**
   ```sh
   python scripts/generate_docs.py
   ```
   Output: `docs/generated-api.md` (auto-generated, don't edit manually)

5. **Build and serve the documentation site locally:**
   ```sh
   mkdocs serve
   ```
   Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

### Optional: Validate the OpenAPI Spec

Install Spectral CLI for linting:
```sh
npm install -g @stoplight/spectral-cli
spectral lint docs/openapi/v1/openapi.yaml --ruleset .spectral.yaml
```

### Project Workflows

**Edit the API specification:**
1. Update `docs/openapi/v1/openapi.yaml`
2. Run `python scripts/generate_docs.py` to regenerate Markdown
3. Run `mkdocs serve` to preview changes
4. Git commit and push to main → CI/CD pipeline auto-deploys

**Edit documentation:**
1. Markdown files in `docs/` are editable directly
2. Run `mkdocs serve` to preview
3. Generated files (`docs/generated-api.md`) are overwritten by the script

**Customize the site:**
- Edit `mkdocs.yml` to change theme, navigation, plugins
- Theme configuration in the `theme:` section

---

## Resources

- **[OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)** — Official OpenAPI 3.0.3 spec
- **[MkDocs Material](https://squidfunk.github.io/mkdocs-material/)** — Documentation site theme
- **[Spectral](https://www.stoplight.io/open-source/spectral)** — OpenAPI linting tool
- **[Swagger UI](https://github.com/swagger-api/swagger-ui)** — Interactive API reference

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
