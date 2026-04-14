# CRM Order Management API

Welcome to the **CRM Order Management API** documentation portal. This documentation portal demonstrates a **Docs-as-Code** workflow used by technical writers to build scalable, developer-friendly API documentation systems. Every documentation update is automatically validated, built, and deployed via GitHub Actions CI/CD.

The CRM Order Management API enables developers to manage the full lifecycle of customer orders from creation to delivery within a CRM system.

## Overview

The Order Management API is a RESTful API that follows OpenAPI 3.0 standards. It provides endpoints for creating, retrieving, updating, and deleting customer orders.

| Property | Value |
| --- | --- |
| **Version** | 1.0.0 |
| **Protocol** | HTTPS |
| **Format** | JSON |
| **Auth** | API Key (`X-API-Key` header) |
| **Base URL** | `https://api.example.com/v1` |

## Purpose

*   **Create orders** — Submit a new customer order with product and quantity details.
*   **List orders** — Retrieve a paginated list of all orders, with optional status filtering.
*   **Get an order** — Retrieve full details of a specific order by its ID.
*   **Update an order** — Modify order fields such as status, quantity, or price.
*   **Delete an order** — Permanently remove an order from the system.

## Order Lifecycle

Orders follow a structured status progression:

```text
CREATED → PROCESSING → SHIPPED → DELIVERED
                    ↘ CANCELLED
```

The following table describes each status.

| Status | Description |
| ------ | ----------- |
| `CREATED` | Order has been placed and is awaiting processing |
| `PROCESSING` | Order is being prepared for shipment |
| `SHIPPED` | Order has been dispatched to the customer |
| `DELIVERED` | Order has been received by the customer |
| `CANCELLED` | Order has been cancelled |

## Quick Links

| Resource | Link |
|----------|------|
| Interactive API Reference | [Swagger UI](swagger-ui/index.html) |
| Getting Started | [Getting Started](getting-started.md) |
| Authentication Guide | [Authentication](authentication.md) |
| Full API Reference | [CRM Order Management API](generated-api-doc.md) |
| Error Handling | [Error Handling](error-handling.md) |
