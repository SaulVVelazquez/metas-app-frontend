import React, { useState, useEffect } from 'react';

const MetaForm = ({ meta, onSave, onCancel }) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    progreso: 0,
    estado: 'pendiente',
    categoria_id: 1,
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_limite: ''
  });

  useEffect(() => {
    if (meta.id) setForm(meta);
  }, [meta]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación manual extra
    if (!form.titulo.trim()) return alert("El título es obligatorio");
    onSave(form);
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50" style={{ backdropFilter: 'blur(5px)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <form onSubmit={handleSubmit}>
            <div className="modal-header border-0 p-4 pb-0">
              <h5 className="modal-title fw-bold fs-4">{meta.id ? 'Editar Meta' : '🚀 Nueva Meta'}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-bold small">Título del Objetivo</label>
                <input
                  type="text" className="form-control rounded-3" required
                  value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Descripción</label>
                <textarea
                  className="form-control rounded-3" rows="2"
                  value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })}
                ></textarea>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label fw-bold small">Progreso (%)</label>
                  <input
                    type="number" className="form-control rounded-3" min="0" max="100"
                    value={form.progreso} onChange={e => setForm({ ...form, progreso: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold small">Estado</label>
                  <select
                    className="form-select rounded-3"
                    value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completado">Completado</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Fecha Límite</label>
                <input
                  type="date" className="form-control rounded-3"
                  value={form.fecha_limite || ''} onChange={e => setForm({ ...form, fecha_limite: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer border-0 p-4 pt-0">
              <button type="button" className="btn btn-light px-4" onClick={onCancel}>Cancelar</button>
              <button type="submit" className="btn btn-primary px-4 fw-bold shadow-sm">Guardar Meta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetaForm;