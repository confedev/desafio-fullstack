# 🚀 Execution Instructions - Fullstack Challenge

### [Versión en Español](INSTRUCTIONS_ES.md)

## 📋 Description

This project is a fullstack challenge that includes:
- **Backend**: RESTful API developed with Java 17, Spring Boot 3.4.2, and Maven
- **Frontend**: User interface developed with React 18 and Vite
- **Database**: H2 (in-memory)

The project allows managing a complete user CRUD with create, read, update, and delete operations.

---

## 🐳 Option 1: Run with Docker Compose

This is the simplest way to run the project. You only need to have Docker and Docker Compose installed.

### Prerequisites:
- ✅ Docker installed
- ✅ Docker Compose installed

### Steps:

1. **Navigate to the project root directory:**
   ```bash
   cd desafio-fullstack
   ```

2. **Run the command to build and start the services:**
   ```bash
   docker-compose up --build
   ```

3. **Wait for the services to be ready** (you will see messages that both services are active)

4. **Done! The services will be available at:**
   - 🖥️ **Frontend**: http://localhost:5173
   - 🔌 **Backend API**: http://localhost:8080

### Useful commands:

- **Stop the services:**
  ```bash
  docker-compose down
  ```

- **View logs in real time:**
  ```bash
  docker-compose logs -f
  ```

- **Rebuild without cache:**
  ```bash
  docker-compose up --build --no-cache
  ```

---

## 🛠️ Option 2: Run with Maven and npm (Local)

If you prefer to run the project locally without Docker, follow these steps.

### Prerequisites:
- ✅ Java 17 installed
- ✅ Maven 3.6+ installed
- ✅ Node.js 20+ installed
- ✅ npm installed

### Steps:

#### 2.1 Start the Backend (Spring Boot)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Run Maven to build and start the application:**
   ```bash
   mvn clean spring-boot:run
   ```

3. **Wait until you see the message:**
   ```
   Started [application name] in X seconds
   ```

4. **The backend will be available at:** 🔌 http://localhost:8080

#### 2.2 Start the Frontend (React with Vite)

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Wait until you see the message indicating the server is running**

5. **The frontend will be available at:** 🖥️ http://localhost:5173

---

## 📍 Service URLs

Once the project is running (with either option), you will have access to:

| Service | URL | Description |
|---------|-----|-------------|
| 🖥️ **Frontend** | http://localhost:5173 | React user interface to manage users |
| 🔌 **Backend API** | http://localhost:8080 | RESTful API for user CRUD operations |
| 📚 **API Docs** | http://localhost:8080/swagger-ui.html | Interactive API documentation (if configured) |

---

## 🔧 Troubleshooting

### With Docker:
- **Port already in use**: Verify that ports 8080 and 5173 are available
- **Permission issues**: Ensure you have permissions to run Docker

### Locally:
- **Maven cannot find JDK**: Verify Java 17 is installed correctly
- **Port 8080 in use**: Change the port in the backend's `application.properties`
- **npm install fails**: Delete `node_modules` and `package-lock.json`, then try again

---

## 📝 Important Notes

- The H2 database runs in-memory, so data will be lost when the service is restarted
- For development, Option 2 (local) is recommended for faster restarts
- For deployment, Option 1 (Docker) is recommended

---