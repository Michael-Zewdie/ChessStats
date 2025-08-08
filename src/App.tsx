
import './App.css'
import LandingPage from './Pages/landingPage'
import Dashboard from './Pages/Dashboard'
import ErrorPage from './Pages/ErrorPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/:username" element={<Dashboard />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
