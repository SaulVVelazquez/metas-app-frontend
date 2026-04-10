import { useState } from "react";
import api from "./api";

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({ nombre: "", email: "", password: "", rol: "user" });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/register", form);
            alert("Usuario creado con éxito. Ahora puedes iniciar sesión.");
            onSwitch(); // Regresa al Login
        } catch (err) {
            alert(err.response?.data?.detail || "Error al registrar usuario");
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="card shadow p-4" style={{ width: "24rem", borderRadius: "1rem" }}>
                <h3 className="text-center fw-bold mb-4">Crear Cuenta</h3>
                <form onSubmit={handleRegister}>
                    <input className="form-control mb-3" placeholder="Nombre completo"
                        onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                    <input type="email" className="form-control mb-3" placeholder="Correo electrónico"
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input type="password" className="form-control mb-3" placeholder="Contraseña"
                        onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <select className="form-select mb-4" onChange={e => setForm({ ...form, rol: e.target.value })}>
                        <option value="user">Usuario Estándar</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <button className="btn btn-primary w-100 fw-bold mb-3" type="submit">REGISTRARSE</button>
                    <button className="btn btn-link w-100 text-decoration-none" type="button" onClick={onSwitch}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </form>
            </div>
        </div>
    );
}