import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@xsystem.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@xsystem.com',
      password: hashedPassword,
      role: 'OWNER',
    },
  })

  // Create provider
  const provider = await prisma.provider.upsert({
    where: { id: 'provider-1' },
    update: {},
    create: {
      id: 'provider-1',
      name: 'Microsoft',
      contactEmail: 'sales@microsoft.com',
    },
  })

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'MS365-BASIC' },
      update: {},
      create: {
        sku: 'MS365-BASIC',
        name: 'Microsoft 365 Business Basic',
        currency: 'COP',
        cost: 15000,
        listPrice: 25000,
        taxRate: 19.0,
        providerId: provider.id,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'MS365-STANDARD' },
      update: {},
      create: {
        sku: 'MS365-STANDARD',
        name: 'Microsoft 365 Business Standard',
        currency: 'COP',
        cost: 25000,
        listPrice: 40000,
        taxRate: 19.0,
        providerId: provider.id,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'MS365-PREMIUM' },
      update: {},
      create: {
        sku: 'MS365-PREMIUM',
        name: 'Microsoft 365 Business Premium',
        currency: 'COP',
        cost: 40000,
        listPrice: 65000,
        taxRate: 19.0,
        providerId: provider.id,
      },
    }),
  ])

  // Create company
  const company = await prisma.company.upsert({
    where: { id: 'company-1' },
    update: {},
    create: {
      id: 'company-1',
      name: 'Empresa Demo S.A.S.',
      nit: '900123456-1',
      billing_email: 'facturacion@empresademo.com',
      phone: '+57 1 234 5678',
      address: 'Calle 123 #45-67, Bogotá',
      ownerId: admin.id,
    },
  })

  // Create contact
  const contact = await prisma.contact.create({
    data: {
      companyId: company.id,
      name: 'Juan Pérez',
      email: 'juan.perez@empresademo.com',
      phone: '+57 1 234 5678',
      role: 'Gerente de TI',
    },
  })

  // Create subscription that expires in 60 days
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 60)
  
  const subscription = await prisma.subscription.create({
    data: {
      companyId: company.id,
      productId: products[0].id,
      qty: 10,
      startAt: new Date(),
      endAt: futureDate,
      nextRenewalAt: futureDate,
      termMonths: 12,
      status: 'active',
    },
  })

  // Create renewal task for T-60
  await prisma.renewalTask.create({
    data: {
      subscriptionId: subscription.id,
      dueAt: new Date(),
      stage: 'T60',
      status: 'queued',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: admin@xsystem.com / admin123`)
  console.log(`🏢 Company: ${company.name}`)
  console.log(`📦 Products: ${products.length}`)
  console.log(`🔄 Subscription expires in 60 days`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
