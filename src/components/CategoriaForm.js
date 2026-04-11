import React, { useState } from 'react';

const CategoriaForm = ({ onSave, onCancel }) => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) return alert("El nombre es obligatorio");
        onSave({ nombre });
    };

    return (
        <div className="modal d-block bg-dark bg-opacity-50" style={{ backdropFilter: 'blur(5px)', zIndex: 1060 }}>
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header border-0 p-3">
                            <h6 className="modal-title fw-bold">🏷️ Nueva Categoría</h6>
                            <button type="button" className="btn-close" onClick={onCancel}></button>
                        </div>
                        <div className="modal-body py-0 px-3">
                            <input
                                type="text" className="form-control form-control-sm"
                                placeholder="Ej: Finanzas"
                                value={nombre} onChange={e => setNombre(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="modal-footer border-0 p-3">
                            <button type="button" className="btn btn-light btn-sm" onClick={onCancel}>Cerrar</button>
                            <button type="submit" className="btn btn-primary btn-sm">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriaForm;