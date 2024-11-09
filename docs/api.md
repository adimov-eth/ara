# Aravt API Documentation

## API Information
- **Current Version**: v1
- **Content-Type**: application/json
- **Accept**: application/json

## Base URL
`https://aravt-backend.fly.dev/`

## Authentication
All API endpoints require authentication using a Bearer token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Application For Membership

#### Create Application
- **Method**: POST
- **Endpoint**: `/application-for-membership`
- **Description**: Submit a new membership application

**Request Body**:
```typescript
{
  firstName: string;
  lastName: string;
  registrationNumber: string;
  phoneNumber: string;
  email: string;
  birthDate: string; // Format: YYYY-MM-DD
  address: {
    city: string;
    district: string;
    khoroo: string;
    apartment: string;
  };
  workplace: {
    name: string;
    position: string;
  };
  education: {
    degree: string;
    major: string;
    university: string;
    graduationYear: number;
  };
  membershipType: "STANDARD" | "STUDENT";
  isAgreedToTerms: boolean;
}
```

**Response**:
```typescript
{
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  // ... all submitted fields
}
```

#### Get Application Status
- **Method**: GET
- **Endpoint**: `/application-for-membership/{id}`
- **Description**: Retrieve the status of a submitted application

**Response**:
```typescript
{
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  // ... all application fields
}
```

### Error Responses
All endpoints may return the following error responses:
```typescript
{
  statusCode: number;
  message: string;
  error: string;
}
```

Common Status Codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

### Common Headers
**Request Headers**:
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <your_token>
```

**Response Headers**:
```
Content-Type: application/json
X-Request-ID: <request_id>
X-RateLimit-Limit: <limit>
X-RateLimit-Remaining: <remaining>
X-RateLimit-Reset: <reset_timestamp>
```

### Rate Limiting
- Rate limit: 100 requests per minute
- When exceeded, returns 429 Too Many Requests
- Reset time provided in X-RateLimit-Reset header

### Detailed Error Responses
```typescript
{
  statusCode: number;
  message: string;
  error: string;
  details?: {
    field?: string;
    code?: string;
    message?: string;
  }[];
}
```

Common Error Codes:
- `400`: Bad Request
  - `INVALID_INPUT`: Input validation failed
  - `DUPLICATE_ENTRY`: Resource already exists
- `401`: Unauthorized
  - `INVALID_TOKEN`: Authentication token is invalid
  - `EXPIRED_TOKEN`: Authentication token has expired
- `403`: Forbidden
  - `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `404`: Not Found
  - `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `429`: Too Many Requests
  - `RATE_LIMIT_EXCEEDED`: API rate limit exceeded
- `500`: Internal Server Error
  - `INTERNAL_ERROR`: Unexpected server error

## Pagination
For endpoints that return lists, pagination is supported using the following query parameters:
```
?page=1&limit=10
```

Response includes pagination metadata:
```typescript
{
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
```

## API Status
- **Method**: GET
- **Endpoint**: `/health`
- **Description**: Check API health status

**Response**:
```typescript
{
  status: "healthy" | "degraded" | "maintenance";
  version: string;
  timestamp: string;
}
```

## Changelog
### v1.0.0 (YYYY-MM-DD)
- Initial API release
- Implemented Application For Membership endpoints