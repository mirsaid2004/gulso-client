# Gulso API Mocking Docs

This document maps all current REST endpoints to request/response DTOs and field schemas for mock API generation.

## 1. Base Info

- Base URL prefix: `/api/v1`
- All controller responses are wrapped by a global DTO wrapper:

```json
{
  "success": true,
  "message": "optional",
  "data": {},
  "meta": {
    "currentPage": 0,
    "lastPage": 1,
    "perPage": 20,
    "total": 100
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  },
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {}
  }
}
```

Notes:
- For non-page responses: `success` + `data` (usually no `meta/links`).
- For `Page<T>` responses: `data` is array of `T`, plus `meta` and `links`.
- For methods returning `void`: wrapper still returns `{ success: true, data: null }`.
- For methods returning `String`: wrapper returns `{ success: true, data: "..." }`.

## 2. API Endpoints

## Authentication (`/auth`)

### POST `/api/v1/auth/otp/send`
- Auth: public
- Request body: `SendOtpRequest`
- Response data: `String` (`"OTP sent successfully"`)

### POST `/api/v1/auth/otp/login`
- Auth: public
- Request body: `LoginWithOtpRequest`
- Response data: `AuthResponse`

### POST `/api/v1/auth/refresh`
- Auth: public
- Request body: `RefreshTokenRequest`
- Response data: `AuthResponse`

### POST `/api/v1/auth/logout`
- Auth: authenticated
- Request body: none
- Response data: `null`

### POST `/api/v1/auth/delete/request`
- Auth: authenticated
- Request body: none
- Response data: `String` (`"OTP for account deletion sent"`)

### POST `/api/v1/auth/delete/confirm`
- Auth: authenticated
- Request body: `DeleteAccountRequest`
- Response data: `String` (`"Account successfully deleted"`)

## Users (`/users`)

### GET `/api/v1/users/me`
- Auth: authenticated
- Request body: none
- Response data: `UserResponse`

## Company (`/company`)

### POST `/api/v1/company/register`
- Auth: authenticated
- Request body: `CreateCompanyRequest`
- Response data: `CompanyResponse`

### GET `/api/v1/company/all`
- Auth: authenticated
- Query params:
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `CompanyResponse[]` + pagination meta/links

### GET `/api/v1/company/{companyId}/profile`
- Auth: authenticated
- Path params: `companyId: Long`
- Response data: `CompanyResponse`

### PUT `/api/v1/company/{companyId}/profile`
- Auth: authenticated
- Path params: `companyId: Long`
- Request body: `CreateCompanyRequest`
- Response data: `CompanyResponse`

### GET `/api/v1/company/{companyId}/finance/summary`
- Auth: authenticated
- Path params: `companyId: Long`
- Response data: `FinanceSummaryResponse`

### GET `/api/v1/company/{companyId}/finance/payouts`
- Auth: authenticated
- Path params: `companyId: Long`
- Query params:
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `CompanyPayoutResponse[]` + pagination meta/links

## Products

### GET `/api/v1/products`
- Auth: public
- Query params:
  - `search: String`
  - `category: ProductCategory`
  - `minPrice: BigDecimal`
  - `maxPrice: BigDecimal`
  - `status: ProductStatus`
  - `companyId: Long`
  - `isActive: Boolean`
  - `isNew: Boolean`
  - `isInStock: Boolean`
  - `hasDiscount: Boolean`
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `ProductResponse[]` + pagination meta/links

### GET `/api/v1/products/{id}`
- Auth: public
- Path params: `id: Long`
- Response data: `ProductDetailedResponse`

### GET `/api/v1/company/{companyId}/products`
- Auth: authenticated
- Path params: `companyId: Long`
- Query params: same as `ProductFilter` + page/sort params
- Response data: `ProductResponse[]` + pagination meta/links

### POST `/api/v1/seller/products`
- Auth: authenticated
- Request body: `CreateProductRequest`
- Response data: `ProductDetailedResponse`

### PUT `/api/v1/seller/products/{productId}`
- Auth: authenticated
- Path params: `productId: Long`
- Request body: `UpdateProductRequest`
- Response data: `ProductDetailedResponse`

### DELETE `/api/v1/seller/products/{id}`
- Auth: authenticated
- Path params: `id: Long`
- Request body: none
- Response data: `null`

## Orders

### POST `/api/v1/orders`
- Auth: authenticated
- Request body: `CreateOrderRequest`
- Response data: `OrderResponse`

### GET `/api/v1/orders`
- Auth: authenticated
- Query params:
  - `status: OrderStatus`
  - `from: LocalDateTime`
  - `to: LocalDateTime`
  - `search: String`
  - `isActive: Boolean`
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `OrderResponse[]` + pagination meta/links

### GET `/api/v1/orders/{orderId}`
- Auth: authenticated
- Path params: `orderId: Long`
- Response data: `OrderResponse`

### GET `/api/v1/company/{companyId}/orders`
- Auth: authenticated
- Path params: `companyId: Long`
- Query params: same as `OrderFilter` + page/sort params
- Response data: `OrderResponse[]` + pagination meta/links

### PATCH `/api/v1/company/{companyId}/orders/{orderId}/status`
- Auth: authenticated
- Path params:
  - `companyId: Long`
  - `orderId: Long`
- Request body: `UpdateOrderStatusRequest`
- Response data: `OrderResponse`

## Comments

### GET `/api/v1/products/{productId}/comments`
- Auth: public
- Path params: `productId: Long`
- Query params:
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `CommentResponse[]` + pagination meta/links

### POST `/api/v1/products/{productId}/comments`
- Auth: authenticated
- Path params: `productId: Long`
- Request body: `CreateCommentRequest`
- Response data: `CommentResponse`

### DELETE `/api/v1/comments/{commentId}`
- Auth: authenticated
- Path params: `commentId: Long`
- Request body: none
- Response data: `null`

### POST `/api/v1/comments/{commentId}/like`
- Auth: authenticated
- Path params: `commentId: Long`
- Request body: none
- Response data: `CommentResponse`

### POST `/api/v1/comments/{commentId}/dislike`
- Auth: authenticated
- Path params: `commentId: Long`
- Request body: none
- Response data: `CommentResponse`

## Favorites (`/favorites`)

### POST `/api/v1/favorites/{productId}`
- Auth: authenticated
- Path params: `productId: Long`
- Request body: none
- Response data: `null`

### DELETE `/api/v1/favorites/{productId}`
- Auth: authenticated
- Path params: `productId: Long`
- Request body: none
- Response data: `null`

### GET `/api/v1/favorites`
- Auth: authenticated
- Query params:
  - `sortBy: String = createdAt`
  - `sortDir: String = desc`
  - `page: int = 0`
  - `size: int = 20`
- Response data: `ProductResponse[]` + pagination meta/links

## Media (`/media`)

### POST `/api/v1/media` (multipart/form-data)
- Auth: authenticated (by security policy)
- Form fields:
  - `file: MultipartFile`
- Response data: `MediaFileResponse`

### DELETE `/api/v1/media/{s3Key}`
- Auth: authenticated (by security policy)
- Path params: `s3Key: String`
- Response data: `null`

## 3. Request DTO Schemas

### SendOtpRequest
```json
{
  "phone": "+998901234567"
}
```
Validation:
- `phone` required
- Pattern: `^\\+998(90|91|93|94|95|97|98|99)[0-9]{7}$`

### LoginWithOtpRequest
```json
{
  "phone": "+998901234567",
  "otpCode": "123456"
}
```
Validation:
- `phone` required, Uzbekistan pattern
- `otpCode` required, length exactly 6

### RefreshTokenRequest
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

### DeleteAccountRequest
```json
{
  "otpCode": "123456"
}
```

### CreateCompanyRequest
```json
{
  "companyName": "Tech Store Tashkent",
  "description": "Professional electronics retailer",
  "logoId": 123,
  "workingHours": "Mon-Fri 9:00-18:00",
  "productType": "Electronics",
  "countryId": 1,
  "regionId": 1,
  "districtId": 5,
  "street": "123 Main Street",
  "zipCode": "100000",
  "latitude": 41.2995,
  "longitude": 69.2401
}
```
Required:
- `companyName`, `countryId`, `regionId`, `districtId`, `street`, `latitude`, `longitude`

### ProductTranslationDTO
```json
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "specifications": ["Bluetooth 5.0", "Battery life: 30 hours"]
}
```

### CreateProductRequest
```json
{
  "translations": {
    "en": {
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones",
      "specifications": ["Bluetooth 5.0", "30h battery"]
    },
    "ru": {
      "name": "Беспроводные наушники",
      "description": "Высококачественные беспроводные наушники",
      "specifications": ["Bluetooth 5.0", "30 часов"]
    }
  },
  "name": "Simsiz naushniklar",
  "description": "Yuqori sifatli naushniklar",
  "specifications": ["Bluetooth 5.0"],
  "price": 199.99,
  "discount": 0.5,
  "stockQuantity": 50,
  "category": "FLOWERS",
  "imageIds": [1, 2, 3],
  "deliveryAvailable": true,
  "pickupAvailable": true
}
```
Required:
- `name`, `price`, `stockQuantity`, `category`, `imageIds`

### UpdateProductRequest
All fields optional (partial update):
```json
{
  "name": "New product name",
  "description": "Updated description",
  "price": 149.99,
  "discount": 0.5,
  "translations": {
    "en": {
      "name": "New name",
      "description": "Updated",
      "specifications": ["Spec 1"]
    }
  },
  "specifications": ["Updated spec"],
  "stockQuantity": 100,
  "category": "GIFTS",
  "imageIds": [11, 12],
  "deliveryAvailable": true,
  "pickupAvailable": false
}
```

### CreateCommentRequest
```json
{
  "content": "Great product",
  "rating": 4.5
}
```
Validation:
- `content` required, 1..2000 chars
- `rating >= 0`

### CreateOrderRequest
```json
{
  "recipientName": "John Doe",
  "recipientPhone": "+998901234567",
  "deliveryAddress": "Tashkent, Main street 1",
  "latitude": 41.2995,
  "longitude": 69.2401,
  "deliveryDate": "2026-05-10T15:00:00",
  "deliveryType": "DELIVERY",
  "paymentType": "ONLINE",
  "comment": "Call before delivery",
  "items": [
    {
      "productId": 101,
      "quantity": 2
    }
  ]
}
```
Required:
- `recipientName`, `recipientPhone`, `deliveryAddress`, `items`

### UpdateOrderStatusRequest
```json
{
  "status": "ACCEPTED"
}
```

## 4. Response DTO Schemas

### AuthResponse
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "userId": 123,
  "name": "John Doe",
  "roles": ["USER", "SELLER"]
}
```

### UserResponse
```json
{
  "id": 123,
  "name": "John Doe",
  "phone": "+998901234567",
  "email": "john@example.com",
  "role": ["USER"],
  "isActive": true,
  "createdAt": "2026-01-01T10:00:00"
}
```

### AddressResponse
```json
{
  "id": 10,
  "country": "Uzbekistan",
  "region": "Tashkent",
  "district": "Yunusabad",
  "street": "Main street",
  "zipCode": "100000",
  "latitude": 41.2995,
  "longitude": 69.2401,
  "isActive": true
}
```

### CompanyResponse
```json
{
  "id": 1,
  "userId": 123,
  "shopName": "Tech Store",
  "description": "A modern electronics store",
  "logoUrl": "https://...",
  "workingHours": "Mon-Fri 9:00-18:00",
  "productType": "Electronics",
  "addresses": [
    {
      "id": 10,
      "country": "Uzbekistan",
      "region": "Tashkent",
      "district": "Yunusabad",
      "street": "Main street",
      "zipCode": "100000",
      "latitude": 41.2995,
      "longitude": 69.2401,
      "isActive": true
    }
  ],
  "status": "ACTIVE",
  "commissionRate": 0.05,
  "createdAt": "2026-01-01T10:00:00"
}
```

### FinanceSummaryResponse
```json
{
  "totalGross": 10000.00,
  "totalFee": 500.00,
  "totalNet": 9500.00,
  "pendingNet": 1500.00
}
```

### CompanyPayoutResponse
```json
{
  "id": 456,
  "orderId": 789,
  "gross": 100.00,
  "fee": 5.00,
  "net": 95.00,
  "status": "PAID",
  "paidAt": "2026-02-01T12:00:00",
  "createdAt": "2026-01-31T12:00:00"
}
```

### ProductResponse
```json
{
  "id": 101,
  "name": "Wireless Headphones",
  "price": 199.99,
  "disCount": 0.5,
  "rating": 4.7,
  "reviewCount": 112,
  "imageUrl": "https://...",
  "company": "Tech Store",
  "isNew": true
}
```

### ProductDetailedResponse
```json
{
  "id": 101,
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "specifications": ["Bluetooth 5.0", "30h battery"],
  "price": 199.99,
  "discount": 0.5,
  "status": "ACTIVE",
  "available": true,
  "stockQuantity": 50,
  "rating": 4.7,
  "reviewCount": 112,
  "category": "FLOWERS",
  "company": {
    "id": 1,
    "name": "Tech Store"
  },
  "media": [
    {
      "id": 9001,
      "url": "https://...",
      "primary": true
    }
  ]
}
```

### CommentResponse
```json
{
  "id": 1,
  "content": "Great product",
  "userId": 123,
  "username": "john",
  "userAvatar": "https://...",
  "commentDate": "2026-01-10T09:00:00",
  "rating": 4.5,
  "likesCount": 10,
  "dislikesCount": 1
}
```

### OrderResponse
```json
{
  "id": 123,
  "recipientName": "John Doe",
  "recipientPhone": "+998901234567",
  "deliveryAddress": "Tashkent",
  "deliveryDate": "2026-01-20T14:30:00",
  "comment": "Please call",
  "status": "DELIVERED",
  "totalAmount": 150.00,
  "items": [
    {
      "id": 456,
      "productId": 789,
      "productName": "Wireless Headphones",
      "productPrice": 50.00,
      "quantity": 2,
      "subtotal": 100.00
    }
  ],
  "createdAt": "2026-01-15T10:30:00"
}
```

### MediaFileResponse
```json
{
  "id": 123,
  "url": "https://s3.amazonaws.com/bucket/image.jpg",
  "s3Key": "uploads/2026/05/image.jpg",
  "originalName": "my-photo.jpg",
  "contentType": "image/jpeg",
  "sizeBytes": 2048576
}
```

## 5. Filter Objects Used as Query Params

### ProductFilter
```json
{
  "search": "pizza",
  "category": "FLOWERS",
  "minPrice": 10.00,
  "maxPrice": 100.00,
  "status": "ACTIVE",
  "companyId": 123,
  "isActive": true,
  "isNew": true,
  "isInStock": true,
  "hasDiscount": true
}
```

### OrderFilter
```json
{
  "status": "ACCEPTED",
  "buyerId": 123,
  "companyId": 456,
  "from": "2026-01-01T00:00:00",
  "to": "2026-12-31T23:59:59",
  "search": "John",
  "isActive": true
}
```

## 6. Enum Values

- `Role`: `USER`, `SELLER`, `ADMIN`
- `CompanyStatus`: `PENDING`, `ACTIVE`, `REJECTED`, `SUSPENDED`
- `PayoutStatus`: `PENDING`, `PAID`
- `ProductCategory`: `FLOWERS`, `GIFTS`, `BAKERY`
- `ProductStatus`: `ACTIVE`, `OUT_OF_STOCK`
- `OrderStatus`: `ACCEPTED`, `PREPARING`, `READY_FOR_COURIER`, `IN_DELIVERY`, `DELIVERED`, `CANCELLED`
- `DeliveryType`: `DELIVERY`, `PICKUP`
- `PaymentType`: `ONLINE`, `CASH_ON_DELIVERY`, `PAY_ON_PICKUP`
- `ReactionType`: `LIKE`, `DISLIKE`

## 7. Standard Error Envelope

Error responses use:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": "message"
    }
  }
}
```

Common `error.code` values:
- `NOT_FOUND`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `BUSINESS_ERROR`
- `CONFLICT`
- `BAD_REQUEST`
- `VALIDATION_ERROR`
- `INTERNAL_ERROR`
