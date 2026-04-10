import { useEffect, useState } from "react";
import api from "./api";
import Login from "./Login";
import Register from "./Register"; // Asegúrate de crear este archivo con el código anterior
import MetaList from "./components/MetaList";
import MetaForm from "./components/MetaForm";

function App() {
  // --- ESTADOS ---
  const [metas, setMetas] = useState([]);
  const [logged, setLogged] = useState(!!localStorage.getItem("user_id"));
  const [showRegister, setShowRegister] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  // --- DATOS DE USUARIO ---
  const nombreUsuario = localStorage.getItem("nombre") || "Usuario";
  const rolUsuario = localStorage.getItem("rol") || "user";
  const privilegios = rolUsuario === "admin"
    ? "Administrador: Acceso total a todas las metas y gestión del sistema."
    : "Usuario: Gestión de metas personales únicamente.";

  // --- CARGAR DATOS ---
  const cargar = async () => {
    try {
      const res = await api.get("/metas");
      setMetas(res.data);
    } catch (err) {
      console.error("Error al cargar metas:", err);
      if (err.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => {
    if (logged) cargar();
  }, [logged]);

  // --- ACCIONES (CRUD) ---
  const handleSave = async (meta) => {
    try {
      const userId = localStorage.getItem("user_id");
      const payload = { ...meta, usuario_id: meta.usuario_id || userId };

      if (meta.id) {
        await api.put(`/metas/${meta.id}`, payload);
      } else {
        await api.post("/metas", payload);
      }
      setEditing(null);
      cargar();
    } catch (err) {
      alert("Error al procesar la meta. Verifica los permisos.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta meta definitivamente?")) {
      try {
        await api.delete(`/metas/${id}`);
        cargar();
      } catch (err) {
        alert("No tienes permiso para borrar esta meta.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
  };

  // --- FILTRADO ---
  const metasFiltradas = metas.filter(m => {
    if (filtro === "pendientes") return m.estado !== "completado";
    if (filtro === "completadas") return m.estado === "completado";
    return true;
  });

  // --- RENDERIZADO CONDICIONAL (AUTH) ---
  if (!logged) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={() => setLogged(true)} onSwitch={() => setShowRegister(true)} />
    );
  }

  // --- VISTA PRINCIPAL ---
  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold"> METAS</span>
          <div className="d-flex align-items-center">
            <div className="text-white text-end me-3 d-none d-md-block">
              <small className="d-block opacity-75">Bienvenido,</small>
              <span className="fw-bold">{nombreUsuario}</span>
              <span className={`badge ms-2 ${rolUsuario === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                {rolUsuario.toUpperCase()}
              </span>
            </div>
            <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* TARJETA DE PERFIL Y PRIVILEGIOS */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4 d-flex align-items-center">
            <div className={`rounded-circle p-3 text-white me-4 ${rolUsuario === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
              <span className="fs-2">👤</span>
            </div>
            <div>
              <h4 className="fw-bold mb-1">Perfil de {nombreUsuario}</h4>
              <p className="text-muted mb-0"><strong>Permisos:</strong> {privilegios}</p>
            </div>
          </div>
        </div>

        {/* FILTROS Y BOTÓN NUEVA META */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div className="btn-group bg-white p-1 rounded-3 shadow-sm">
            <button className={`btn btn-sm px-4 ${filtro === 'todas' ? 'btn-dark' : 'btn-light'}`} onClick={() => setFiltro("todas")}>Todas</button>
            <button className={`btn btn-sm px-4 ${filtro === 'pendientes' ? 'btn-dark' : 'btn-light'}`} onClick={() => setFiltro("pendientes")}>Pendientes</button>
            <button className={`btn btn-sm px-4 ${filtro === 'completadas' ? 'btn-dark' : 'btn-light'}`} onClick={() => setFiltro("completadas")}>Completadas</button>
          </div>
          <button className="btn btn-success btn-lg fw-bold px-4 shadow-sm" onClick={() => setEditing({})}>
            + NUEVA META
          </button>
        </div>

        {/* LISTA DE METAS */}
        {metasFiltradas.length > 0 ? (
          <MetaList
            metas={metasFiltradas}
            onEdit={setEditing}
            onDelete={handleDelete}
            esAdmin={rolUsuario === "admin"}
          />
        ) : (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm">
            <p className="text-muted fs-4">No se encontraron metas en esta categoría.</p>
          </div>
        )}

        {/* MODAL FORMULARIO */}
        {editing && (
          <MetaForm
            meta={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;