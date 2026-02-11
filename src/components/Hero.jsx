import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Diverse medical students in lab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold max-w-4xl mx-auto leading-tight">
          EMPOWERING THE NEXT GENERATION OF BIOMEDICAL LEADERS
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Fostering innovation, research, and outreach for the youth in medicine and biotech.
        </p>
        <Link
          to="/get-involved"
          className="inline-block mt-8 bg-teal hover:bg-teal-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          Join Our Mission
        </Link>
      </div>
    </section>
  )
}
