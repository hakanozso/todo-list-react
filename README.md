# Todo List Application

A full-stack todo list application built with **Spring Boot** (backend) and **Next.js** (frontend).

## Project Structure

```
todo-list-backend/    # Spring Boot REST API
todo-list-frontend/   # Next.js client application
```

## Technologies Used

### Backend
- **Java 17**
- **Spring Boot 3.3.4**
- Spring Data JPA
- Spring Validation
- SpringDoc OpenAPI (Swagger UI)
- MySQL / PostgreSQL
- Lombok
- Maven

### Frontend
- **Next.js**
- **React**
- ESLint

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- Maven
- MySQL or PostgreSQL

### Backend

1. Navigate to the backend directory:
   ```bash
   cd todo-list-backend
   ```

2. Configure your database connection in `src/main/resources/application.properties` (or `application.yml`).

3. Build and run:
   ```bash
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`.

   Swagger UI: `http://localhost:8080/swagger-ui.html`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd todo-list-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Create, read, update, and delete todo items
- RESTful API with validation
- Interactive API documentation via Swagger UI
- Responsive frontend built with Next.js