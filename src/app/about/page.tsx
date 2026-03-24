export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest-800 to-saffron-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-cream-100 max-w-3xl mx-auto">
            Born from a passion for authentic Kashmiri products and a mission to connect
            the beauty of Kashmir with the world.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              From Kashmir's Heart to Your Home
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                The Kashmir Co. was founded with a simple yet profound vision: to bring the authentic
                taste and quality of Kashmir's finest products directly to your doorstep. Our journey
                began in the pristine valleys of Kashmir, where we witnessed the incredible craftsmanship
                and natural bounty that this region has to offer.
              </p>
              <p>
                For generations, Kashmiri farmers and artisans have perfected the art of cultivating and
                harvesting some of the world's most precious natural products. From the golden threads of
                saffron to the ancient wisdom of pure shilajit, each product tells a story of tradition,
                quality, and unwavering dedication.
              </p>
              <p>
                We work directly with local farmers and cooperatives, ensuring fair trade practices while
                maintaining the highest quality standards. Every product in our collection is carefully
                selected, tested, and packaged to preserve its authenticity and nutritional value.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Kashmir landscape"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-saffron-500 text-white p-6 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Authentic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-saffron-50 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-saffron-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To preserve and promote the authentic products of Kashmir while supporting local communities
              and sustainable farming practices. We aim to be the bridge between Kashmir's natural treasures
              and conscious consumers worldwide.
            </p>
          </div>

          <div className="bg-forest-50 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-forest-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted name for authentic Kashmiri products globally, creating a sustainable
              ecosystem that benefits farmers, preserves traditions, and delivers exceptional value to our customers.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Authenticity",
                description: "Every product is genuine and sourced directly from Kashmir's finest producers."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Community",
                description: "Supporting local farmers and artisans to preserve traditional Kashmir craftsmanship."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Sustainability",
                description: "Promoting eco-friendly practices and sustainable farming methods."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Quality",
                description: "Maintaining the highest standards in every step from farm to your table."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4 text-saffron-600">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 -mx-4 px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our passionate team works tirelessly to bring you the finest Kashmir has to offer,
                combining traditional knowledge with modern quality standards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Tabish Ali Rather",
                  role: "Founder & CTO",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                  bio: "A Kashmir native passionate about sharing authentic products with the world."
                },
                {
                  name: "Shahid Ul Islam",
                  role: "Head of Quality",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
                  bio: "Expert in traditional Kashmir products with over 15 years of experience."
                },
                {
                  name: "Haroon Yousuf",
                  role: "Supply Chain Director",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                  bio: "Ensures direct relationships with farmers and maintains quality standards."
                },
                {
                  name: "Zahid Ali",
                  role: "Managing Director",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
                  bio: "Takes care of the overall operations and strategic direction of the company."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-saffron-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Ready to Experience Authentic Kashmir?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for genuine Kashmiri products.
            Start your journey with Kashmir's finest today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-saffron-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-saffron-600 transition-colors"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="bg-white border border-saffron-500 text-saffron-600 px-8 py-3 rounded-lg font-semibold hover:bg-saffron-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
