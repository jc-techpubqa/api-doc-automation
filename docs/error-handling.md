# Error Handling

The CRM Order Management API uses standard HTTP status codes and returns structured JSON error responses to help you diagnose and resolve issues quickly.

## Error Response Format

All error responses follow this structure:

```json
{
  "errorCode": "ERROR_CODE",
  "message": "Human-readable description of the error",
  "details": [
    {
      "field": "fieldName",
      "issue": "Description of the validation failure"
    }
  ]
}
```

The following table describes the fields in the error response.

| Field | Type | Description |
|-------|------|-------------|
| `errorCode` | `string` | Machine-readable error code for programmatic handling |
| `message` | `string` | Human-readable explanation of what went wrong |
| `details` | `array` (optional) | Per-field validation errors, present on `400` responses |

## Error Codes Reference

The following table lists the possible error codes returned by the API, along with their corresponding HTTP status codes and common causes.

| Error Code | HTTP Status | Cause |
|------------|-------------|-------|
| `INVALID_REQUEST` | `400` | One or more required fields are missing or invalid |
| `UNAUTHORIZED` | `401` | API key is missing, invalid, or revoked |
| `ORDER_NOT_FOUND` | `404` | The specified `orderId` does not exist |
| `CONFLICT` | `409` | Operation not permitted in the order's current status |
| `RATE_LIMIT_EXCEEDED` | `429` | Too many requests sent within the rate limit window |
| `INTERNAL_SERVER_ERROR` | `500` | An unexpected server error occurred |

## 400 Bad Request

Returned when required fields are missing or field values fail validation.

```json
{
  "errorCode": "INVALID_REQUEST",
  "message": "Missing required fields",
  "details": [
    {
      "field": "customerId",
      "issue": "This field is required"
    },
    {
      "field": "quantity",
      "issue": "Must be greater than zero"
    }
  ]
}
```

**Common causes:**

*   Omitting a required field (`customerId`, `productName`, `quantity`, `price`)
*   Sending `quantity` as `0` or a negative number
*   Attempting to update an order with status `DELIVERED` or `CANCELLED`

## 401 Unauthorized

Returned when the `X-API-Key` header is missing or the key is not valid.

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

**Resolution:** Ensure the `X-API-Key` header is present in your request and the key is active. Contact the support team if you need a new key.

## 404 Not Found

Returned when the requested `orderId` does not exist in the system.

```json
{
  "errorCode": "ORDER_NOT_FOUND",
  "message": "Order with ID ORD999 was not found"
}
```

**Resolution:** Verify the `orderId` value. Use `GET /orders` to retrieve a list of valid order IDs.

## 409 Conflict

Returned when an operation is not permitted given the order's current status.

```json
{
  "errorCode": "CONFLICT",
  "message": "Cannot delete an order with status SHIPPED"
}
```

**Common causes:**

*   Attempting to delete an order with status `SHIPPED`, `PROCESSING`, or `DELIVERED`

*   Attempting to update a `DELIVERED` or `CANCELLED` order

**Resolution:** Check the [Order Lifecycle](index.md#order-lifecycle) to understand valid status transitions.

## 429 Too Many Requests

Returned when the API key exceeds the rate limit of 100 requests per minute.

```json
{
  "errorCode": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please retry after 60 seconds."
}
```

**Resolution:** Wait for the 60-second reset window before retrying. Implement exponential backoff in your integration to avoid hitting rate limits.

## 500 Internal Server Error

Returned when an unexpected error occurs on the server side.

```json
{
  "errorCode": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred. Please contact support."
}
```

**Resolution:** If this error persists, contact the support team with the timestamp and your request details.

## Handling Errors in Code

The following examples demonstrate how to handle API errors in Python and JavaScript.

### Python

```python
import requests

response = requests.get(
    "https://api.example.com/v1/orders/ORD999",
    headers={"X-API-Key": "your-api-key-here"}
)

if response.status_code == 200:
    order = response.json()
elif response.status_code == 404:
    error = response.json()
    print(f"Order not found: {error['message']}")
elif response.status_code == 401:
    print("Authentication failed. Check your API key.")
else:
    print(f"Unexpected error {response.status_code}: {response.text}")
```

### JavaScript

```javascript
const response = await fetch("https://api.example.com/v1/orders/ORD999", {
  headers: { "X-API-Key": "your-api-key-here" }
});

if (!response.ok) {
  const error = await response.json();
  console.error(`Error ${response.status}: ${error.message}`);
} else {
  const order = await response.json();
  console.log(order);
}
```
