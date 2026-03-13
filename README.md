[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23037130&assignment_repo_type=AssignmentRepo)

# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

## API Documentation

### Base URL

https://marcellino10.online

---

## Models

### User

- id : integer
- username : string
- email : string
- password : string
- role : string

### Category

- id : integer
- name : string

### Product

- id : integer
- name : string
- description : string
- price : integer
- stock : integer
- imgUrl : string
- categoryId : integer
- authorId : integer

---

## Relationships

- User hasMany Product
- Category hasMany Product
- Product belongsTo User
- Product belongsTo Category

---

## Endpoints

### Authentication

#### POST /login

Request Body
{
"email": "string",
"password": "string"
}

Response (200)
{
"access_token": "<token>"
}

Response (401)
{
"message": "Invalid email/password"
}

---

### User

#### POST /add-user

Headers
{
"authorization": "Bearer <token>"
}

Body
{
"username": "string",
"email": "string",
"password": "string",
"role": "admin/staff"
}

Response (201)
{
"id": 3,
"username": "staff1",
"email": "staff@mail.com",
"role": "staff"
}

---

## Category Endpoints

### GET /categories

Headers
{
"authorization": "Bearer <token>"
}

Response (200)
[
{
"id":1,
"name":"Furniture"
}
]

### POST /categories

Headers
{
"authorization": "Bearer <token>"
}

Body
{
"name":"Electronics"
}

Response (201)
{
"id":2,
"name":"Electronics"
}

### PUT /categories/:id

Headers
{
"authorization": "Bearer <token>"
}

Params
{
"id":"integer"
}

Body
{
"name":"Updated Category"
}

Response (200)
{
"id":2,
"name":"Updated Category"
}

---

## Product Endpoints

### POST /products

Headers
{
"authorization": "Bearer <token>"
}

Body
{
"name":"Wooden Chair",
"description":"Minimalist wooden chair",
"price":150000,
"stock":10,
"imgUrl":"https://example.com/chair.jpg",
"categoryId":1
}

Response (201)
{
"id":1,
"name":"Wooden Chair",
"price":150000,
"stock":10
}

### GET /products

Headers
{
"authorization": "Bearer <token>"
}

Response (200)
[
{
"id":1,
"name":"Wooden Chair",
"price":150000,
"stock":10,
"Category":{
"id":1,
"name":"Furniture"
}
}
]

### GET /products/:id

Response (200)
{
"id":1,
"name":"Wooden Chair",
"description":"Minimalist wooden chair",
"price":150000,
"stock":10,
"imgUrl":"https://example.com/chair.jpg",
"Category":{
"id":1,
"name":"Furniture"
}
}

### PUT /products/:id

Request Body
{
"name":"Updated Chair",
"price":200000
}

### PATCH /products/:id/upload

Request Form Data
imgUrl : file

### DELETE /products/:id

Response
{
"message":"Product successfully deleted"
}

---

## Public Endpoints

### GET /pub/products

Response (200)
[
{
"id":1,
"name":"Wooden Chair",
"price":150000,
"imgUrl":"https://example.com/chair.jpg"
}
]

### GET /pub/products/:id

Response (200)
{
"id":1,
"name":"Wooden Chair",
"description":"Minimalist wooden chair",
"price":150000,
"stock":10,
"imgUrl":"https://example.com/chair.jpg",
"Category":{
"id":1,
"name":"Furniture"
}
}

---

## Global Errors

### 401 Unauthorized

{
"message":"Invalid token"
}

### 403 Forbidden

{
"message":"You are not authorized"
}

### 500 Internal Server Error

{
"message":"Internal server error"
}
