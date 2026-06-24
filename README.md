# 🏥 Shefaa Medical Appointment System API

A secure and scalable healthcare appointment management system built with **NestJS**, **MongoDB**, **JWT Authentication**, **Google OAuth**, and **Role-Based Access Control (RBAC)**.

The platform enables doctors to manage their schedules, patients to book appointments, and companions to assist patients while maintaining a secure and efficient healthcare workflow.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)

---

## 🔗 Links

* 💻 GitHub Repository: https://github.com/lujainIbrahem/shefaa_app
* 📮 Postman Documentation: https://documenter.getpostman.com/view/44975525/2sBXiri8MS
* 🚀 Live API: https://shefaa-app.onrender.com

---

## 📖 Overview

Shefaa is a healthcare appointment management system that connects doctors, patients, and companions through a secure RESTful API.

The system provides:

* Secure Authentication & Authorization
* Google OAuth Authentication
* OTP Verification System
* Appointment Scheduling
* Doctor Availability Management
* Session Management
* Multi-Role Access Control

---

## 🚀 Features

### 🔐 Authentication & Security

* Register with Email & Password
* Login with Email & Password
* Google OAuth Authentication
* Email Verification via OTP
* Resend OTP
* Forgot Password
* Reset Password
* Update Password
* JWT Authentication
* Access Token & Refresh Token Strategy
* Session Validation
* Token Revocation System
* Logout From Current Device
* Logout From All Devices
* Password Hashing using bcrypt

---

### 🌐 Google Authentication

* Google Sign-In using Google ID Token
* Automatic Account Creation
* JWT Token Generation
* Role Assignment During Registration
* Prevent Login Method Conflicts
* Profile Completion Workflow

---

### 👥 User Roles

#### 👨‍⚕️ Doctor

* Complete Doctor Profile
* Create Available Time Slots
* Manage Schedule
* View Appointments
* View Assigned Patients
* Set Consultation Price

#### 🧑 Patient

* Complete Patient Profile
* Book Appointments
* Cancel Appointments
* View Appointment History
* Manage Medical Information

#### 👨‍👩‍👧 Companion

* Complete Companion Profile
* Book Appointments For Linked Patient
* Cancel Appointments
* View Patient Information
* Manage Related Information

---

### 📅 Appointment Management

* Create Available Time Slots
* Appointment Booking
* Appointment Cancellation
* Booking Validation
* Duplicate Appointment Prevention
* Doctor Availability Validation
* Booking Status Management
* Time Validation
* Past Appointment Protection

---

### 👤 Profile Management

* View Personal Profile
* Update Profile
* Complete Profile Information
* Get Doctor Profile By ID
* Get Patients Assigned To Doctor
* Get Patients Assigned To Companion

---

### 📧 Email Services

* Email Verification
* Forgot Password OTP
* Event-Driven Email Notifications
* Responsive HTML Email Templates
* Brevo Integration

---

## ☁️ Deployment

The application is deployed on Render.

### Deployment Features

* Automatic Deployment from GitHub
* Environment Variables Management
* Cloud Hosting
* Continuous Deployment

### Platform

* Render

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
* crypto
* UUID
* Environment Variables

### Email Services

* Brevo
* EventEmitter

### Deployment

* Render

---

## 🗄 Database Models

### User

Stores all system users.

#### Common Fields

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

#### Doctor Fields

* Specialization
* Consultation Price

#### Patient Fields

* Blood Type
* Disease
* Age
* Current Medication
* Assigned Doctor
* Assigned Companion

#### Companion Fields

* Patient Relationship
* Experience Level
* Assigned Patient

---

### OTP

Used for:

* Email Verification
* Password Reset

Features:

* OTP Hashing
* Expiration Validation
* TTL Index Auto Deletion

---

### Revoked Token

Used for:

* Logout
* Session Revocation

Features:

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

## ⚡ Advanced MongoDB Features

* TTL Index for OTP Expiration
* TTL Index for Revoked Tokens
* Compound Indexes
* Unique Constraints
* Mongoose Virtual Population

---

## 🔐 Security Implementation

### Password Security

Passwords are hashed using bcrypt before storage.

```ts
await bcrypt.hash(password, saltRounds)
```

### JWT Authentication

The system generates:

* Access Token
* Refresh Token

Every protected endpoint validates the token before granting access.

### Google Authentication

Google ID Tokens are verified before authenticating or creating user accounts.

### OTP Verification

OTP codes are:

* Generated Securely
* Hashed Before Storage
* Automatically Deleted After Expiration

### Session Security

* Refresh Token Strategy
* Session Validation
* Token Revocation
* Logout Protection

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

## 📅 Appointment Workflow

```text
Doctor Creates Available Slots
             ↓
Patient Selects Slot
             ↓
Validate Availability
             ↓
Create Appointment
             ↓
Update Slot Status
             ↓
Appointment Confirmed
```

---

## 🏗 Architecture Highlights

* RESTful API Design
* Modular Architecture
* Role-Based Access Control (RBAC)
* Event-Driven Architecture
* Secure Authentication Flow
* Session Management
* Clean Separation of Concerns
* Scalable Project Structure

---

## 📦 Installation

```bash
git clone https://github.com/lujainIbrahem/shefaa_app.git

cd shefaa_app

npm install

npm run start:dev
```

---

## ⚙️ Environment Variables

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

## 🎯 Key Concepts Implemented

* RESTful API Design
* Authentication & Authorization
* JWT Security
* Google OAuth Integration
* OTP Verification
* Session Management
* Token Revocation
* Multi-Role System
* RBAC
* MongoDB Relationships
* MongoDB TTL Indexes
* Event-Driven Email Notifications
* Profile Completion Workflow
* Clean Architecture
* Scalable Backend Design

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
