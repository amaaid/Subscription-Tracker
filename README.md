# Subscription Tracker

## Overview
The Subscription Tracker is a web application designed to help users manage their subscriptions efficiently. It allows users to create, update, and delete subscriptions, track upcoming renewals, and receive email reminders for subscription renewals. The application is built using Node.js, Express, and MongoDB.

## Features
- User authentication and authorization.
- Create, update, and delete subscriptions.
- Track subscription details and renewal dates.
- Receive email reminders for upcoming renewals.
- Middleware for error handling and security.

## Project Structure
The project is organized into the following directories:
- **config/**: Configuration files for environment variables, email, and external services.
- **controllers/**: Logic for handling API requests.
- **database/**: Database connection setup.
- **middlewares/**: Middleware for authentication, error handling, and security.
- **models/**: Mongoose schemas for MongoDB collections.
- **routes/**: API route definitions.
- **utils/**: Utility functions for email templates and sending emails.

## How It Works
1. **User Authentication**: Users can sign up, log in, and manage their accounts securely.
2. **Subscription Management**: Users can add subscriptions with details like name, price, frequency, and renewal date.
3. **Renewal Tracking**: The system calculates renewal dates based on the subscription frequency and sends reminders via email.
4. **Email Notifications**: Email reminders are sent to users before their subscriptions renew.

## Environment Variables
The application requires the following environment variables to be set in a `.env.<environment>.local` file:

### Development Environment (`.env.development.local`)
```env
# Server Configuration
PORT=5500
SERVER_URL="http://localhost:5500"

# Environment
NODE_ENV='development'

# Database
DB_URI="<Your MongoDB URI>"

# JWT Authentication
JWT_SECRET="<Your JWT Secret>"
JWT_EXPIRES_IN="2d" //Change according to your preference

# Arcjet Configuration
ARCJET_KEY="<Your Arcjet Key>"
ARCJET_ENV="development"

# Upstash Configuration
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN="<Your Upstash Token>"

# Nodemailer Configuration
EMAIL_PASSWORD="<Your Email Password>"
EMAIL_USE="<Your Email Address>"
```

### Production Environment (`.env.production.local`)
```env
# Environment
NODE_ENV='production'

# Upstash Configuration
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="<Your Upstash Token>"
QSTASH_CURRENT_SIGNING_KEY="<Your Current Signing Key>"
QSTASH_NEXT_SIGNING_KEY="<Your Next Signing Key>"
```

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/amaaid/Subscription-Tracker.git
   cd Subscription-Tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.development.local` and `.env.production.local`.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:5500`.

## Scripts
- `npm start`: Start the application in production mode.
- `npm run dev`: Start the application in development mode with hot-reloading.

## Dependencies
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **Mongoose**: MongoDB object modeling.
- **Nodemailer**: Email sending.
- **JWT**: Authentication.
- **Day.js**: Date manipulation.
- **Arcjet**: Workflow automation.
