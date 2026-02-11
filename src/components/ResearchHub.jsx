import { useState } from 'react'
import { Link } from 'react-router-dom'

const filterChips = ['Genomics', 'Biotech', 'Healthcare Policy', 'Public Health', 'Neuroscience']

const featuredProjects = [
  {
    title: 'CRISPR Gene Editing in Youth Oncology',
    progress: 65,
    researchers: ['Dr. A. Chen', 'M. Davis', 'K. Patel', 'L. Wang'],
    description: 'Developing novel CRISPR therapies for pediatric cancers.',
    avatarCount: 4,
  },
  {
    title: 'Sustainable Bio-Plastics from Algae',
    progress: 40,
    researchers: ['Dr. A. Chen', 'M. Davis', 'K. Patel'],
    description: 'Engineering algae strains for biodegradable plastics.',
    avatarCount: 3,
  },
  {
    title: 'AI in Early Disease Detection',
    progress: 85,
    researchers: ['Dr. A. Chen', 'M. Davis', 'K. Patel', 'L. Wang'],
    description: 'Utilizing machine learning for early diagnosis.',
    avatarCount: 4,
  },
]

const publications = [
  { title: 'Advancements in Pediatric Genomics: A 2024 Review.', authors: 'Dr. S. Lee, et al.', date: 'October 26, 2024' },
  { title: 'Ethical Considerations in Biotech Education for Teens.', authors: 'M. Johnson, P. Gupta.', date: 'October 15, 2024' },
  { title: 'Healthcare Policy and Youth Access: Bridging the Gap.', authors: 'Dr. R. Kim, L. Sato.', date: 'October 1, 2024' },
]

const sidebarLinks = ['Submission Guidelines', 'Research Partners', 'Funding Opportunities', 'Mentorship Program']

export default function ResearchHub() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative max-w-3xl mb-6">
            <input
              type="text"
              placeholder="Search projects, publications, or researchers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === chip
                    ? 'bg-teal text-white'
                    : 'bg-teal/20 text-teal-dark hover:bg-teal/30'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Featured Projects & Publications */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <div key={project.title} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm lg:text-base">
                      {project.title}
                    </h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex -space-x-2 mb-3">
                      {Array.from({ length: project.avatarCount }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-navy/20 border-2 border-white flex items-center justify-center text-xs font-medium text-navy"
                        >
                          {project.researchers[i]?.[0] || '?'}
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <button className="w-full bg-teal hover:bg-teal-dark text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      View Project
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Publications</h2>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.title} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm"><span className="text-gray-500">Title:</span> {pub.title}</p>
                      <p className="text-gray-600 text-sm"><span className="text-gray-500">Authors:</span> {pub.authors}</p>
                      <p className="text-gray-500 text-xs"><span className="text-gray-400">Date:</span> {pub.date}</p>
                    </div>
                    <button className="shrink-0 bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-navy rounded-lg overflow-hidden sticky top-4">
              <div className="px-6 py-4 bg-navy-dark">
                <h3 className="font-bold text-white">Submission Guidelines</h3>
              </div>
              <div className="p-6 space-y-3">
                {sidebarLinks.slice(1).map((link) => (
                  <a key={link} href="#" className="block text-white/90 hover:text-teal transition-colors">
                    {link}
                  </a>
                ))}
              </div>
              <div className="p-6">
                <Link
                  to="/get-involved"
                  className="block w-full bg-teal hover:bg-teal-dark text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Research Proposal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
