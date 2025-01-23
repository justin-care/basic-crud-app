# Full-Stack Task Management Application (CORS-Protected Version)

This project is a full-stack task management application built with a **React** frontend and a **Go** backend. This version includes CORS protection, restricting backend access to requests originating from the deployed frontend domain (`https://your-frontend.vercel.app`).

---

## **Features**
### Backend:
- CRUD operations (Create, Read, Update, Delete) for task management.
- RESTful API design for easy integration.
- **CORS Protection**: Only requests from authorized domains are allowed.

### Frontend:
- Dynamic task management UI with React.
- Real-time updates for adding, updating, and deleting tasks.
- Toast notifications for user feedback.
- Responsive design with TailwindCSS.

---

## **Security**
### Backend Protection with CORS
The backend is protected with Cross-Origin Resource Sharing (CORS) to ensure only requests from the authorized frontend domain can interact with the API.

- **Allowed Origins**: Only requests from `https://your-frontend.vercel.app` are permitted.
- **Allowed Methods**: `GET`, `POST`, `PUT`, and `DELETE`.
- **Allowed Headers**: `Content-Type`.
- **Allow Credentials**: Enabled for secure client-server communication.

---

## **Installation and Setup**
### Additional Notes for CORS Version
- The backend now uses CORS to restrict access to requests originating from the frontend's production domain (`https://your-frontend.vercel.app`).
- When testing locally, make sure the frontend is running on `http://localhost:5173`, or update the backend's CORS configuration to allow `http://localhost:5173` as an origin for development.

To temporarily allow local testing, modify the backend's CORS options in `main.go`:
```go
AllowedOrigins: []string{"http://localhost:5173", "https://your-frontend.vercel.app"},
```

---

## **Testing**
### Backend (CORS-Specific Notes)
When testing the backend with tools like Postman or cURL, CORS restrictions do not apply. However, requests from unauthorized domains in the browser will be blocked unless explicitly allowed in the backend configuration.

---

## **Branch-Specific Notes**
### CORS-Protected Version
This branch includes CORS protection on the backend to restrict access to authorized domains. If you need an unrestricted version for testing or other purposes, refer to the `main` branch.
