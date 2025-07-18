# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a basic Express.js REST API project (`api-lesson`) that provides a simple products management system. The API serves as a learning example for RESTful API development with Express.js, featuring in-memory data storage and basic CRUD operations.

## Development Commands

```bash
# Start the server (development)
node app.js

# Start with auto-restart on changes (recommended for development)
npx nodemon app.js

# Install dependencies
npm install

# Note: No test framework is currently configured
# The package.json test script returns an error placeholder
```

## API Architecture

### Core Structure
- **Single file architecture**: All API logic is contained in `app.js`
- **In-memory data storage**: Product data is stored in a JavaScript array (not persistent)
- **RESTful design**: Follows REST conventions for HTTP methods and status codes

### Available Endpoints
- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product by ID
- `POST /products` - Create a new product

### Data Model
Products contain the following fields:
- `id` (number) - Auto-generated unique identifier
- `name` (string) - Product name (required)
- `price` (number) - Product price (required)
- `category` (string) - Product category (required)

### Key Dependencies
- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing middleware for handling requests from different domains
- **nodemon**: Development dependency for auto-restarting the server on file changes

### Server Configuration
- Default port: 3000
- CORS enabled for all origins (development configuration)
- JSON request body parsing enabled
- Extensive Japanese comments explaining each concept

## Architecture Notes

### Development Patterns
- The codebase uses extensive Japanese comments for educational purposes
- Error handling includes appropriate HTTP status codes (200, 201, 400, 404)
- Basic validation is implemented for POST requests
- Console logging is used for request tracking

### Data Persistence
- Data is stored in memory only - server restart will reset all data
- No database integration is currently implemented
- ID generation uses simple increment logic based on existing data

### Production Considerations
- This is a learning/demo project - not production-ready
- CORS is configured for development (allows all origins)
- No authentication or authorization implemented
- No data persistence beyond server runtime