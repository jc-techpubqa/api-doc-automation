# Getting Started

This guide walks you through setting up and making your first API call to the CRM Order Management API.

## Prerequisites

Before you begin, ensure that you have the following:

*   An API key (see [Authentication](authentication.md))

*   [curl](https://curl.se/) or [Postman](https://www.postman.com/) installed

*   Basic knowledge of REST APIs and JSON

## Base URL

All API requests use the following base URL:

```text
https://api.example.com/v1
```

For local development:

```text
http://localhost:8000/v1
```

Following are the steps to get started with the API:

*   Obtain an API key
*   Make your first API call
*   Create a new order
*   Explore the Interactive Reference
*   Try advanced examples

## Obtain an API Key

All endpoints require authentication via an API key. Contact the support team to request a key.

Once issued, include your key in every request header:

```text
X-API-Key: your-api-key-here
```

For more details, see [Authentication](authentication.md).

## Make Your First API Call

### List all orders

Use the `GET /orders` endpoint to retrieve a list of orders:

```sh
curl -X GET "https://api.example.com/v1/orders" \
  -H "X-API-Key: your-api-key-here" \
  -H "Accept: application/json"
```

**Expected response:**

```json
{
  "orders": [
    {
      "orderId": "ORD115",
      "customerId": "CUST121",
      "productName": "Acoustic Guitar",
      "quantity": 1,
      "price": 7099.0,
      "status": "SHIPPED",
      "createdAt": "2026-04-07T09:15:00Z",
      "updatedAt": "2026-04-08T12:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 20
}
```

## Create a New Order

Use the `POST /orders` endpoint to create a new order:

```sh
curl -X POST "https://api.example.com/v1/orders" \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST122",
    "productName": "Laptop",
    "quantity": 1,
    "price": 75000
  }'
```

**Expected response (HTTP 201):**

```json
{
  "orderId": "ORD116",
  "customerId": "CUST122",
  "productName": "Laptop",
  "quantity": 1,
  "price": 75000,
  "status": "CREATED",
  "createdAt": "2026-04-08T10:30:00Z",
  "updatedAt": "2026-04-08T10:30:00Z"
}
```

## Explore the Interactive Reference

Use the [Swagger UI](swagger-ui/index.html) to browse all endpoints interactively, try out requests, and inspect request and response schemas directly in your browser – no additional tooling required.

## Advanced Examples

Use the API to perform complex operations like filtering orders, bulk updates, and handling errors. See the [CRM Order Management API](generated-api-doc.md) for detailed examples and best practices.

### Filter Orders by Status

List only shipped orders with pagination:

```sh
curl -X GET "https://api.example.com/v1/orders?status=SHIPPED&page=1&pageSize=50" \
  -H "X-API-Key: your-api-key-here"
```

**Query parameters:**

*   `status` – Filter by order status (CREATED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
*   `page` – Page number (default: 1)
*   `pageSize` – Results per page (default: 20, maximum: 100)

### Search Orders with Advanced Filters

Find orders for a specific customer within a date range:

```sh
curl -X POST "https://api.example.com/v1/orders/search" \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "filters": {
      "customerId": "CUST121",
      "status": "SHIPPED",
      "dateRange": {
        "from": "2026-04-01T00:00:00Z",
        "to": "2026-04-14T23:59:59Z"
      }
    },
    "pagination": {
      "page": 1,
      "pageSize": 25
    }
  }'
```

**Response:**

```json
{
  "data": [
    {
      "orderId": "ORD115",
      "customerId": "CUST121",
      "productName": "Acoustic Guitar",
      "quantity": 1,
      "price": 7099.0,
      "status": "SHIPPED",
      "createdAt": "2026-04-08T14:32:00Z",
      "updatedAt": "2026-04-10T09:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 25,
    "total": 235,
    "totalPages": 10
  }
}
```

### Bulk Update Order Status

Update the status of multiple orders in one request:

```sh
curl -X PATCH "https://api.example.com/v1/orders/bulk-update" \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "orderIds": ["ORD115", "ORD116", "ORD117"],
    "status": "SHIPPED"
  }'
```

**Response:**

```json
{
  "updated": 3,
  "failed": 0,
  "failures": []
}
```

If some orders fail to update:

```json
{
  "updated": 2,
  "failed": 1,
  "failures": [
    {
      "orderId": "ORD117",
      "reason": "Cannot transition from DELIVERED to SHIPPED"
    }
  ]
}
```

### Update a Single Order

Modify order fields (status, quantity, price):

```sh
curl -X PUT "https://api.example.com/v1/orders/ORD115" \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SHIPPED",
    "quantity": 2
  }'
```

**Response (HTTP 200):**

```json
{
  "orderId": "ORD115",
  "customerId": "CUST121",
  "productName": "Acoustic Guitar",
  "quantity": 2,
  "price": 7099.0,
  "status": "SHIPPED",
  "createdAt": "2026-04-07T09:15:00Z",
  "updatedAt": "2026-04-14T10:15:00Z"
}
```

### Handle API Errors

If a request fails, the API returns a structured error response:

```sh
curl -X POST "https://api.example.com/v1/orders" \
  -H "X-API-Key: invalid-key" \
  -H "Content-Type: application/json" \
  -d '{"customerId": "CUST122"}'
```

**Response (HTTP 401):**

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

**Response (HTTP 400 - validation error):**

```json
{
  "errorCode": "INVALID_REQUEST",
  "message": "Missing required fields",
  "details": [
    {
      "field": "productName",
      "issue": "This field is required"
    },
    {
      "field": "quantity",
      "issue": "This field is required"
    }
  ]
}
```

For more error scenarios, see [Error Handling](error-handling.md).

## Running the Documentation Locally

**To run this documentation site on your local machine:**

1.  Clone the repository

    ```sh
    git clone https://github.com/your-username/api-doc-automation.git
    cd api-doc-automation
    ```

1.  Install dependencies

    ```sh
    pip install mkdocs-material pyyaml
    ```

1.  Generate API docs from the OpenAPI spec

    ```sh
    python scripts/generate_docs.py
    ```

1.  Start the local docs server

    ```sh
    mkdocs serve
    ```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

## Next Steps

*   Read the full [CRM Order Management API](generated-api-doc.md)
*   Understand [Authentication](authentication.md)
*   Learn about [Error Handling](error-handling.md)
