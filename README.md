# Metas App - Frontend

**Metas APP** Aplicación frontend desarrollada con React para la gestión de metas personalesd esarrollada con **React.js**, esta interfaz consume una API REST robusta para ofrecer una experiencia de usuario fluida, segura y basada en roles.

---

##  Descripción

Esta aplicación permite a los usuarios:

*  **Autenticación Segura**: Registro e inicio de sesión con persistencia de datos.
*  **Gestión de Metas (CRUD)**: Crear, consultar, actualizar y eliminar objetivos con descripción y seguimiento de fechas.
*  **Control de Progreso**: Visualización dinámica del porcentaje de avance y estados:

  * Pendiente
  * En Progreso
  * Completado
*  **Categorización**: Clasificación de metas mediante un sistema relacional (3NF).
*  **Dashboard de Administrador**:

  * Visualización de estadísticas globales
  * Gestión de usuarios registrados
  * Creación dinámica de categorías
##  Tecnologías Utilizadas

* **Core**: React.js (Hooks: `useState`, `useEffect`)
* **Comunicación**: Axios (con interceptores de seguridad)
* **Diseño**: Bootstrap 5 (layout responsivo)
* **Lenguajes**: HTML5 / CSS3 / JavaScript (ES6+)

---

##  Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/SaulVVelazquez/metas-app-frontend.git
cd metas-app-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la conexión con la API

El archivo `src/api.js` está configurado para apuntar a un entorno local.
Asegúrate de que tu API de **FastAPI** esté corriendo en el puerto `8000`.

### 4. Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible en:
👉 http://localhost:3000
##  Estructura del Proyecto

| Componente                        | Función                                                                   |
| --------------------------------- | ------------------------------------------------------------------------- |
| `src/api.js`                      | Cliente Axios centralizado con lógica de headers personalizados           |
| `src/App.js`                      | Orquestador de vistas, manejo de estados globales y lógica de Admin       |
| `src/components/MetaList.js`      | Renderizado de tarjetas de metas con lógica de JOINs (Categoría/Usuario)  |
| `src/components/MetaForm.js`      | Modal inteligente para creación/edición de metas con validación de fechas |
| `src/components/CategoriaForm.js` | Interfaz exclusiva para la creación de nuevas categorías                  |
| `src/Login.js / Register.js`      | Gestión de acceso y validación de usuarios                                |
##  Autenticación y Roles

La aplicación utiliza `localStorage` para persistir la sesión y un interceptor de Axios para inyectar automáticamente la identidad del usuario en los headers de cada petición HTTP:

```javascript
// Ejemplo de inyección de seguridad en api.js
api.interceptors.request.use(config => {
  const userId = localStorage.getItem("user_id");
  const rol = localStorage.getItem("rol");

  if (userId) config.headers['x-user-id'] = userId;
  if (rol) config.headers['x-rol'] = rol;

  return config;
});
```

###  Tabla de Permisos

| Rol       | Capacidades                                                                |
| --------- | -------------------------------------------------------------------------- |
| **User**  | CRUD de metas propias y seguimiento de progreso personal                   |
| **Admin** | CRUD global, gestión de usuarios, creación de categorías y dashboard total |
##  Características Técnicas

*  **Interfaz Responsiva**: Diseño adaptado a móviles y escritorio mediante Bootstrap 5.
*  **Seguridad en Headers**: No se exponen IDs sensibles en el cuerpo de las peticiones.
*  **Relacionalidad**: Datos vinculados dinámicamente mediante IDs de categorías y usuarios.
*  **Validaciones**:

  * Control de fechas (Inicio vs Límite)
  * Estados automáticos al alcanzar el 100%

---

##  Mejoras Futuras

* Implementación de **JWT (JSON Web Tokens)** para robustecer la seguridad.
* Gráficos avanzados con **Chart.js** para análisis de productividad.
* Notificaciones tipo **Toast** para acciones del sistema.
* Modo oscuro (**Dark Mode**) nativo.

---

## Requisitos del Sistema

* **Node.js**: v14 o superior
* **Backend**: API FastAPI activa en `http://localhost:8000`
* **Base de Datos**: MySQL con soporte para llaves foráneas

---
