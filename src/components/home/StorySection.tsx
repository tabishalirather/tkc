export default function StorySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-walnut-500">Our sourcing</p>
            <h2 className="font-serif text-3xl font-semibold text-walnut-900 md:text-4xl">
              From Kashmir valleys to your kitchen shelf.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-walnut-700 md:text-base">
              We work directly with growers and small cooperatives to source saffron, shilajit, honey, walnuts, and almonds at peak quality. Every batch is tested, packed carefully, and shipped fresh.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-semibold text-walnut-900">100+</p>
                <p className="text-xs uppercase tracking-[0.12em] text-walnut-600">Partner growers</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-walnut-900">15+</p>
                <p className="text-xs uppercase tracking-[0.12em] text-walnut-600">Years sourcing</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-walnut-900">50K+</p>
                <p className="text-xs uppercase tracking-[0.12em] text-walnut-600">Orders delivered</p>
              </div>
            </div>

            <a href="/about" className="mt-6 inline-block text-sm font-medium text-saffron-700 hover:text-saffron-600">
              Learn more about our process &gt;
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-sm bg-[#ece9e2]">
              <img
                src="https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=1600&q=80"
                alt="Kashmir landscape"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#ece9e2]">
              <img
                src="https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80"
                alt="Walnuts closeup"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#ece9e2]">
              <img
                src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80"
                alt="Honey closeup"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
