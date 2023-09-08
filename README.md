# REST API with Express.js, PostgreSQL, JWT Authentication

This is a RESTful API project that provides user registration, login, and profile access functionality using Express.js, PostgreSQL for database storage, JWT (JSON Web Token) for authentication, and bcrypt for password hashing.

## Features

- User registration with email, name, gender, and password
- User login with email and password
- JWT authentication for protected routes
- Fetch user profile data


## Directory

```dir
├── app
│   ├── controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   ├── models
│   │   ├── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
├── config
│   ├── db.js
│   ├── jwt.js
├── middleware
│   ├── authMiddleware.js
├── index.js
```


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL database server running and accessible.

## Quick Start
1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammadFauziHanif/widya_knowledge_test.git
   ```

2. Navigate to the project directory:

   ```bash
   cd widya_knowledge_test
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammadFauziHanif/widya_knowledge_test.git
   ```

2. Navigate to the project directory:

   ```bash
   cd widya_knowledge_test
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Set up your PostgreSQL database and configure the database connection in `config/config.json` and `.env`.

   > Note: The `.env` file and `config/config.json` are provided for ease of use in development.

5. Create the database tables by running migrations (if using Sequelize):

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Start the server:

   ```bash
   npm start
   ```

## Online Deployment
https://widya-private-production.up.railway.app

## Usage

- Register a new user: POST `/auth/register`
- Login with a registered user: POST `/auth/login`
- Access user profile (protected route): GET `/user/profile` (Include JWT token in the Authorization header with the "Bearer" scheme)

## API Documentation

For detailed API documentation, refer to the [API Documentation](docs/api-documentation.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
