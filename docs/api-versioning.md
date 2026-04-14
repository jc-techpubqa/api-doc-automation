# API Versioning Strategy

This document outlines the versioning strategy for the CRM Order Management API.

## Overview

The API follows **Semantic Versioning (SemVer)** format: `MAJOR.MINOR.PATCH`

*   **MAJOR**: Breaking changes to the API contract
*   **MINOR**: New backwards-compatible features
*   **PATCH**: Bug fixes and non-breaking improvements

**Current Version:** `1.0.0`

## Versioning in the URL

The API version is included in the request URL:

```text
https://api.example.com/v1/orders
                       ^^
                    Version 1
```

This allows multiple API versions to coexist, enabling smooth migrations for API consumers.

## What Constitutes a Breaking Change?

A breaking change requires a new MAJOR version:

*   Removing an endpoint
*   Removing a required field from a response
*   Changing the type of a field (`string` → `integer`)
*   Changing the format of a field value
*   Renaming an endpoint or field
*   Changing HTTP method for an endpoint (e.g., GET → POST)
*   Changing authentication mechanism
*   Narrowing valid value ranges (e.g., max requests/minute: 100 → 50)

## What is Backwards Compatible?

A backwards-compatible change increments MINOR:

*   Adding a new optional field to a response (consumers ignore unknown fields)
*   Adding a new optional query parameter
*   Adding a new endpoint
*   Adding new enum values to a status field
*   Loosening constraints (e.g., max requests/minute: 100 → 150)
*   Improving error messages (same error code, clearer message)

## Deprecation Policy

Before removing functionality, the API will undergo a deprecation period:

1.  **Announce** the deprecation (in changelog, release notes)
1.  **Warn** API clients with `Deprecation` and `Sunset` HTTP headers
1.  **Wait** 6 months minimum before removing the deprecated feature
1.  **Remove** in the next MAJOR version

### Example Deprecation Headers

```http
Deprecation: true
Sunset: Fri, 14 Apr 2027 00:00:00 GMT
```

## Release Process

### Step 1: Plan the Release

Review changes since the last release and determine the version bump:

```text
Current: 1.0.0
New features added? → MINOR (1.1.0)
Only bugfixes? → PATCH (1.0.1)
Breaking changes? → MAJOR (2.0.0)
```

### Step 2: Update Documentation

1.  Update `docs/changelog.md`:

    ```markdown
    ## [1.1.0] – YYYY-MM-DD

    ### Added
    - New `/orders/export` endpoint for bulk order export

    ### Changed
    - Improved error messages for invalid status transitions

    ### Fixed
    - Pagination limit validation off by one error
    ```

1.  Update version in `docs/openapi/v1/openapi.yaml`:

    ```yaml
    info:
        version: 1.1.0
    ```

1.  Update `README.md` API Overview if endpoints changed

### Step 3: Test Locally

```sh
# Generate fresh docs
python scripts/generate_docs.py

# Build the site
mkdocs build

# Run validations
spectral lint docs/openapi/v1/openapi.yaml --ruleset .spectral.yaml
```

### Step 4: Create Release Tag

```sh
git tag -a v1.1.0 -m "Release v1.1.0: Add export endpoint"
git push origin v1.1.0
```

GitHub will automatically create a release from the tag.

### Step 5: CI/CD Deploy

*   GitHub Actions pipeline runs automatically
*   OpenAPI spec is validated
*   Docs are generated and built
*   Site is deployed to GitHub Pages

## Running Multiple Versions

This repository currently maintains a single API version (`v1`). If future MAJOR versions are released:

```text
docs/
├── openapi/
│   ├── v1/
│   │   └── openapi.yaml    (original)
│   ├── v2/
│   │   └── openapi.yaml    (next major version)
│   └── INDEX.md            (version guide)
├── index.md                (links to latest docs)
├── getting-started-v1.md   (guide for v1 users)
└── getting-started-v2.md   (guide for v2 users)
```

Each version would have:

*   Separate OpenAPI spec
*   Version-specific documentation
*   Separate Swagger UI instance
*   Backward compatibility notes

## Communicating Changes

### For Each Release

1. **GitHub Release Notes** – What changed, why, migration instructions
2. **Changelog** – Detailed list of all changes
3. **Blog post** (future) – Major features and improvements
4. **Email notification** (future) – Alert registered API users
