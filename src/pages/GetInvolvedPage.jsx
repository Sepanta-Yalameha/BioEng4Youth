import { Link } from 'react-router-dom'
import VolunteersPartners from '../components/VolunteersPartners'
import Testimonials from '../components/Testimonials'

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero Section - Get Involved variant */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt="Lab team collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Empowering the Future of Medicine Together
          </h1>
          <Link
            to="/get-involved"
            className="inline-block mt-8 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#333333' }}
          >
            Support Our Mission
          </Link>
        </div>
      </section>

      <VolunteersPartners />
      <Testimonials />
    </>
  )
}
