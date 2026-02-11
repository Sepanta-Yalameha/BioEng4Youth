import { Link } from 'react-router-dom'

const programs = [
  {
    title: 'Bio-Innovators Lab',
    description: 'Hands-on workshops and research opportunities for high school students to develop cutting-edge projects and gain practical skills in biotech.',
    image: '/images/bio-innovators-lab.png',
    imageAlt: 'Students in lab with beakers and test tubes',
  },
  {
    title: 'Medical Mentorship Circle',
    description: 'Connecting aspiring medical professionals with experienced mentors for career guidance, shadowing, and personal development.',
    image: '/images/medical-mentorship.png',
    imageAlt: 'Doctor mentoring student',
  },
  {
    title: 'Global Biotech Outreach',
    description: 'Bringing educational resources and programs to underrepresented communities worldwide, promoting equity in science and health.',
    image: '/images/global-biotech-outreach.png',
    imageAlt: 'Youth engaged in outdoor learning',
  },
]

export default function Programs() {
  return (
    <>
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4">
            <Link to="/" className="text-navy hover:text-teal">Home</Link>
            <span className="text-gray-500 mx-2">›</span>
            <span className="text-gray-700">Programs</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-gray-600 max-w-3xl mb-12">
            Explore our diverse initiatives designed to empower and educate youth in the fields of medicine and biotechnology. We foster innovation and mentorship to build the future leaders of healthcare.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={program.image}
                  alt={program.imageAlt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {program.description}
                  </p>
                  <button className="inline-block bg-teal hover:bg-teal-dark text-white px-5 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-navy py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Have an Idea? Suggest a New Program
            </h3>
            <p className="text-white/80">
              We are always looking for innovative ways to support our mission. Share your thoughts!
            </p>
          </div>
          <Link
            to="/get-involved"
            className="shrink-0 bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit a Proposal
          </Link>
        </div>
      </section>
    </>
  )
}
