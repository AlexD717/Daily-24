import './App.css'
import Game from './pages/Game'
import { Routes, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/Daily-24" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
