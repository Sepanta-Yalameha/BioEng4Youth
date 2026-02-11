import { useState } from 'react'

const testimonials = [
  {
    quote: "Partnering with BioEng4Youth has been incredibly rewarding. We've seen firsthand the positive impact on student engagement.",
    author: 'Dr. Evelyn Reed',
    title: 'CEO, GenTech Solutions',
  },
  {
    quote: "Their programs are top-notch, bridging the gap between education and real-world biotech applications.",
    author: 'Prof. Alan Kim',
    title: 'University College London',
  },
  {
    quote: "A fantastic organization dedicated to fostering talent and innovation. We are proud sponsors.",
    author: 'Sarah Lee',
    title: 'Director, Apex Medical Group',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="bg-navy py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative max-w-3xl mx-auto">
          <blockquote className="text-white text-xl lg:text-2xl text-center leading-relaxed">
            &ldquo;
            {testimonials[current].quote.split('BioEng4Youth').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <>BioEng<span className="text-teal">4</span>Youth</>}
              </span>
            ))}
            &rdquo;
          </blockquote>
          <p className="text-teal font-semibold text-center mt-6">
            {testimonials[current].author}
          </p>
          <p className="text-white/80 text-center text-sm">
            {testimonials[current].title}
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
