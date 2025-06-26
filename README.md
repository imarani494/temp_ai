# Profile Management Application with Auth0 and Temporal

![React](https://img.shields.io/badge/React-18.2-blue)
![Auth0](https://img.shields.io/badge/Auth0-SPA_JS-orange)
![Temporal](https://img.shields.io/badge/Temporal-Workflow-purple)
![MaterialUI](https://img.shields.io/badge/Material-UI-007FFF)

A secure profile management application featuring:
- Authentication via Auth0
- Profile editing with form validation
- Temporal workflows for background processing
- CRUD operations with simulated database

## Features

- 🔒 Secure authentication with Auth0
- ✏️ Edit profile information (name, contact, location)
- ⏳ Temporal workflow with 10-second delayed CRUD operation
- 📱 Responsive Material-UI interface
- 🚦 Error handling and loading states

## Prerequisites

- Node.js v16+
- npm/yarn
- Temporal CLI
- Auth0 account
- CRUDCrud API key (free)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/profile-app.git
cd profile-app
2. Install dependencies
bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
3. Set up environment variables
Create .env files in both frontend and backend directories:

frontend/.env

env
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=your-api-audience
REACT_APP_API_URL=http://localhost:3001
backend/.env

env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
CRUD_CRUD_API_KEY=your-crudcrud-key
SESSION_SECRET=your-session-secret
4. Configure Auth0
Create a Single Page Application in Auth0 Dashboard

Add http://localhost:3000 to:

Allowed Callback URLs

Allowed Logout URLs

Allowed Web Origins

Allowed Origins (CORS)

Running the Application
1. Start Temporal service
bash
temporal server start-dev
2. Run Temporal worker (in separate terminal)
bash
cd backend
npm run worker
3. Start backend server
bash
npm start
4. Start frontend
bash
cd ../frontend
npm start
The application will be available at http://localhost:3000

Project Structure
text
profile-app/
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/                # Application source
│   │   ├── components/     # React components
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main application
├── backend/                # Node.js server
│   ├── src/
│   │   ├── temporal/       # Workflow definitions
│   │   ├── routes/         # API endpoints
│   │   └── server.ts       # Server entry point
└── README.md               # This file
Troubleshooting
Auth0 Secure Origin Error
If you see "auth0-spa-js must run on a secure origin":

Add http://localhost:3000 to Auth0 Allowed Origins





