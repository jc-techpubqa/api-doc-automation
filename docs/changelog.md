# Change Log

All notable changes to the CRM Order Management API and its documentation are listed here.

Check [](http://keepachangelog.com/) for recommendations on how to format and structure this file.

This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-04-14

### Added

This is the **Initial release** of the CRM Order Management API.

*   Full CRUD support for orders:

    *   `POST /orders` — Create a new order
    *   `GET /orders` — List all orders with pagination and status filtering
    *   `GET /orders/{orderId}` — Retrieve a single order by ID
    *   `PUT /orders/{orderId}` — Update order fields
    *   `DELETE /orders/{orderId}` — Delete an order

*   Search orders `POST /orders/search` — Search orders by criteria.

*   Bulk update `PATCH /orders/bulk-update` — Update status for multiple orders.

*   OpenAPI 3.0.3 specification with full schema definitions, examples, and `$ref` reuse.

*   API key authentication via `X-API-Key` header with rate limiting (100 requests/min).

*   Interactive Swagger UI documentation portal.

*   MkDocs Material documentation site with full navigation.

*   GitHub Actions CI/CD pipeline: OpenAPI validation → doc generation → MkDocs build → GitHub Pages deployment.

*   Spectral OpenAPI linting ruleset (`.spectral.yaml`).

*   Python automation script (`generate_docs.py`) for generating Markdown from the OpenAPI spec.
