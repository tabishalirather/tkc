import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryHighlights from '@/components/home/CategoryHighlights'
import TrustSection from '@/components/home/TrustSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import StorySection from '@/components/home/StorySection'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div className="bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <CategoryHighlights />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProducts />
      </Suspense>

      <TrustSection />

      <StorySection />

      <NewsletterSection />
    </div>
  )
}
