import { useState } from "react";
import api from "./api";

export default function Login({ onLogin, onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/login", { email, password });

            // Guardamos toda la información necesaria en el navegador
            localStorage.setItem("user_id", res.data["x-user-id"]);
            localStorage.setItem("rol", res.data["x-rol"]);
            localStorage.setItem("nombre", res.data["nombre"]);

            onLogin(); // Cambia el estado en App.js para entrar a la aplicación
        } catch (err) {
            setError(err.response?.data?.detail || "Credenciales incorrectas o error en el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="card shadow-lg p-4" style={{ width: "24rem", borderRadius: "1rem" }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold mt-2">Bienvenido</h2>
                    <p className="text-muted">Ingresa a tu gestor de metas</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 small text-center" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">Contraseña</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 btn-lg fw-bold mb-3 shadow-sm"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "INICIAR SESIÓN"}
                    </button>

                    {/* ESTA ES LA OPCIÓN QUE TE FALTABA */}
                    <div className="text-center">
                        <span className="text-muted small">¿No tienes una cuenta? </span>
                        <button
                            type="button"
                            className="btn btn-link btn-sm p-0 fw-bold text-decoration-none"
                            onClick={onSwitch}
                        >
                            Regístrate aquí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}