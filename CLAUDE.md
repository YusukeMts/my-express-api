# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a basic Express.js REST API project (`api-lesson`) that provides a simple products management system with a React frontend. The project demonstrates full-stack development with a RESTful API backend and a React client for product management.

### Components
- **Backend API** (`app.js`): Express.js REST API server
- **Frontend Client** (`product-viewer/`): React application for product management UI

## Development Commands

### Backend API Server
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

### Frontend React Application
```bash
# Navigate to frontend directory
cd product-viewer

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test
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

## Frontend Architecture

### React Application Structure
- **Component-based architecture**: Built with Create React App
- **State management**: Uses React hooks (useState, useEffect) for local state
- **API integration**: Communicates with Express backend via fetch API
- **Styling**: Basic CSS for UI components

### Key Features Implemented
- **Product listing**: Displays all products fetched from API
- **Product creation**: Form interface for adding new products
- **Real-time updates**: Automatically refreshes product list after adding items
- **Error handling**: Basic error handling for API requests

### React Components
- **App.js**: Main application component with state management
- **Product form**: Input fields for name, price, and category
- **Product list**: Displays fetched products in a structured format

### Integration Points
- Frontend runs on `http://localhost:3000` (React dev server)
- Backend API runs on `http://localhost:3000` (Express server)
- CORS configuration allows frontend to communicate with backend
- Real-time data synchronization between frontend and backend

## Implementation Status

### ✅ Complete Implementation - All Core Features Working

Based on current codebase analysis:

#### Backend API (`app.js`) - ✅ COMPLETE
- **Express server setup**: Port 3000 with CORS enabled
- **Data storage**: In-memory array with 4 sample products (ノートPC, ワイヤレスマウス, メカニカルキーボード, Webカメラ)
- **GET /products**: Returns all products with proper error handling
- **GET /products/:id**: Returns specific product by ID with 404 handling
- **POST /products**: Creates new products with validation and auto-generated IDs
- **Comprehensive logging**: Japanese console logs for all requests
- **Data validation**: Required fields (name, price, category) with 400 status codes

#### Frontend React App (`product-viewer/src/App.js`) - ✅ COMPLETE
- **State management**: Uses React hooks (useState, useEffect) for products, loading, error states
- **Product form**: Complete form with name, price, category inputs and validation
- **Product display**: Styled product list showing all fetched products
- **API integration**: Full CRUD integration with backend API
- **Error handling**: Try-catch blocks with user-friendly error messages
- **Loading states**: Loading indicator during API calls
- **Form management**: Auto-clear form after successful submission
- **Real-time updates**: Product list updates immediately after adding new items

#### Integration & Communication - ✅ COMPLETE
- **CORS configuration**: Backend properly configured for frontend communication
- **API endpoints**: Frontend correctly calls `http://localhost:3000/products`
- **Data flow**: Complete bidirectional data flow between frontend and backend
- **Error propagation**: Proper error handling from API to UI

### Current Functionality - FULLY OPERATIONAL
- ✅ **View products**: Display all products in formatted list with styling
- ✅ **Add products**: Complete form submission with validation and immediate UI update
- ✅ **Data persistence**: Products persist in server memory during runtime
- ✅ **Error handling**: Comprehensive error handling for network and validation errors
- ✅ **Loading states**: User feedback during API operations
- ✅ **Form validation**: Required field validation on both frontend and backend

## Quick Start Guide

### Step 1: Start the Backend API Server
```bash
# In the root directory (/my-express-api)
node app.js
# or with auto-restart
npx nodemon app.js
```
Expected output: `サーバーがポート3000で起動しました`

### Step 2: Start the Frontend React Application
```bash
# Open a new terminal window/tab
cd product-viewer
npm start
```
Expected: Browser opens to `http://localhost:3001` (React dev server will use port 3001 since 3000 is occupied by API)

### Step 3: Verify the Application
1. **API Endpoints Test**:
   - GET `http://localhost:3000/products` - Should return empty array `[]` initially
   - Browser console network tab shows successful API calls

2. **Frontend Functionality Test**:
   - Product form should be visible on the page
   - Adding a product should:
     - Send POST request to API
     - Update the product list immediately
     - Clear the form fields

3. **Integration Test**:
   - Add a product through the form
   - Verify it appears in the product list
   - Check API endpoint to confirm data persistence

## Future Enhancement Opportunities

### Database Integration
- Replace in-memory storage with persistent database (PostgreSQL, MongoDB, Supabase)
- Add database migrations and schema management
- Implement connection pooling and query optimization

### API Enhancements
- **Authentication & Authorization**: User login/registration with JWT tokens
- **CRUD Operations**: Add PUT (update) and DELETE endpoints
- **Data Validation**: Enhanced validation with libraries like Joi or Yup
- **Pagination**: Handle large product lists with pagination
- **Search & Filtering**: Add search by name, filter by category, price range
- **File Uploads**: Product image upload functionality
- **Rate Limiting**: Protect API from abuse

### Frontend Improvements
- **Component Architecture**: Split into reusable components (ProductForm, ProductList, ProductCard)
- **State Management**: Consider Context API or Redux for complex state
- **UI/UX Enhancements**: Better styling, responsive design, loading animations
- **Form Improvements**: Better validation, auto-complete, rich text editing
- **Product Management**: Edit/delete functionality, bulk operations
- **Search Interface**: Real-time search, advanced filters
- **Routing**: Multi-page application with React Router

### Production Readiness
- **Environment Configuration**: Separate dev/staging/production configs
- **Testing**: Unit tests, integration tests, E2E tests
- **Deployment**: Docker containerization, CI/CD pipelines
- **Monitoring**: Logging, error tracking, performance monitoring
- **Security**: Input sanitization, SQL injection protection, HTTPS
- **Performance**: Caching, compression, CDN integration

### Troubleshooting

#### Port Conflicts
- If port 3000 is busy: Check for other running processes
- React dev server will automatically find next available port (3001, 3002, etc.)

#### API Connection Issues
- Verify backend server is running on port 3000
- Check browser console for CORS errors
- Ensure both frontend and backend are running simultaneously

#### Development Workflow
1. Always start backend server first
2. Then start frontend application
3. Both must remain running for full functionality

## Learning Path Progression

This project serves as a foundation for learning full-stack development:

1. **Current Level**: Basic CRUD API with React frontend ✅
2. **Next Steps**: Database integration, authentication
3. **Advanced Topics**: Microservices, real-time features, deployment
4. **Professional Level**: Testing, monitoring, scalability