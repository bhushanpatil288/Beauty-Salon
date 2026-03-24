# Beauty Salon

A full-stack salon appointment booking system built with the MERN stack (MongoDB, Express, React, Node.js). This application enables customers to browse available services and book appointments, while providing salon owners with a dedicated admin portal to manage bookings.

## Recent Updates

- **Role-Based Authentication**: Introduced separate admin and user flows. Admin accounts are created via a dedicated `/signup/admin` endpoint that requires a secret key, and admins log in via `/login/admin`. Regular users are blocked from logging in through the admin login route and vice versa.
- **Admin Signup & Login Pages**: Added `AdminSignup.tsx` and `AdminLogin.tsx` pages on the frontend. Both require a `secretKey` field in addition to the standard credentials. The secret key is validated server-side against the `ADMIN_SECRET_KEY` environment variable.
- **Separate Admin API Functions**: Added `adminSignup` and `adminLogin` functions in `api.ts` that target the correct admin-specific endpoints (`/auth/signup/admin`, `/auth/login/admin`).
- **Form Validation Middleware**: Added `adminSignupValidation` and `adminLoginValidation` middleware to validate the `secretKey` field alongside phone, name, and password.
- **Appointment Booking Flow**: Created a fully functional `Appointment.tsx` booking page with timeslot blocking logic to prevent double-bookings. Integrates `GET /appointments/date/:date` to fetch and calculate blocked slots dynamically based on service duration.
- **Auth Session Persistence**: Fixed `AuthContext` state to reliably verify user session on page refresh via `/auth/user`. Added a `loading` state to prevent `<ProtectedRoute>` components from prematurely redirecting authenticated users.
- **UI/UX Refinements**: Polished the navigation bar and footer with frosted glass effects, resolved React list rendering warnings in `Footer.tsx`, and ensured fully responsive styling across all forms.

## Project Structure

```
pooja-Beauty-Salon/
├── client/          # React + TypeScript frontend (Vite)
└── server/          # Node.js + Express backend
```

## Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui & Radix UI
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **HTTP**: Axios

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (via cookie), bcrypt
- **Validation**: express-validator
- **Other**: CORS, cookie-parser, dotenv

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Server Setup

```bash
cd server
npm install
cp env.sample .env   # then fill in your values
npm run dev
```

The backend runs on `http://localhost:8080` (or the port specified in `.env`).

#### Required `.env` Variables

| Variable | Description |
|---|---|
| `DB_URI` | MongoDB connection string |
| `PORT` | Server port (default: `8080`) |
| `JWT_SECRET` | Secret key for signing JWTs |
| `ADMIN_SECRET_KEY` | Secret passphrase required to create/login as admin |

### 2. Client Setup

```bash
cd client
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`.

## Core Features

- **Customer Portal**: Browse salon services and book appointments with real-time availability checking.
- **Admin Portal**: Separate admin signup/login protected by a secret key. Admins can manage appointments and services.
- **Role-Based Auth**: User model supports `"user"` and `"admin"` roles. Each role has dedicated endpoints and frontend pages with appropriate guards.
- **Authentication & State**: Secure HttpOnly cookie-based JWT authentication. The React app uses the Context API (`AuthContext`) for global auth state management.
- **Appointment Timeslot Blocking**: Prevents overlapping bookings based on service duration and existing appointments for a given date.
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS and shadcn/ui.

## Application Routes

### Frontend Routes

| Path | Description | Protected |
|---|---|---|
| `/` | Home page | No |
| `/services` | Services listing | No |
| `/about` | About page | No |
| `/introduction` | Introduction page | No |
| `/signup` | User registration | No |
| `/login` | User login | No |
| `/signup/admin` | Admin registration (requires secret key) | No |
| `/login/admin` | Admin login (requires secret key) | No |
| `/appointments` | Appointment booking page | Yes (user) |
| `/profile` | User profile & dashboard | Yes (user) |

### Backend API Endpoints

#### Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |

#### Services
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/services` | List all salon services |

#### Appointments
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/appointments/all` | List all appointments |
| `GET` | `/appointments/date/:date` | Get appointments for a specific date |
| `POST` | `/appointments/create` | Create a new appointment |

#### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Register a new user (role: `user`) |
| `POST` | `/auth/signup/admin` | Register a new admin — requires `secretKey` |
| `POST` | `/auth/login` | Login as a regular user |
| `POST` | `/auth/login/admin` | Login as admin — requires `secretKey` |
| `GET` | `/auth/user` | Get currently authenticated user (JWT cookie) |
| `POST` | `/auth/logout` | Logout and clear JWT cookie |

## Scripts

**Client:**
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
```

**Server:**
```bash
npm run dev      # Start backend with nodemon
```
