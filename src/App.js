import React, { useState, useEffect } from 'react';
import api from './api';
import Login from './Login';
import Register from './Register';
import MetaList from './components/MetaList';
import MetaForm from './components/MetaForm';
import CategoriaForm from './components/CategoriaForm';

function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [auth, setAuth] = useState(localStorage.getItem("user_id"));
  const [esRegistro, setEsRegistro] = useState(false);

  // --- ESTADOS DE DATOS ---
  const [metas, setMetas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [stats, setStats] = useState({ total_metas: 0 });

  // --- ESTADOS DE UI ---
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarCatForm, setMostrarCatForm] = useState(false);
  const [editMeta, setEditMeta] = useState(null);
  const [vista, setVista] = useState('metas');

  // --- ESTADOS DE FILTROS---
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroUsuario, setFiltroUsuario] = useState('todos'); // Nuevo filtro para Admin

  const esAdmin = localStorage.getItem("rol") === "admin";
  const nombreUser = localStorage.getItem("nombre");

  useEffect(() => {
    if (auth) cargarTodo();
  }, [auth]);

  const cargarTodo = async () => {
    try {
      const resMetas = await api.get('/metas');
      setMetas(resMetas.data);

      const resCat = await api.get('/categorias');
      setCategorias(resCat.data);

      const resStats = await api.get('/stats');
      setStats(resStats.data);

      if (esAdmin) {
        const resUsers = await api.get('/usuarios');
        setUsuarios(resUsers.data);
      }
    } catch (err) {
      console.error("Error al cargar datos", err);
    }
  };

  // --- MANEJADORES DE EVENTOS ---
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

  const handleSaveCategoria = async (nuevaCat) => {
    try {
      await api.post('/categorias', nuevaCat);
      setMostrarCatForm(false);
      alert("Categoría creada con éxito");
      cargarTodo();
    } catch (err) { alert("Error al crear categoría"); }
  };

  const handleDeleteMeta = async (id) => {
    if (window.confirm("¿Eliminar esta meta?")) {
      await api.delete(`/metas/${id}`);
      cargarTodo();
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      await api.delete(`/usuarios/${id}`);
      cargarTodo();
    }
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  // --- LÓGICA DE FILTRADO MAESTRA ---
  const metasFiltradas = metas.filter(m => {
    const coincideEstado = filtroEstado === 'todos' || m.estado === filtroEstado;
    const coincideCat = filtroCategoria === 'todas' || m.categoria_id === parseInt(filtroCategoria);
    const coincideUsuario = filtroUsuario === 'todos' || m.usuario_id === parseInt(filtroUsuario);
    return coincideEstado && coincideCat && coincideUsuario;
  });

  if (!auth) {
    return esRegistro ?
      <Register onSwitch={() => setEsRegistro(false)} /> :
      <Login onLogin={() => setAuth(true)} onSwitch={() => setEsRegistro(true)} />;
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold text-info">Metas</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small d-none d-md-inline">Bienvenido, <strong>{nombreUser}</strong></span>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={logout}>Salir</button>
          </div>
        </div>
      </nav>

      <div className="container">

        {/* SECCIÓN DE PERMISOS */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border-bottom border-info border-5">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h3 className="fw-bold mb-1 text-dark">Panel de Control</h3>
              <p className="text-muted mb-0">
                Sesión activa: <span className={`badge text-uppercase ${esAdmin ? 'bg-danger text-white' : 'bg-info text-dark'}`}>{localStorage.getItem("rol")}</span>
              </p>
            </div>
            <div className="col-md-5 text-md-end mt-3 mt-md-0">
              <div className="p-3 rounded-3 bg-light border">
                <h6 className="fw-bold small mb-2 text-uppercase text-muted">Mis Privilegios:</h6>
                <ul className="list-unstyled mb-0 small text-start d-inline-block">
                  {esAdmin ? (
                    <>
                      <li> Supervisión global de metas</li>
                      <li> Gestión de base de usuarios</li>
                      <li> Configuración de categorías</li>
                    </>
                  ) : (
                    <>
                      <li> Gestión de metas personales</li>
                      <li>Visualización de progreso</li>
                      <li> Administración restringida</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-info border-4">
              <div className="small text-muted fw-bold text-uppercase">Total Metas Sistema</div>
              <h2 className="fw-bold mb-0 text-info">{stats?.total_metas || 0}</h2>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN ADMIN */}
        {esAdmin && (
          <ul className="nav nav-pills mb-4 bg-white p-2 rounded-3 shadow-sm d-inline-flex">
            <li className="nav-item">
              <button className={`nav-link ${vista === 'metas' ? 'active bg-info text-white' : 'text-dark'}`} onClick={() => setVista('metas')}>Metas</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${vista === 'usuarios' ? 'active bg-info text-white' : 'text-dark'}`} onClick={() => setVista('usuarios')}>Usuarios</button>
            </li>
          </ul>
        )}

        {/* VISTA DE METAS */}
        {vista === 'metas' && (
          <>
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Estado</label>
                  <select className="form-select bg-light border-0" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                    <option value="todos">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completado">Completado</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Categoría</label>
                  <select className="form-select bg-light border-0" value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
                    <option value="todas">Todas las categorías</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>

                {/* FILTRO DE USUARIO (SOLO ADMIN) */}
                {esAdmin && (
                  <div className="col-md-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Propietario</label>
                    <select className="form-select bg-light border-0" value={filtroUsuario} onChange={e => setFiltroUsuario(e.target.value)}>
                      <option value="todos">Todos los usuarios</option>
                      <option value={auth} className="fw-bold">Solo mis metas (Mías)</option>
                      {usuarios.map(u => u.id !== parseInt(auth) && (
                        <option key={u.id} value={u.id}>{u.nombre}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={`text-end ${esAdmin ? 'col-md-3' : 'col-md-6'}`}>
                  <div className="d-flex gap-2 justify-content-end">
                    {esAdmin && (
                      <button className="btn btn-outline-info rounded-pill fw-bold" onClick={() => setMostrarCatForm(true)}>+ Cat.</button>
                    )}
                    <button className="btn btn-info text-white rounded-pill px-4 fw-bold shadow-sm" onClick={() => setMostrarForm(true)}>+ Nueva Meta</button>
                  </div>
                </div>
              </div>
            </div>

            <MetaList
              metas={metasFiltradas}
              onEdit={(m) => { setEditMeta(m); setMostrarForm(true); }}
              onDelete={handleDeleteMeta}
              esAdmin={esAdmin}
            />
          </>
        )}

        {/* TABLA DE USUARIOS */}
        {vista === 'usuarios' && esAdmin && (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-dark small text-uppercase">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td className="p-3 fw-bold">{u.nombre}</td>
                    <td className="p-3 text-muted small">{u.email}</td>
                    <td className="p-3">
                      <span className={`badge rounded-pill ${u.rol === 'admin' ? 'bg-danger-subtle text-danger border border-danger' : 'bg-secondary-subtle text-secondary border border-secondary'}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => handleDeleteUser(u.id)} disabled={u.id === parseInt(auth)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODALES */}
      {mostrarForm && (
        <MetaForm
          meta={editMeta}
          onSave={handleSaveMeta}
          onCancel={() => { setMostrarForm(false); setEditMeta(null); }}
        />
      )}

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