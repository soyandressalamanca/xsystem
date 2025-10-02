import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about-hero'
import { AboutStats } from '@/components/about-stats'
import { AboutMission } from '@/components/about-mission'
import { AboutPartners } from '@/components/about-partners'
import { AboutCTA } from '@/components/about-cta'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <AboutHero />
      
      {/* Stats Section */}
      <AboutStats />
      
      {/* Mission & Vision */}
      <AboutMission />
      
      {/* Partners Section */}
      <AboutPartners />
      
      {/* CTA Section */}
      <AboutCTA />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
