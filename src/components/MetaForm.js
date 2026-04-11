// 
import React, { useState, useEffect } from 'react';
import api from '../api';

const MetaForm = ({ meta, onSave, onCancel }) => {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '', // <-- Aseguramos que esté aquí
    progreso: 0,
    estado: 'pendiente',
    categoria_id: '',
    fecha_inicio: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
    fecha_limite: ''
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const res = await api.get("/categorias");
        setCategorias(res.data);
      } catch (err) { console.error("Error al cargar categorías", err); }
    };
    cargarCategorias();
    if (meta && meta.id) setForm(meta);
  }, [meta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoria_id) return alert("Selecciona una categoría");
    onSave(form);
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50" style={{ backdropFilter: 'blur(5px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <form onSubmit={handleSubmit}>
            <div className="modal-header border-0 p-4 pb-0">
              <h5 className="modal-title fw-bold">{form.id ? ' Editar Meta' : ' Nueva Meta'}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>

            <div className="modal-body p-4">
              {/* TÍTULO */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Título</label>
                <input type="text" className="form-control" required value={form.titulo}
                  onChange={e => setForm({ ...form, titulo: e.target.value })} />
              </div>

              {/* DESCRIPCIÓN (Agregada) */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Descripción</label>
                <textarea className="form-control" rows="2" placeholder="¿De qué trata esta meta?"
                  value={form.descripcion || ''}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })} />
              </div>

              {/* CATEGORÍA */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Categoría</label>
                <select className="form-select" required value={form.categoria_id}
                  onChange={e => setForm({ ...form, categoria_id: e.target.value })}>
                  <option value="">Seleccione una...</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>

              {/* FECHAS (Inicio y Límite) */}
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label small fw-bold">Fecha Inicio</label>
                  <input type="date" className="form-control" required value={form.fecha_inicio || ''}
                    onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label small fw-bold">Fecha Límite</label>
                  <input type="date" className="form-control" required value={form.fecha_limite || ''}
                    onChange={e => setForm({ ...form, fecha_limite: e.target.value })} />
                </div>
              </div>

              {/* PROGRESO Y ESTADO */}
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label small fw-bold">Progreso %</label>
                  <input type="number" className="form-control" min="0" max="100" value={form.progreso}
                    onChange={e => setForm({ ...form, progreso: e.target.value })} />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label small fw-bold">Estado</label>
                  <select className="form-select" value={form.estado}
                    onChange={e => setForm({ ...form, estado: e.target.value })}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completado">Completado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 p-4 pt-0">
              <button type="button" className="btn btn-light" onClick={onCancel}>Cancelar</button>
              <button type="submit" className="btn btn-primary px-4 fw-bold">Guardar Meta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetaForm;