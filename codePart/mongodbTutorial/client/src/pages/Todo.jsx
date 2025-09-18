import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Todo = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login", { replace: true });
    };

    return (
        <>
            <header>
                <div className="nav">
                    <div className="brand">Todo App</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="pill">Stay focused ✨</div>
                        <button className="logout-btn" onClick={onLogout} aria-label="Log out">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container">
                <section className="first-section">
                    <h2 className="section-title">Today’s Tasks</h2>
                    <p className="section-sub">Check off items, or delete to keep it clean.</p>

                    <ul className="task-list" id="taskList">
                        <li>
                            <div className="task-card">
                                <div className="check-wrap">
                                    <input className="checkbox" type="checkbox" id="task1" />
                                </div>
                                <label className="task-text" htmlFor="task1">
                                    Sample task — click delete to test empty state.
                                </label>
                                <button className="icon-btn danger" aria-label="Delete task" data-action="delete">
                                    {/* Balanced Trash Icon */}
                                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path
                                            d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path
                                            d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <div id="emptyState" className="empty-state">No tasks to show</div>
                </section>

                <div className="spacer"></div>

                <section className="composer">
                    <input className="input" id="newTask" type="text" placeholder="Add a new task..." />
                    <button className="btn" id="addBtn">Add</button>
                </section>
            </main>
        </>
    );
};

export default Todo;
