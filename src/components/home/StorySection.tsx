export default function StorySection() {
  return (
    <section className="py-16 bg-forest-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Our Kashmir Story
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Born in the pristine valleys of Kashmir, The Kashmir Co. is more than just a brand—
                  it's a bridge connecting you to the authentic heart of Kashmir.
                </p>
                
                <p>
                  Our journey began with a simple mission: to bring the world's finest products from 
                  Kashmir directly to your doorstep. Every product we offer is carefully sourced from 
                  local farmers and artisans who have been perfecting their craft for generations.
                </p>
                
                <p>
                  From the golden fields of Pampore where the world's most precious saffron blooms, 
                  to the high-altitude regions where pure Shilajit is harvested, we ensure that every 
                  product maintains its authenticity and quality.
                </p>
                
                <p>
                  When you choose The Kashmir Co., you're not just buying a product—you're supporting 
                  local communities, preserving traditional methods, and experiencing the true essence 
                  of Kashmir.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-saffron-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-saffron-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600">Trusted Farmers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-saffron-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-saffron-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Authentic Products</div>
                </div>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-saffron-100 to-amber-100">
                <img
                  src="https://placehold.co/600x450?text=Kashmir+Valley"
                  alt="Beautiful Kashmir Valley"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl mb-3">🌸</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Saffron Fields</h3>
                  <p className="text-gray-600 text-sm">
                    Handpicked from the famous fields of Pampore, our saffron represents the finest quality.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-3xl mb-3">⛰️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mountain Treasure</h3>
                  <p className="text-gray-600 text-sm">
                    Pure Shilajit harvested from the pristine heights of the Himalayas.
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-saffron-500">
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">
                  To preserve and share the authentic treasures of Kashmir while supporting 
                  local communities and maintaining the highest standards of quality.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold text-gray-900 text-center mb-12">
              Our Core Values
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h4>
                <p className="text-gray-600">
                  Every product is genuinely sourced from Kashmir with proper documentation 
                  and certificates of authenticity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h4>
                <p className="text-gray-600">
                  We support sustainable farming practices and fair trade to ensure 
                  the livelihood of local communities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h4>
                <p className="text-gray-600">
                  We maintain the highest standards of quality in every aspect, 
                  from sourcing to packaging and delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Experience the Authentic Kashmir
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of customers who have discovered the true taste of Kashmir 
              through our premium, authentic products.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/shop"
                className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="border border-gray-300 hover:border-saffron-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}