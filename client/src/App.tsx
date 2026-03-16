import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home } from "./pages/index.ts"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home /> />
      </Routes>
    </BrowserRouter>
  )
}

export default App