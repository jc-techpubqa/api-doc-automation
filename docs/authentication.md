# Authentication

The CRM Order Management API uses **API key authentication**. Every request must include a valid API key in the request header.

## How It Works

1.  You receive an API key from the API team.
1.  Include the key in the `X-API-Key` header of every HTTP request.
1.  The server validates the key before processing the request.

If the key is missing or invalid, the API returns a `401 Unauthorized` response.

## Obtaining an API Key

Contact the support team to request a key:

## Including the API Key in Requests

Pass your API key in the `X-API-Key` request header:

```sh
curl -X GET "https://api.example.com/v1/orders" \
  -H "X-API-Key: your-api-key-here"
```

### Postman

1.  Open your request in Postman.
1.  Go to the **Headers** tab.
1.  Add a new header:

    *   **Key:** `X-API-Key`
    *   **Value:** `your-api-key-here`

### Python (requests library)

```python
import requests

headers = {
    "X-API-Key": "your-api-key-here",
    "Content-Type": "application/json"
}

response = requests.get("https://api.example.com/v1/orders", headers=headers)
print(response.json())
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://api.example.com/v1/orders", {
  headers: {
    "X-API-Key": "your-api-key-here",
    "Content-Type": "application/json"
  }
});
const data = await response.json();
console.log(data);
```

## Authentication Errors

| HTTP Status | Error Code | Cause | Resolution |
|-------------|------------|-------|------------|
| `401` | `UNAUTHORIZED` | Key is missing or malformed | Add a valid `X-API-Key` header |
| `401` | `UNAUTHORIZED` | Key has been revoked | Request a new key from support |
| `429` | `RATE_LIMIT_EXCEEDED` | Too many requests | Wait and retry after the reset window |

**Example 401 response:**

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

## Security Best Practices

*   Never expose your API key in client-side code, public repositories, or logs.

*   Store keys in environment variables or a secrets manager (for example, GitHub Secrets, AWS Secrets Manager).

*   Rotate keys periodically or immediately if a key is compromised.

*   Use HTTPS for all API requests to prevent key interception.

## Rate Limits

API keys are subject to rate limiting:

| Limit | Value |
|-------|-------|
| Requests/min | 100 per API key |
| Reset window | 60 seconds |
| Response | `429 Too Many Requests` |

When rate-limited, wait for the reset window before retrying.
