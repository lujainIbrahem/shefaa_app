# 🏥 Shefaa Medical Appointment System API

A secure and scalable healthcare appointment management system built with **NestJS**, **MongoDB**, **JWT Authentication**, **Google OAuth**, and **Role-Based Access Control (RBAC)**.

The system enables doctors, patients, and companions to interact through a secure workflow including authentication, profile management, availability scheduling, and appointment booking.

---

## 🚀 Tech Stack

- **Backend:** NestJS, Node.js, TypeScript
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JWT (Access & Refresh Tokens), Google OAuth
- **Security:** bcrypt, OTP verification, token revocation system
- **Email Service:** Event-driven email notifications
- **Deployment:** Render

---

## 🔗 Links

- 💻 GitHub: https://github.com/lujainIbrahem/shefaa_app
- 📮 API Docs: https://documenter.getpostman.com/view/44975525/2sBXiri8MS
- 🚀 Live API: https://shefaa-app.onrender.com

---

# 🔐 Authentication System

## Features

- Email & Password Registration
- Google OAuth Login
- Email Verification (OTP)
- Forgot / Reset Password
- Refresh Token System
- Logout (Single Device / All Devices)
- JWT-based Authentication

---

## 🔑 Token System

- Access Token (short-lived: 15m)
- Refresh Token (long-lived: 1 year)
- Role-based secret keys per user type

---

## ⛔ Token Revocation System

Instead of traditional sessions, the system uses:

> JWT + Server-side blacklist (MongoDB)

### How it works:

- On logout → token is stored in `revokedToken` collection
- Every request checks if token is revoked
- Expired revoked tokens are automatically removed using MongoDB TTL index

---

# 👥 User Roles (RBAC)

## 👨‍⚕️ Doctor
- Manage profile
- Create available time slots
- View patients
- Manage appointments

## 🧑 Patient
- Book appointments
- View medical history
- Update profile

## 👨‍👩‍👧 Companion
- Assist patients
- Book appointments on behalf of patients
- Access assigned patient data

---

# 📅 Appointment System

## Workflow

Doctor creates available slots
↓
Slots are divided into 30-minute intervals
↓
Patient selects available slot
↓
System validates availability
↓
Appointment is created
↓
Slot is marked as booked

---

## Features

- Prevent duplicate bookings
- Slot availability validation
- Doctor-based scheduling
- Patient booking restrictions
- One appointment per doctor per day rule

---

# ⏰ Available Time System

## Features

- Doctor-defined schedule
- Automatic 30-minute slot generation
- Duplicate slot prevention
- Past date restriction
- Booking status tracking

---

## Logic

- Doctor provides start & end time
- System generates time slots automatically
- Each slot stored as independent document
- Each slot has `isBooked` status

---

# 👤 Profile Management System

## Features

- Get own profile
- Update profile data
- Secure password change
- Email update with OTP re-verification
- Role-based profile access

---

## Access Control

- Doctors can access their patients
- Companions can access linked patients
- Patients restricted to their own data
- Resource-level authorization enforced

---

# 📧 OTP System

## Features

- Email verification OTP
- Password reset OTP
- Secure OTP hashing
- Auto-expiration (5 minutes)
- Auto deletion after use

---

# 🔄 Authentication Flow

User Login / Google OAuth
↓
JWT Access + Refresh Token generated
↓
User accesses protected routes
↓
Each request validates:
- Token validity
- Token expiration
- Token revocation status

---

# 🔐 Security Implementation

## Password Security
- bcrypt hashing before storing passwords

## Token Security
- JWT signed per role
- Token revocation blacklist
- TTL-based cleanup for revoked tokens

## Access Control
- Role-Based Access Control (RBAC)
- Resource-level authorization (doctor/patient ownership checks)

---

# ⚙️ MongoDB Features Used

- TTL Index (OTP expiration + revoked tokens cleanup)
- Compound filtering
- ObjectId relationships
- Schema population
- Unique constraints

---

# 📅 Appointment Flow

Doctor creates slots
↓
System generates 30-min intervals
↓
Patient requests booking
↓
System validates:
- Slot exists
- Slot not booked
- No duplicate appointment
↓
Appointment created
↓
Slot marked as booked

---

# 🚪 Logout System

## Single Device Logout
- Stores tokenId in revoked collection
- Token becomes invalid immediately

## Logout from All Devices
- Updates user credentials timestamp
- Invalidates all previous tokens

---

# 🧠 Key System Design Concepts

- Stateless Authentication (JWT)
- Server-side token revocation (Blacklist system)
- Role-based access control (RBAC)
- Resource ownership validation
- Event-driven OTP system
- Scalable modular architecture

---

# 📦 Installation

git clone https://github.com/lujainIbrahem/shefaa_app.git
cd shefaa_app
npm install
npm run start:dev

---

# ⚙️ Environment Variables

PORT=
MONGO_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

ACCESS_TOKEN_DOCTOR=
ACCESS_TOKEN_PATIENT=
ACCESS_TOKEN_COMPANION=

REFRESH_TOKEN_DOCTOR=
REFRESH_TOKEN_PATIENT=
REFRESH_TOKEN_COMPANION=

BREVO_API_KEY=
SALT_ROUND=
FRONT_ORIGIN=

---

# 🚀 Future Improvements

- Swagger API Documentation
- Dockerization
- Unit & Integration Testing
- Payment Integration
- Push Notifications
- Real-time appointment updates (WebSockets)

---

# 👩‍💻 Author

**Lujain Ibrahim**
Backend Developer | NestJS Developer

GitHub: https://github.com/lujainIbrahem

---

# 📄 License

Educational and portfolio project.