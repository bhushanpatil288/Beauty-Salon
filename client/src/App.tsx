import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home, Services, Introduction, About, Login, Signup, Profile } from "./pages/index.ts"
import { AuthProvider } from "./context/AuthContext.tsx"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/services" element=<Services /> />
          <Route path="/introduction" element=<Introduction /> />
          <Route path="/about" element=<About /> />
          <Route path="/login" element=<Login /> />
          <Route path="/signup" element=<Signup /> />
          <Route path="/profile" element=<Profile /> />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App