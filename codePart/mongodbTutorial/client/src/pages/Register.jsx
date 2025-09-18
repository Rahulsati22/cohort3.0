// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/signup", {
        username: form.username,
        password: form.password,
      });
      toast.success(data.msg || "Registered successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Registration failed");
    }
  };

  return (
    <main className="reg-page">
      <div className="reg-shell">
        <section className="reg-main">
          <header className="reg-header">
            <div className="reg-badge">New here?</div>
            <h1 className="reg-title">Create account</h1>
            <p className="reg-sub">Sign up to start managing tasks</p>
          </header>

          <form className="reg-form" onSubmit={onSubmit} noValidate>
            <div className="reg-field">
              <label htmlFor="username" className="reg-label">Username</label>
              <input
                id="username"
                name="username"
                className="reg-input"
                type="text"
                required
                minLength={3}
                value={form.username}
                onChange={onChange}
                autoComplete="username"
                placeholder="e.g. johndoe"
              />
            </div>

            <div className="reg-field">
              <label htmlFor="password" className="reg-label">Password</label>
              <input
                id="password"
                name="password"
                className="reg-input"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={onChange}
                autoComplete="new-password"
                placeholder="At least 6 characters"
              />
              <p className="reg-hint">Use at least 6 characters for security</p>
            </div>

            <button type="submit" className="reg-btn">Sign Up</button>

            <div className="reg-meta">
              <span>Already have an account?</span>
              <Link to="/login" className="reg-link">Sign in</Link>
            </div>
          </form>
        </section>

        <aside className="reg-side">
          <div className="reg-side-inner">
            <h2 className="reg-side-title">Stay focused ✨</h2>
            <ul className="reg-points">
              <li>Organize tasks into simple lists</li>
              <li>Check off and track progress</li>
              <li>Fast, minimal, distraction‑free</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
