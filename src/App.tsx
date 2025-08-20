
import './App.css'
import LandingPage from './Pages/landingPage'
import Dashboard from './Pages/Dashboard'
import ErrorPage from './Pages/ErrorPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAnalytics } from './hooks/useAnalytics'

function AppContent() {
  useAnalytics();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile/:username" element={<Dashboard />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
