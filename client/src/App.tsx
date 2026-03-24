import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home, Services, Introduction, About, Login, AdminLogin, Signup, AdminSignup, Profile, Appointment, AdminDashboard } from "./pages"
import { AuthProvider } from "./context/AuthContext.tsx"
import { ProtectedRoute, AdminProtectedRoute } from "./routes"
import { ServicesProvider } from "./context/ServicesContext.tsx"

const App = () => {
  return (
    <AuthProvider>
      <ServicesProvider>
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
      </ServicesProvider>
    </AuthProvider>
  )
}

export default App