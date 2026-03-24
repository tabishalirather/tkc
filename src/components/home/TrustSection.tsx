export default function TrustSection() {
  const pillars = [
    {
      title: 'Directly sourced',
      description: 'We partner with trusted growers and cooperatives across Kashmir.',
      cta: 'Read our story',
      href: '/about',
      image: 'https://images.unsplash.com/photo-1617104551722-3b2d51366471?auto=format&fit=crop&w=320&q=80'
    },
    {
      title: 'Small-batch quality',
      description: 'Each batch is checked for aroma, purity, and consistency before shipping.',
      cta: 'How we test',
      href: '/about',
      image: 'https://images.unsplash.com/photo-1611071536598-9b7d8f15189f?auto=format&fit=crop&w=320&q=80'
    },
    {
      title: 'Freshness protected',
      description: 'Protective packing and quick dispatch preserve flavor and nutrition.',
      cta: 'Shipping details',
      href: '/contact',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=320&q=80'
    },
    {
      title: 'Trusted by families',
      description: 'A growing customer base returns for transparent sourcing and reliable quality.',
      cta: 'Customer reviews',
      href: '/shop',
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=320&q=80'
    }
  ]

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-walnut-500">Why choose us</p>
          <h2 className="font-serif text-3xl font-semibold text-walnut-900 md:text-4xl">
            Built with care, not noise
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="text-center">
              <div className="mx-auto h-36 w-36 overflow-hidden rounded-full bg-cream-100">
                <img src={pillar.image} alt={pillar.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-2xl font-serif font-medium text-walnut-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-walnut-700">{pillar.description}</p>
              <a href={pillar.href} className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-saffron-700 hover:text-saffron-600">
                {pillar.cta} &gt;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
