import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import DotsPulse from "./components/Loader";
import { useUserStore } from "./stores/useUserStore";
import DashBoard from "./pages/DashBoard";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
// Guards
function RequireAuth({ user }) {
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function RequireGuest({ user }) {
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {

  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore()
  // Run once to check authentication
  useEffect(() => {
    checkAuth();

  }, []);

  // Run when user becomes available
  useEffect(() => {
    if (user) {
      getCartItems();
      // console.log(user)
    }
  }, [user]);




  return (
    checkingAuth ? <DotsPulse /> : <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden antialiased selection:bg-amber-400/20 selection:text-white">
      {/* Noir Gold background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[140vw] h-[140vh]
          bg-[radial-gradient(1200px_600px_at_50%_-5%,rgba(245,158,11,0.20),rgba(245,158,11,0)_60%),radial-gradient(900px_520px_at_12%_22%,rgba(244,63,94,0.10),rgba(244,63,94,0)_60%),radial-gradient(1000px_520px_at_88%_18%,rgba(250,204,21,0.10),rgba(250,204,21,0)_60%)]"
        />
      </div>

      {/* Optional subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_120%,rgba(0,0,0,0.6),rgba(0,0,0,0))]" />

      {/* Pass user to Navbar for conditional links */}
      <Navbar user={user} />

      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Guest-only: hide when logged-in */}
          <Route element={<RequireGuest user={user} />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Auth-only: hide when logged-out (examples) */}
          <Route element={<RequireAuth user={user} />}>
            {/* Add protected pages here when implemented */}
            {/* <Route path="/cart" element={<CartPage />} /> */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="/dashboard" element={user?.role == 'Admin' ? <DashBoard /> : <Navigate to='/' />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/paymentsuccess' element={<PaymentSuccessPage />} />
          </Route>

          <Route path='/category/:category' element={<CategoryPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <Toaster />
    </div>
  );
}

export default App;
