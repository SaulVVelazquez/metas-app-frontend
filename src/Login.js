import React, { useState } from 'react';
import api from './api';

const Login = ({ onLogin, onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem("user_id", res.data["x-user-id"]);
            localStorage.setItem("rol", res.data["x-rol"]);
            localStorage.setItem("nombre", res.data["nombre"]);
            onLogin();
        } catch (err) {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center fw-bold mb-4">Bienvenido</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3">Ingresar</button>
                    <button type="button" className="btn btn-link w-100 text-decoration-none" onClick={onSwitch}>¿No tienes cuenta? Regístrate</button>
                </form>
            </div>
        </div>
    );
};

export default Login;