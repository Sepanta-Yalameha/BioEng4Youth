import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClasses = "w-full px-4 py-3 rounded bg-white border text-gray-900 placeholder:text-[#6C757D] focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-navy">
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Connect with Us</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              style={{ borderColor: '#D1D1D1' }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              style={{ borderColor: '#D1D1D1' }}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="organization" className="block text-white text-sm font-medium mb-1">
              Organization *
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              className={inputClasses}
              style={{ borderColor: '#D1D1D1' }}
              placeholder="Your organization"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
              style={{ borderColor: '#D1D1D1' }}
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal text-white font-semibold py-3 rounded-lg transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
