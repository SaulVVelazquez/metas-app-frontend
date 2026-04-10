import { useState } from "react";
import { updateMeta } from "../api";

const EditModal = ({ meta, onClose, onSaved }) => {
    const [form, setForm] = useState({ ...meta });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateMeta(meta.id, {
            ...form,
            progreso: parseInt(form.progreso),
            fecha_inicio: form.fecha_inicio || null,
            fecha_limite: form.fecha_limite || null
        });

        onSaved();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar Meta</h2>

                <form onSubmit={handleSubmit}>
                    <input name="titulo" value={form.titulo} onChange={handleChange} />

                    <input name="descripcion" value={form.descripcion || ""} onChange={handleChange} />

                    <input name="progreso" type="number" value={form.progreso} onChange={handleChange} />

                    <select name="estado" value={form.estado} onChange={handleChange}>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completado">Completado</option>
                    </select>

                    <input type="date" name="fecha_inicio" value={form.fecha_inicio || ""} onChange={handleChange} />
                    <input type="date" name="fecha_limite" value={form.fecha_limite || ""} onChange={handleChange} />

                    <div className="modal-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;