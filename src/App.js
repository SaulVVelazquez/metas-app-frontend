import React, { useState, useEffect } from 'react';
import api from './api';
import Login from './Login';
import Register from './Register';
import MetaList from './components/MetaList';
import MetaForm from './components/MetaForm';
import CategoriaForm from './components/CategoriaForm'; // Nuevo componente

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user_id"));
  const [esRegistro, setEsRegistro] = useState(false);
  const [metas, setMetas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState({ total_metas: 0 });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarCatForm, setMostrarCatForm] = useState(false); // Modal Categoría
  const [editMeta, setEditMeta] = useState(null);
  const [vista, setVista] = useState('metas');

  const esAdmin = localStorage.getItem("rol") === "admin";
  const nombreUser = localStorage.getItem("nombre");

  useEffect(() => {
    if (auth) cargarTodo();
  }, [auth]);

  const cargarTodo = async () => {
    try {
      // 1. Cargar Metas (Endpoint /metas)
      const resMetas = await api.get('/metas');
      setMetas(resMetas.data);

      // 2. Cargar Estadísticas (Endpoint /stats)
      const resStats = await api.get('/stats');
      setStats(resStats.data);

      // 3. Si es Admin, cargar Usuarios (Endpoint /usuarios)
      if (esAdmin) {
        const resUsers = await api.get('/usuarios');
        setUsuarios(resUsers.data);
      }
    } catch (err) {
      console.error("Error al cargar datos", err);
    }
  };

  // --- LÓGICA DE METAS ---
  const handleSaveMeta = async (datos) => {
    try {
      if (datos.id) {
        await api.put(`/metas/${datos.id}`, datos);
      } else {
        await api.post('/metas', datos);
      }
      setMostrarForm(false);
      setEditMeta(null);
      cargarTodo();
    } catch (err) { alert("Error al guardar meta"); }
  };

  const handleDeleteMeta = async (id) => {
    if (window.confirm("¿Eliminar esta meta?")) {
      try {
        await api.delete(`/metas/${id}`);
        cargarTodo();
      } catch (err) { alert("Error al eliminar"); }
    }
  };

  // --- LÓGICA DE CATEGORÍAS (Para el Admin) ---
  const handleSaveCategoria = async (nuevaCat) => {
    try {
      await api.post('/categorias', nuevaCat); // Requiere el endpoint POST /categorias en tu API
      setMostrarCatForm(false);
      alert("Categoría creada con éxito");
      cargarTodo();
    } catch (err) {
      alert("Error: Asegúrate de que el endpoint POST /categorias esté implementado en tu API.");
    }
  };

  // --- LÓGICA DE USUARIOS (Para el Admin) ---
  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Eliminar este usuario de forma permanente?")) {
      try {
        await api.delete(`/usuarios/${id}`);
        cargarTodo();
      } catch (err) { alert("Error al eliminar usuario"); }
    }
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  if (!auth) {
    return esRegistro ?
      <Register onSwitch={() => setEsRegistro(false)} /> :
      <Login onLogin={() => setAuth(true)} onSwitch={() => setEsRegistro(true)} />;
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold"> Meta</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">Bienvenido, <strong>{nombreUser}</strong></span>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={logout}>Cerrar Sesión</button>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* DASHBOARD DE ESTADÍSTICAS */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-primary border-4">
              <div className="small text-muted fw-bold text-uppercase">Metas en el Sistema</div>
              <h2 className="fw-bold mb-0 text-primary">{stats?.total_metas || 0}</h2>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS (Solo Admin) */}
        {esAdmin && (
          <ul className="nav nav-pills mb-4 bg-white p-2 rounded-3 shadow-sm d-inline-flex">
            <li className="nav-item">
              <button className={`nav-link ${vista === 'metas' ? 'active' : ''}`} onClick={() => setVista('metas')}>Metas Globales</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${vista === 'usuarios' ? 'active' : ''}`} onClick={() => setVista('usuarios')}>Gestionar Usuarios</button>
            </li>
          </ul>
        )}

        {/* CONTENIDO PRINCIPAL: METAS */}
        {vista === 'metas' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0 text-secondary">Listado de Objetivos</h4>
              <div className="d-flex gap-2">
                {esAdmin && (
                  <button className="btn btn-outline-primary rounded-pill px-3 fw-bold" onClick={() => setMostrarCatForm(true)}>
                    + Categoría
                  </button>
                )}
                <button className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm" onClick={() => setMostrarForm(true)}>
                  + Nueva Meta
                </button>
              </div>
            </div>
            <MetaList
              metas={metas}
              onEdit={(m) => { setEditMeta(m); setMostrarForm(true); }}
              onDelete={handleDeleteMeta}
              esAdmin={esAdmin}
            />
          </>
        )}

        {/* CONTENIDO PRINCIPAL: USUARIOS (Solo Admin) */}
        {vista === 'usuarios' && esAdmin && (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Usuarios Registrados</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td><span className={`badge ${u.rol === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>{u.rol}</span></td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={u.id === parseInt(auth)} // No dejarse borrar a sí mismo
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE METAS */}
      {mostrarForm && (
        <MetaForm
          meta={editMeta}
          onSave={handleSaveMeta}
          onCancel={() => { setMostrarForm(false); setEditMeta(null); }}
        />
      )}

      {/* MODAL DE CATEGORÍAS */}
      {mostrarCatForm && (
        <CategoriaForm
          onSave={handleSaveCategoria}
          onCancel={() => setMostrarCatForm(false)}
        />
      )}
    </div>
  );
}

export default App;