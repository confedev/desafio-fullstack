# 🚀 Instrucciones de Ejecución - Desafío Fullstack

### English version: [INSTRUCTIONS.md](INSTRUCTIONS.md)

## 📋 Descripción

Este proyecto es un desafío fullstack que incluye:
- **Backend**: API RESTful desarrollada con Java 17, Spring Boot 3.4.2 y Maven
- **Frontend**: Interfaz de usuario desarrollada con React 18 y Vite
- **Base de Datos**: H2 (en memoria)

El proyecto permite gestionar un CRUD completo de usuarios con operaciones de crear, leer, actualizar y eliminar.

---

## 🐳 Opción 1: Levantar con Docker Compose

Esta es la forma más sencilla de ejecutar el proyecto. Solo necesitas tener instalado Docker y Docker Compose.

### Requisitos previos:
- ✅ Docker instalado
- ✅ Docker Compose instalado

### Pasos:

1. **Navega al directorio raíz del proyecto:**
   ```bash
   cd desafio-fullstack
   ```

2. **Ejecuta el comando para construir y levantar los servicios:**
   ```bash
   docker-compose up --build
   ```

3. **Espera a que los servicios estén listos** (verás mensajes de que ambos servicios están activos)

4. **¡Listo! Los servicios estarán disponibles en:**
   - 🖥️ **Frontend**: http://localhost:5173
   - 🔌 **Backend API**: http://localhost:8080

### Comandos útiles:

- **Detener los servicios:**
  ```bash
  docker-compose down
  ```

- **Ver los logs en tiempo real:**
  ```bash
  docker-compose logs -f
  ```

- **Reconstruir sin cache:**
  ```bash
  docker-compose up --build --no-cache
  ```

---

## 🛠️ Opción 2: Levantar con Maven y npm (Local)

Si prefieres ejecutar el proyecto localmente sin Docker, sigue estos pasos.

### Requisitos previos:
- ✅ Java 17 instalado
- ✅ Maven 3.6+ instalado
- ✅ Node.js 20+ instalado
- ✅ npm instalado

### Pasos:

#### 2.1 Levantar el Backend (Spring Boot)

1. **Navega al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Ejecuta Maven para construir y levantar la aplicación:**
   ```bash
   mvn clean spring-boot:run
   ```

3. **Espera hasta ver el mensaje:**
   ```
   Started [nombre de la aplicación] in X seconds
   ```

4. **El backend estará disponible en:** 🔌 http://localhost:8080

#### 2.2 Levantar el Frontend (React con Vite)

1. **Abre una nueva terminal y navega al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Espera hasta ver el mensaje indicando que el servidor está corriendo**

5. **El frontend estará disponible en:** 🖥️ http://localhost:5173

---

## 📍 URLs de los Servicios

Una vez levantado el proyecto (con cualquiera de las dos opciones), tendrás acceso a:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🖥️ **Frontend** | http://localhost:5173 | Interfaz de usuario React para gestionar usuarios |
| 🔌 **Backend API** | http://localhost:8080 | API RESTful para operaciones CRUD de usuarios |
| 📚 **API Docs** | http://localhost:8080/swagger-ui.html | Documentación interactiva de la API (si está configurada) |

---

## 🔧 Troubleshooting

### Con Docker:
- **Puerto ya en uso**: Verifica que los puertos 8080 y 5173 estén disponibles
- **Problema de permisos**: Asegúrate de tener permisos para ejecutar Docker

### Localmente:
- **Maven no encuentra el JDK**: Verifica que Java 17 esté instalado correctamente
- **Puerto 8080 en uso**: Cambia el puerto en `application.properties` del backend
- **npm install falla**: Elimina `node_modules` y `package-lock.json`, luego intenta nuevamente

---

## 📝 Notas importantes

- La base de datos H2 se ejecuta en memoria, por lo que los datos se perderán al reiniciar el servicio
- Para desarrollo, se recomienda usar la Opción 2 (local) por la velocidad de reinicio
- Para despliegue, se recomienda usar la Opción 1 (Docker)

---