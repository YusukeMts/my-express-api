# Express.js API Learning Project

A simple REST API built with Express.js for learning purposes. This project demonstrates basic CRUD operations for a products management system.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd my-express-api
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
node app.js
```

Or for development with auto-restart:
```bash
npx nodemon app.js
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Get All Products
```
GET /products
```
Returns a list of all products.

**Response:**
```json
[
  {
    "id": 1,
    "name": "ノートPC",
    "price": 120000,
    "category": "PC"
  },
  {
    "id": 2,
    "name": "ワイヤレスマウス",
    "price": 3500,
    "category": "周辺機器"
  }
]
```

### Get Product by ID
```
GET /products/:id
```
Returns a specific product by its ID.

**Response:**
```json
{
  "id": 1,
  "name": "ノートPC",
  "price": 120000,
  "category": "PC"
}
```

### Create New Product
```
POST /products
```
Creates a new product.

**Request Body:**
```json
{
  "name": "新商品",
  "price": 5000,
  "category": "カテゴリ"
}
```

**Response:**
```json
{
  "id": 5,
  "name": "新商品",
  "price": 5000,
  "category": "カテゴリ"
}
```

## 🛠️ Built With

- **Express.js** - Web framework for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **Nodemon** - Development tool for auto-restarting

## 📝 Features

- RESTful API design
- JSON request/response handling
- CORS enabled for cross-origin requests
- Basic input validation
- Error handling with appropriate HTTP status codes
- In-memory data storage

## ⚠️ Important Notes

- This is a **learning project** - not intended for production use
- Data is stored in memory only - server restart will reset all data
- No authentication or authorization implemented
- CORS is configured for development (allows all origins)

## 🧪 Testing the API

You can test the API using:
- Browser (for GET requests)
- Postman
- curl commands
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Get all products
curl http://localhost:3000/products

# Get product by ID
curl http://localhost:3000/products/1

# Create new product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"テスト商品","price":1000,"category":"テスト"}'
```

## 📖 Learning Objectives

This project demonstrates:
- Setting up an Express.js server
- Creating RESTful API endpoints
- Handling different HTTP methods (GET, POST)
- Request/response processing
- Basic error handling
- CORS configuration
- JSON data manipulation