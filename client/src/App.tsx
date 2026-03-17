import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home, Services, Introduction, About, Login, Signup } from "./pages/index.ts"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/services" element=<Services /> />
        <Route path="/introduction" element=<Introduction /> />
        <Route path="/about" element=<About /> />
        <Route path="/login" element=<Login /> />
        <Route path="/signup" element=<Signup /> />
      </Routes>
    </BrowserRouter>
  )
}

export default App