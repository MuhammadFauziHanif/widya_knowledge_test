# API Documentation
For Postman documentation see: https://documenter.getpostman.com/view/23134106/2s9YBz3FFp
## User Registration

**Endpoint**: `/auth/register`  
**Method**: POST

### Request Body

- `name` (string, required): The user's full name.
- `email` (string, required): The user's email address.
- `gender` (string, required): The user's gender (e.g., "Male," "Female," "Other").
- `password` (string, required): The user's password (at least 6 characters).

**Example Request Body**:

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "gender": "Male",
  "password": "securepassword"
}
```

### Success Response (HTTP 201 Created)

- `token` (string): JSON Web Token (JWT) for authentication.
- `user` (object): User details, including `id`, `name`, `email`, and `gender`.

**Example Success Response**:

```json
{
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "gender": "Male"
  }
}
```

### Error Responses

- HTTP 400 Bad Request: Invalid request body or validation error.
- HTTP 500 Internal Server Error: Server encountered an error.

---

## User Login

**Endpoint**: `/auth/login`  
**Method**: POST

### Request Body

- `email` (string, required): The user's email address.
- `password` (string, required): The user's password (at least 6 characters).

**Example Request Body**:

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Success Response (HTTP 200 OK)

- `token` (string): JSON Web Token (JWT) for authentication.
- `user` (object): User details, including `id`, `name`, `email`, and `gender`.

**Example Success Response**:

```json
{
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "gender": "Male"
  }
}
```



### Error Responses

- HTTP 401 Unauthorized: Invalid credentials.
- HTTP 400 Bad Request: Invalid request body or validation error.
- HTTP 500 Internal Server Error: Server encountered an error.

## Get User Profile

**Endpoint**: `/api/profile`  
**Method**: GET  
**Authentication**: Bearer Token in the Authorization Header

### Request Headers

- `Authorization` (string, required): Bearer token obtained during user registration or login.

**Example Request Headers**:

```
Authorization: Bearer your-jwt-token
```

### Success Response (HTTP 200 OK)

- `user` (object): User details, including `id`, `name`, `email`, and `gender`.

**Example Success Response**:

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "gender": "Male"
  }
}
```

### Error Responses

- HTTP 401 Unauthorized: Invalid or missing Bearer token.
- HTTP 500 Internal Server Error: Server encountered an error.