// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("token", data);
      toast.success(data.message || "Logged in successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <aside className="auth-aside">
          <div className="auth-brand">Todo App</div>
          <h2 className="auth-aside-title">Welcome back</h2>
          <p className="auth-aside-sub">Stay focused and finish today’s tasks.</p>
        </aside>

        <section className="auth-card">
          <header className="auth-header">
            <h1 className="auth-title">Sign in</h1>
            <p className="auth-sub">Access the dashboard and manage tasks</p>
          </header>

          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                name="username"
                className="form-input"
                type="text"
                required
                minLength={3}
                value={form.username}
                onChange={onChange}
                autoComplete="username"
              />
            </div>

            <div className="form-field">
              <div className="form-label-row">
                <label htmlFor="password" className="form-label">Password</label>
                
              </div>
              <input
                id="password"
                name="password"
                className="form-input"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={onChange}
                autoComplete="current-password"
              />
            </div>


            <button type="submit" className="btn-primary">Sign In</button>

            <div className="auth-meta">
              <span>Don’t have an account?</span>
              <Link to="/" className="link-primary">Sign Up</Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
