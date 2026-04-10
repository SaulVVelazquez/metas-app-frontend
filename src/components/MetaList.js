import React from 'react';

export default function MetaList({ metas, onEdit, onDelete, esAdmin }) {
    return (
        <div className="row">
            {metas.map(m => (
                <div key={m.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                        <div className="card-body">
                            {/* INFO DEL PROPIETARIO (SOLO PARA ADMIN) */}
                            {esAdmin && (
                                <div className="mb-2">
                                    <span className="badge bg-info text-dark w-100 text-start p-2">
                                        👤 Dueño: {m.nombre_usuario || "Cargando..."}
                                    </span>
                                </div>
                            )}
                            
                            <h5 className="fw-bold text-dark">{m.titulo}</h5>
                            <p className="text-muted small mb-3 text-truncate-2">{m.descripcion}</p>
                            
                            {/* SECCIÓN DE FECHAS */}
                            <div className="bg-light p-2 rounded-3 mb-3 border">
                                <div className="row g-0 text-center">
                                    <div className="col-6 border-end">
                                        <small className="d-block text-muted">Inicio</small>
                                        <span className="small fw-bold">{m.fecha_inicio || "S/F"}</span>
                                    </div>
                                    <div className="col-6">
                                        <small className="d-block text-muted">Límite</small>
                                        <span className="small fw-bold text-danger">{m.fecha_limite || "S/F"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* BARRA DE PROGRESO */}
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <small className="fw-bold">{m.progreso}%</small>
                                <small className="badge bg-light text-dark border">{m.estado}</small>
                            </div>
                            <div className="progress mb-3" style={{ height: "8px" }}>
                                <div 
                                    className={`progress-bar ${m.progreso === 100 ? 'bg-success' : 'bg-primary'}`} 
                                    style={{ width: `${m.progreso}%` }}
                                ></div>
                            </div>

                            {/* BOTONES */}
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-outline-primary rounded-circle" onClick={() => onEdit(m)}>Editar</button>
                                <button className="btn btn-sm btn-outline-danger rounded-circle" onClick={() => onDelete(m.id)}>Borrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}