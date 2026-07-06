# Todo List Application

A full-stack todo list application built with **Spring Boot** (backend) and **Next.js** (frontend).

## Project Structure

```
todo-app-backend/    # Spring Boot REST API
todo-app-frontend/   # Next.js client application
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
- **Next.js 15+ (App Router)**
- **React 18**
- **next-intl** (Internationalization & Multi-language support)
- **react-hot-toast** (Toast notifications)
- **Axios** (HTTP Client)
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
   cd todo-app-backend
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
   cd todo-app-frontend
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

- **CRUD Operations**: Create, read, update (in-place inline editing), and delete todo items.
- **Internationalization (i18n)**: Multi-language support (English and Turkish) using `next-intl` with language toggle.
- **Toast Notifications**: Interactive status notifications using `react-hot-toast` for CRUD actions.
- **Responsive Layout**: Fluid UI optimized for all devices with maximum viewport height safety checks.
- **Sleek Table UI**: Custom scrollbar styling, sticky table headers, and layout shift prevention using `scrollbar-gutter`.
- **RESTful API**: Validated endpoints documented via Swagger UI.