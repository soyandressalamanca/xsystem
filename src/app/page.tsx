import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { FAQSection } from '@/components/faq-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ServicesSection } from '@/components/services-section'
import { HeroSection } from '@/components/hero-section'
import { PartnersSection } from '@/components/partners-section'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Partners Section */}
      <PartnersSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
