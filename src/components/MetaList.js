import React from 'react';

const MetaList = ({ metas, onEdit, onDelete, esAdmin }) => {
    return (
        <div className="row">
            {metas.map((m) => (
                <div key={m.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4 border-top border-4 border-primary">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">
                                    {m.nombre_categoria || 'Sin Categoría'}
                                </span>
                                <span className={`badge rounded-pill ${m.estado === 'completado' ? 'bg-success' :
                                    m.estado === 'en progreso' ? 'bg-info text-dark' : 'bg-warning text-dark'
                                    }`}>
                                    {m.estado.toUpperCase()}
                                </span>
                            </div>

                            <h5 className="fw-bold mb-1 text-dark">{m.titulo}</h5>
                            <p className="text-muted small mb-4">{m.descripcion || 'Sin descripción'}</p>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1 small">
                                    <span className="fw-bold">Progreso</span>
                                    <span>{m.progreso}%</span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div className={`progress-bar ${m.progreso === 100 ? 'bg-success' : 'bg-primary'}`}
                                        style={{ width: `${m.progreso}%` }}></div>
                                </div>
                            </div>

                            {esAdmin && (
                                <div className="bg-light p-2 rounded mb-3 small">
                                    <strong>Responsable:</strong>  {m.nombre_usuario}
                                </div>
                            )}

                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-dark flex-grow-1" onClick={() => onEdit(m)}>Editar</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(m.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MetaList;