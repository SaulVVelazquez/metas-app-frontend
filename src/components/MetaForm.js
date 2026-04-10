import React, { useState, useEffect } from 'react';

export default function MetaForm({ meta, onSave, onCancel }) {
  const [form, setForm] = useState({
    titulo: "", descripcion: "", progreso: 0,
    estado: "pendiente", fecha_inicio: "", fecha_limite: ""
  });

  useEffect(() => {
    if (meta.id) setForm(meta);
  }, [meta]);

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow border-0">
          <div className="modal-header border-0">
            <h5 className="fw-bold">{meta.id ? "Editar Meta" : "Nueva Meta"}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
            <div className="modal-body">
              <input className="form-control mb-3" placeholder="Título" value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })} required />

              <textarea className="form-control mb-3" placeholder="Descripción" value={form.descripcion || ""}
                onChange={e => setForm({ ...form, descripcion: e.target.value })} />

              <div className="row mb-3">
                <div className="col">
                  <label className="small fw-bold">Fecha Inicio</label>
                  <input type="date" className="form-control" value={form.fecha_inicio || ""}
                    onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} />
                </div>
                <div className="col">
                  <label className="small fw-bold">Fecha Límite</label>
                  <input type="date" className="form-control" value={form.fecha_limite || ""}
                    onChange={e => setForm({ ...form, fecha_limite: e.target.value })} />
                </div>
              </div>

              <label className="small fw-bold">Progreso: {form.progreso}%</label>
              <input type="range" className="form-range mb-3" min="0" max="100" value={form.progreso}
                onChange={e => setForm({ ...form, progreso: e.target.value })} />

              <select className="form-select" value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" onClick={onCancel}>Cancelar</button>
              <button type="submit" className="btn btn-primary px-4">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}