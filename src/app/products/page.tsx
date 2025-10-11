import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductsHero } from '@/components/products-hero'
import { ProductsGrid } from '@/components/products-grid'
import { ProductsCTA } from '@/components/products-cta'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <ProductsCTA />
      <Footer />
    </div>
  )
}

