# 🏥 Shefaa Medical Appointment System API

A secure and scalable healthcare appointment management system built with **NestJS**, **MongoDB**, **JWT Authentication**, **Google OAuth**, and **Role-Based Access Control (RBAC)**.

The system allows doctors to manage their schedules, patients to book appointments, and companions to assist patients while maintaining a secure and efficient healthcare workflow.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)

---

## 🔗 Links

* 💻 GitHub Repository: https://github.com/lujainIbrahem/shefaa_app
* 📮 Postman Documentation: https://documenter.getpostman.com/view/44975525/2sBXiri8MS

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT Authentication
* Access Token & Refresh Token
* Google OAuth Login
* OTP Verification
* Forgot Password & Reset Password
* Role-Based Authorization (Doctor / Patient / Companion)
* Password Hashing using bcrypt
* Session Validation
* Token Revocation System

---

### 👥 User Roles

#### 👨‍⚕️ Doctor

* Complete Doctor Profile
* Create Available Time Slots
* Manage Schedule
* View Appointments
* Set Consultation Price

#### 🧑 Patient

* Complete Patient Profile
* Book Appointments
* View Appointment History
* Manage Medical Information

#### 👨‍👩‍👧 Companion

* Complete Companion Profile
* Assist Patients
* Manage Related Information

---

### 📅 Appointment Management

* Create Available Time Slots
* Appointment Booking
* Prevent Duplicate Appointments
* Validate Doctor Availability
* Booking Status Management
* Time Validation

---

### 📧 Email Services

* Email Confirmation
* Forgot Password OTP
* HTML Email Templates
* Event-Driven Email Handling
* Brevo Integration

---

## 🛠 Tech Stack

### Backend

* NestJS
* Node.js
* TypeScript

### Database

* MongoDB
* Mongoose ODM

### Authentication

* JWT
* Google OAuth

### Security

* bcrypt
* Crypto UUID
* Environment Variables

### Email Service

* Brevo
* EventEmitter

---

## 🗄 Database Models

### User

Main collection that stores all users.

**Common Fields**

* First Name
* Last Name
* Email
* Password
* Gender
* Address
* Phone
* Role
* Provider
* Profile Status

**Doctor Fields**

* Specialization
* Consultation Price

**Patient Fields**

* Blood Type
* Disease
* Age
* Current Medication
* Assigned Doctor

**Companion Fields**

* Patient Relationship
* Experience Level

---

### OTP

Used for:

* Email Verification
* Password Reset

Features:

* OTP Hashing
* Expiration Validation
* Automatic Deletion Using TTL Index

---

### Revoked Token

Used for:

* Secure Logout
* Session Revocation
* Automatic Expiration Using TTL Index

---

### Available Time

Stores doctor availability slots.

Features:

* Schedule Management
* Booking Status Tracking
* Duplicate Slot Prevention

---

### Appointment

Stores booked appointments.

Features:

* Appointment Status Management
* Duplicate Appointment Prevention
* Doctor Availability Validation

---

## 🔐 Security Implementation

### Password Security

Passwords are hashed using bcrypt before being stored in the database.

```ts
await bcrypt.hash(password, saltRounds)
```

### JWT Authentication

The system generates:

* Access Token
* Refresh Token

Each protected endpoint validates the user's token before granting access.

### Google Authentication

Users can authenticate using Google OAuth.

The backend verifies the received Google ID Token before creating or authenticating the account.

### OTP Verification

OTP codes are:

* Generated securely
* Hashed before storage
* Automatically deleted after expiration

---

## ⚡ Database Optimization

### MongoDB Indexes

#### OTP TTL Index

Automatically removes expired OTP records.

#### Revoked Token TTL Index

Automatically removes expired revoked sessions.

#### Available Time Unique Index

Prevents duplicate doctor slots.

#### Appointment Compound Index

Prevents duplicate confirmed appointments.

---

## 🔄 Authentication Flow

```text
User Login
     ↓
Email/Password OR Google OAuth
     ↓
Validate Credentials
     ↓
Generate Access Token
     ↓
Generate Refresh Token
     ↓
Verify User Role
     ↓
Access Protected APIs
```

---

## 🏗 Project Structure

```text
src
├── common
├── module
│   ├── auth
│   ├── user
│   ├── profile
│   ├── appointment
│   └── availableTime
├── seedData
├── config
└── app.module.ts
```

---

## 📦 Installation

```bash
git clone https://github.com/lujainIbrahem/shefaa_app.git

cd shefaa_app

npm install

npm run start:dev
```

---

## ⚙ Environment Variables

```env
PORT=

MONGO_URL=
MONGO_URL_ONLINE=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

ACCESS_TOKEN_PATIENT=
ACCESS_TOKEN_DOCTOR=
ACCESS_TOKEN_COMPANION=

REFRESH_TOKEN_PATIENT=
REFRESH_TOKEN_DOCTOR=
REFRESH_TOKEN_COMPANION=

BREVO_API_KEY=

SALT_ROUND=

FRONT_ORIGIN=
```

---

## 📌 Main Modules

### Auth Module

* Register
* Login
* Google Login
* Refresh Token
* Verify Email
* Forgot Password
* Reset Password

### Profile Module

* Complete Profile
* Update Profile
* View Profile

### Available Time Module

* Create Slots
* Manage Doctor Availability

### Appointment Module

* Book Appointment
* Validate Booking
* Manage Appointments

---

## 🎯 Key Concepts Implemented

* RESTful API Design
* Authentication & Authorization
* JWT Security
* Google OAuth Integration
* MongoDB Relationships
* OTP Verification
* Session Management
* Token Revocation
* Event-Driven Architecture
* RBAC (Role-Based Access Control)
* Clean & Scalable Architecture

---

## 🚀 Future Improvements

* Swagger Documentation
* Docker Support
* Unit Testing
* Integration Testing
* Push Notifications
* Online Consultation Support
* Payment Gateway Integration

---

## 👩‍💻 Author

**Lujain Ibrahim**

Backend Developer | NestJS Developer

GitHub:
https://github.com/lujainIbrahem

---

## 📄 License

This project is intended for educational, portfolio, and learning purposes.
