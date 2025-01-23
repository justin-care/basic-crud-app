# Full-Stack Task Management Application

This project is a full-stack task management application built with a **React** frontend and a **Go** backend. It provides a seamless interface for managing tasks with features such as adding, updating, completing, and deleting tasks.

---

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Limitations](#limitations)
8. [Future Enhancements](#future-enhancements)

---

## **Overview**
This application consists of:

1. **Frontend**: A React app built with Vite for rapid development and deployment.
2. **Backend**: A Go-based REST API with an in-memory database for managing tasks.

The frontend and backend work together to provide a dynamic and user-friendly task management experience.

---

## **Features**
### Backend:
- CRUD operations (Create, Read, Update, Delete) for task management.
- RESTful API design for easy integration.
- In-memory database for rapid prototyping and development.

### Frontend:
- Dynamic task management UI with React.
- Real-time updates for adding, updating, and deleting tasks.
- Toast notifications for user feedback.
- Responsive design with TailwindCSS.

---

## **Technologies Used**
### Backend:
- **Go**: Backend programming language.
- **REST API**: For communication with the frontend.

### Frontend:
- **React**: Library for building user interfaces.
- **Vite**: Fast development environment for React apps.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Flowbite-React**: Prebuilt UI components for React.

---

## **Installation and Setup**

### Prerequisites:
- **Node.js** and **npm** installed.
- **Go** installed on your system.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/justin-care/basic-crud-app.git
   cd basic-crud-app
   ```

2. Install and run the backend:
   ```bash
   cd backend
   go run main.go
   ```
   The backend will start on `http://localhost:8080`.

3. Install and run the frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Access the frontend at `http://localhost:5173`.

---

## **API Endpoints**
### Base URL
```
http://localhost:8080
```

### Endpoints
1. **Get All Tasks**:
   - **GET** `/tasks`
   - **Response**:
     ```json
     [
       {
         "ID": 1,
         "Title": "Sample Task 1",
         "Done": false
       },
       {
         "ID": 2,
         "Title": "Sample Task 2",
         "Done": false
       }
     ]
     ```

2. **Add a Task**:
   - **POST** `/tasks`
   - **Request Body**:
     ```json
     {
       "Title": "New Task"
     }
     ```
   - **Response**:
     ```json
     {
       "ID": 11,
       "Title": "New Task",
       "Done": false
     }
     ```

3. **Update a Task**:
   - **PUT** `/tasks`
   - **Request Body**:
     ```json
     {
       "ID": 1,
       "Done": true
     }
     ```
   - **Response**:
     ```json
     {
       "ID": 1,
       "Title": "Sample Task 1",
       "Done": true
     }
     ```

4. **Delete a Task**:
   - **DELETE** `/tasks?id={task_id}`
   - **Response**:
     ```json
     {
       "message": "Task deleted successfully."
     }
     ```

---

## **Testing**
### Backend:
Use tools like **Postman** or **cURL** to test API endpoints. Example commands:

- **Get Tasks**:
  ```bash
  curl -X GET http://localhost:8080/tasks
  ```
- **Add Task**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"Title":"New Task"}' http://localhost:8080/tasks
  ```
- **Update Task**:
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"ID":1,"Done":true}' http://localhost:8080/tasks
  ```
- **Delete Task**:
  ```bash
  curl -X DELETE http://localhost:8080/tasks?id=1
  ```

### Frontend:
1. Run the React app.
2. Interact with the UI to add, update, and delete tasks.
3. Verify that changes are reflected in the task lists.

---

## **Limitations**
- **In-Memory Storage**: Data is not persisted and will reset on server restart. Suitable for development and testing but not for production.
