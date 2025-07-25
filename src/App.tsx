
import './App.css'
import LandingPage from './Pages/landingPage'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/:username" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
