# Metas App - Frontend

Aplicación frontend desarrollada con React para la gestión de metas personales. Permite autenticación de usuarios, administración de metas y visualización del progreso mediante una interfaz responsiva conectada a una API REST.

---

## Descripción

Esta aplicación permite a los usuarios:

- Registrarse y autenticarse (login)
- Crear, consultar, actualizar y eliminar metas personales
- Filtrar metas por estado (pendiente, en progreso, completado)
- Visualizar progreso con fechas de inicio y límite
- Vista de administrador para gestionar todas las metas

---

## Tecnologías utilizadas

- React.js
- Axios
- Bootstrap 5
- HTML5 / CSS3
- JavaScript

---

## Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/SaulVVelazquez/metas-app-frontend.git
cd metas-app-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar API

Editar `src/services/api.js` y configurar la URL base:

```javascript
const API_URL = "http://localhost:8000";
```

### 4. Ejecutar aplicación

```bash
npm start
```

Acceso: http://localhost:3000

---

## Estructura del proyecto

| Componente | Función |
|-----------|---------|
| `Login / Register` | Autenticación de usuarios |
| `MetaList` | Listado con filtros |
| `MetaForm` | Crear y editar metas |
| `App.js` | Rutas y estado global |

---

## Autenticación y Roles

Usa `localStorage` para almacenar:
- `user_id`
- `rol`

| Rol | Permisos |
|-----|----------|
| User | CRUD propias metas |
| Admin | CRUD todas + ver dueño |

---

## API Configuration

Axios interceptor añade headers automáticamente:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem("user_id");
    const rol = localStorage.getItem("rol");
    if (userId && rol) {
        config.headers["x-user-id"] = userId;
        config.headers["x-rol"] = rol;
    }
    return config;
});

export default api;
```

---

## Características

- Interfaz responsiva con Bootstrap 5
- React Hooks (useState, useEffect)
- Comunicación asíncrona con Axios
- Integración API REST

---

## Mejoras futuras

- Context API para estado global
- Rutas protegidas
- Notificaciones toast
- Validación mejorada

---

## Notas

 Requiere que la API (FastAPI) esté ejecutando en `http://localhost:8000`
