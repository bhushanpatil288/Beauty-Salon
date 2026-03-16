import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home, Services, Introduction, About } from "./pages/index.ts"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/services" element=<Services /> />
        <Route path="/introduction" element=<Introduction /> />
        <Route path="/about" element=<About /> />
      </Routes>
    </BrowserRouter>
  )
}

export default App