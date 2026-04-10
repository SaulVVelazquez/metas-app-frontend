# Metas App - Frontend

Aplicación frontend desarrollada con React para la gestión de metas personales. Permite autenticación de usuarios, administración de metas y visualización del progreso mediante una interfaz responsiva conectada a una API REST.

---

## Descripción

Esta aplicación permite a los usuarios:

* Registrarse y autenticarse (login)
* Crear metas personales
* Consultar listado de metas
* Actualizar metas
* Eliminar metas
* Filtrar metas por estado (pendiente, en progreso, completado)
* Visualizar progreso de metas
* Definir fechas de inicio y fecha límite
* Vista de administrador para visualizar el dueño de cada meta

---

## Tecnologías utilizadas

* React.js
* Axios
* Bootstrap 5
* HTML5 / CSS3
* JavaScript

---

## Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/SaulVVelazquez/metas-app-frontend.git
cd metas-app-frontend

### 2. Instalar dependencias

```bash
npm install
### 3. Configurar API

Ubicar el archivo:

```bash
src/services/api.js
Configurar la URL base del backend:

```javascript
const API_URL = "http://localhost:8000";
### 4. Ejecutar aplicación

```bash
npm start
---

## Acceso

Aplicación disponible en:
http://localhost:3000
---

---

## Estructura del proyecto

Componentes principales:

* `Login / Register`  
  Manejo de autenticación de usuarios

* `MetaList`  
  Listado de metas con filtros y visualización

* `MetaForm`  
  Creación y edición de metas

* `App.js`  
  Componente principal, manejo de rutas y estado global básico

---

## Autenticación y Roles

La aplicación maneja autenticación básica utilizando `localStorage`.

Se almacenan:

* `user_id`
* `rol`

Estos valores se envían en cada petición HTTP mediante headers personalizados.

### Tabla de permisos:

| Rol   | Permisos                              |
|-------|---------------------------------------|
| User  | CRUD de sus propias metas             |
| Admin | CRUD de todas las metas + ver dueño   |

---

## Archivo de configuración de API

El archivo encargado de la comunicación con el backend es:

```bash
src/services/api.js

Se utiliza Axios para las peticiones HTTP.

Ejemplo de configuración:
import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
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

Características
Interfaz responsiva con Bootstrap 5
Uso de React Hooks (useState, useEffect)
Comunicación asíncrona con Axios
Manejo de estado en componentes funcionales
Integración con API REST externa
 Mejoras futuras
Implementación de Context API para manejo global de estado
Rutas privadas (Protected Routes)
Notificaciones tipo toast para feedback al usuario
📌 Notas

Este frontend está diseñado para integrarse con la API:

Metas API (FastAPI) ejecutándose en:
http://localhost:8000

Es necesario que el backend esté corriendo para el correcto funcionamiento de la aplicación