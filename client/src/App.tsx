import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Home, Services, Introduction, About,
  Login, AdminLogin, Signup, AdminSignup,
  Profile, Appointment, AdminDashboard,
} from "./pages";
import { ProtectedRoute, AdminProtectedRoute } from "./routes";
import { useAppDispatch } from "./app/hooks";
import { initAuth } from "./features/auth/authSlice";
import { fetchServices } from "./features/services/servicesSlice";

const App = () => {
  const dispatch = useAppDispatch();

  // Bootstrap: fetch current user and services on mount
  useEffect(() => {
    dispatch(initAuth());
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />

        {/* User protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointment />
          </ProtectedRoute>
        } />

        {/* Admin protected routes */}
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;