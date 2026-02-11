import ContactForm from './ContactForm'

export default function VolunteersPartners() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Balanced two-column layout - equal height columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Volunteers Column */}
          <div className="flex flex-col">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#333333' }}>
              Volunteers
            </h2>
            <p className="text-lg mb-8" style={{ color: '#333333' }}>
              Make a Difference in Young Lives
            </p>
            <img
              src="/images/volunteers.png"
              alt="Mentorship - diverse students learning together"
              className="w-full h-56 lg:h-64 object-cover rounded-lg shadow-sm mb-8"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-10 h-10 shrink-0" fill="none" stroke="#333333" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <h3 className="font-bold" style={{ color: '#333333' }}>Mentor</h3>
                    <p className="text-sm mt-2" style={{ color: '#333333' }}>
                      Guide and inspire the next generation of scientists and doctors. Share your experience and expertise.
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 bg-teal text-white px-4 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
                >
                  Apply Now
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-10 h-10 shrink-0" fill="none" stroke="#333333" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold" style={{ color: '#333333' }}>Researcher</h3>
                    <p className="text-sm mt-2" style={{ color: '#333333' }}>
                      Contribute to cutting-edge projects and help youth develop hands-on skills in biotech.
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 bg-teal text-white px-4 py-2 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Partners Column - matched structure for balance */}
          <div className="flex flex-col">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#333333' }}>
              Partners
            </h2>
            <p className="text-lg mb-8" style={{ color: '#333333' }}>
              Collaborate for Impact
            </p>
            <img
              src="/images/partners.png"
              alt="Corporate meeting"
              className="w-full h-56 lg:h-64 object-cover rounded-lg shadow-sm mb-8"
            />
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold mb-3" style={{ color: '#333333' }}>Corporate & Academic Sponsorships</h3>
              <p style={{ color: '#333333' }}>
                Unlock opportunities for joint initiatives, resource sharing, and program development. Enhance your brand's social responsibility.
              </p>
            </div>
          </div>
        </div>

        {/* Connect form - full-width section below for visual balance */}
        <div className="mt-16 lg:mt-24 max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
