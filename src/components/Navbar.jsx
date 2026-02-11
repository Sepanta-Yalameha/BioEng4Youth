import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'About', hash: '#about' },
  { path: '/programs', label: 'Programs' },
  { path: '/research-hub', label: 'Research Hub' },
  { path: '/get-involved', label: 'Get Involved' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-navy text-white">
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hover:opacity-90 transition-opacity">
            BioEng<span className="text-teal">4</span>Youth
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path + link.label}
                to={link.hash ? `${link.path}${link.hash}` : link.path}
                className={`hover:text-teal transition-colors ${
                  location.pathname === link.path ? 'text-teal' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/get-involved"
              className="bg-teal hover:bg-teal-dark text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Join Our Mission
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path + link.label}
                to={link.hash ? `${link.path}${link.hash}` : link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/get-involved"
              onClick={() => setIsOpen(false)}
              className="bg-teal text-white px-5 py-2 rounded-lg font-medium text-center"
            >
              Join Our Mission
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
