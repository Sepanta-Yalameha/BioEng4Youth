const features = [
  {
    icon: '/images/icons/icon-research.png',
    title: 'Research',
    description: 'Providing opportunities for youth to engage in cutting-edge biomedical research projects.',
  },
  {
    icon: '/images/icons/icon-outreach.png',
    title: 'Outreach',
    description: 'Connecting students with professionals and resources through educational programs and events.',
  },
  {
    icon: '/images/icons/icon-innovation.png',
    title: 'Innovation',
    description: 'Inspiring creative solutions and advancements in medical and biotechnology fields.',
  },
]

export default function Features() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mb-6 flex justify-center">
              <img src={feature.icon} alt={feature.title} className="w-28 h-28 object-contain" />
            </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#222222' }}>{feature.title}</h3>
              <p className="leading-relaxed" style={{ color: '#444444' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
