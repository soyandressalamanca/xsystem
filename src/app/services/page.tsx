import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServicesHero } from '@/components/services-hero'
import { ServicesGrid } from '@/components/services-grid'
import { ServicesCTA } from '@/components/services-cta'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
      <Footer />
    </div>
  )
}

