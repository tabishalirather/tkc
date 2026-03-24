export default function TrustSection() {
  const features = [
    {
      icon: "🏔️",
      title: "Direct from Kashmir",
      description: "Sourced directly from the valleys of Kashmir, ensuring authenticity and quality."
    },
    {
      icon: "✅",
      title: "Quality Guaranteed",
      description: "Each product undergoes rigorous quality testing and comes with a certificate of authenticity."
    },
    {
      icon: "📦",
      title: "Secure Packaging",
      description: "Carefully packaged to preserve freshness and quality during transit."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick and reliable delivery across India with real-time tracking."
    },
    {
      icon: "🛡️",
      title: "Secure Payments",
      description: "SSL encrypted payments with multiple payment options for your convenience."
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "15-day return policy with full refund if you're not completely satisfied."
    }
  ]

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "100%", label: "Authentic Products" },
    { number: "15+", label: "Years of Experience" },
    { number: "24/7", label: "Customer Support" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Why Choose The Kashmir Co?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to bringing you the finest authentic products from Kashmir 
            with complete transparency and trust.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-saffron-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-saffron-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 bg-cream-50 rounded-lg p-8">
          <h3 className="text-2xl font-serif font-bold text-gray-900 text-center mb-8">
            Our Certifications & Partnerships
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span className="text-2xl">🏅</span>
              </div>
              <p className="text-sm font-medium text-gray-700">ISO Certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span className="text-2xl">🧪</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Lab Tested</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span className="text-2xl">🌱</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Organic Certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span className="text-2xl">🤝</span>
              </div>
              <p className="text-sm font-medium text-gray-700">Fair Trade</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              SSL Secured
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 50,000+
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              15-Day Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}