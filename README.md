# Beauty Salon

A full-stack salon appointment booking system built with the MERN stack (MongoDB, Express, React, Node.js). This application enables customers to browse available services and book appointments, while providing salon owners with an administrative dashboard to manage bookings.

## Recent Updates

- **User Authentication**: Fully implemented the secure `POST /auth/login` endpoint with data validation and connected the React frontend (`Login.tsx`) to the `AuthContext` to manage sessions seamlessly.
- **UI/UX Refinements**: Polished the navigation bar and footer with frosted glass effects (`backdrop-blur-md`), refined color opacities, updated typography weights, and properly integrated React components for social links with live URLs.

## Project Structure

This project is separated into two main directories:

- `client/`: The frontend React application powered by Vite.
- `server/`: The backend Node.js and Express application.

## Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui & Radix UI
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Other**: CORS, dotenv

## Getting Started

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Server Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `env.sample` in the `server` directory:
   ```bash
   cp env.sample .env
   ```
   *Edit the `.env` file to include your `MONGODB_URI` and any other required variables.*
4. Start the development server:
   ```bash
   npm run dev
   ```
   The backend server should now be running (typically on `http://localhost:8080` or port specified in `.env`). *Note: Dummy services, users, and appointments are seeded automatically on startup.*

### 2. Client Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The React application will be available at `http://localhost:5173`.

## Core Features

- **Customer Portal**: Browse available salon services and book appointments with an easy-to-use interface.
- **Admin Dashboard**: Salon owners can manage appointments, view booking statuses, and control service offerings.
- **Authentication & State**: Secure JWT-based login for admin access and customer signup/login. The React application uses the Context API (`AuthContext`) for global state management of user authentication and JWT tokens.
- **Responsive Design**: Mobile-friendly and clean UI/UX using Tailwind CSS and shadcn/ui.

## Application Routes

### Frontend Routes
The client-side React application uses React Router with the following paths:
- `/` : Home page
- `/services` : Services listing and booking page
- `/introduction` : Introduction page
- `/about` : About page
- `/login` : User/Admin login page
- `/signup` : User registration page

### Backend API Endpoints
The backend Express application exposes the following endpoints:
- `GET /health` : Health check endpoint to verify the server is running.
- `GET /services` : Retrieves a list of all available salon services.
- `GET /appointments/all` : Retrieves a list of all appointments in the system.
- `POST /auth/signup` : Registers a new user and sets a JWT cookie (handles `409 Conflict` for existing users).
- `POST /auth/login` : Authenticates an existing user and sets a secure JWT cookie.
- `GET /auth/user` : Retrieves the currently authenticated user based on the JWT cookie.
- `POST /auth/logout` : Logs out the user by clearing the JWT cookie.

## Scripts Details

**Client:**
- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production.
- `npm run lint` - Runs ESLint.

**Server:**
- `npm run dev` - Starts the backend server using nodemon for automatic restarts.
