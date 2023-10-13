# ToDo Application Assignment

## Description
This is an Express application written in TypeScript. It provides a RESTful API for a To-Do List application.The application uses JWT for authentication and Sequelize ORM for database operations.

## Key Features
- User authentication using JWT
- CRUD operations for To-Do List items
- Modular routing using Express Router
- Database operations using Sequelize ORM
- Error handling using Express middleware
- Unit testing using Jest

## Installation
- Clone the repository
- Run `npm install` to install dependencies
- Rename `.env.example` to `.env` and update the values
- Update the same in jestSetup.js file
- Run `npm run test` to run the unit tests
- Run `npm run dev` to start the application in development mode
- Run `npm run build` to build the application
- Run `npm start` to start the application in production mode

## API Documentation
- This API provides endpoints for managing users and their to-do items.
- Postman collection link: [here](https://documenter.getpostman.com/view/30494926/2s9YR56aWw)

## User Routes

### 1. Login

- **Endpoint**: `/users/login`
- **Method**: `POST`
- **Body**:

```json
{
    "email": "test@email.com",
    "password": "password123"
}
```

### 2. Register

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Body**:

```json
{
    "email": "tgoyal63@gmail.com",
    "username": "tgoyal63",
    "password": "tgoyal63"
}
```

### 3. Profile

- **Endpoint**: `/users/profile`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`

## Todo Routes

### 1. Create Todo

- **Endpoint**: `/todos`
- **Method**: `POST`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`
- **Body**:

```json
{
    "title": "Design DB",
    "description": "Design the database architecture for the todo application",
    "completed": true
}
```

### 2. Get All Todos

- **Endpoint**: `/todos`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`

### 3. Get Todo By Id

- **Endpoint**: `/todos/:id`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`

### 4. Update Todo By Id

- **Endpoint**: `/todos/:id`
- **Method**: `PUT`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`
- **Body**:

```json
{
    "title": "New Title",
    "completed": true
}
```

### 5. Delete Todo By Id

- **Endpoint**: `/todos/:id`
- **Method**: `DELETE`
- **Headers**:
  - **Authorization**: `Bearer YOUR_TOKEN`

---

**Note**: Replace `YOUR_TOKEN` with the actual token you receive after logging in or registering.

## Author
- [Tushar Goyal](https://linkedin.com/in/tgoyal63)

