import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProgramsPage from './pages/ProgramsPage'
import ResearchHubPage from './pages/ResearchHubPage'
import GetInvolvedPage from './pages/GetInvolvedPage'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/research-hub" element={<ResearchHubPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
