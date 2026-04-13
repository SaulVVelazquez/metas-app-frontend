// 
import React, { useState } from 'react';

const CategoriaForm = ({ onSave, onCancel }) => {
    const [nombre, setNombre] = useState('');
    return (
        <div className="modal d-block bg-dark bg-opacity-50" style={{ backdropFilter: 'blur(5px)', zIndex: 1060 }}>
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 p-3">
                    <h6 className="fw-bold mb-3">Nueva Categoría</h6>
                    <input type="text" className="form-control mb-3" placeholder="Nombre..." value={nombre} onChange={e => setNombre(e.target.value)} />
                    <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm w-100" onClick={onCancel}>Cerrar</button>
                        <button className="btn btn-info btn-sm w-100 text-white" onClick={() => onSave({ nombre })}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategoriaForm;