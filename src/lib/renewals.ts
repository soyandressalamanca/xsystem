import { prisma } from './db'
import { sendWhatsApp } from './whatsapp'
import { sendEmail } from './email'

export type RenewalStage = 'T60' | 'T30' | 'T7'

export interface RenewalData {
  subscriptionId: string
  companyName: string
  productName: string
  qty: number
  endDate: Date
  quoteId?: string
  contactEmail?: string
  contactPhone?: string
}

export async function findDueSubscriptions(stageDays: 60 | 30 | 7): Promise<RenewalData[]> {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + stageDays)
  
  const subscriptions = await prisma.subscription.findMany({
    where: {
      nextRenewalAt: {
        lte: targetDate,
        gte: new Date()
      },
      status: 'active'
    },
    include: {
      company: {
        include: {
          contacts: {
            where: {
              role: { in: ['Gerente de TI', 'Director', 'CEO', 'CTO'] }
            },
            take: 1
          }
        }
      },
      product: true
    }
  })

  return subscriptions.map(sub => ({
    subscriptionId: sub.id,
    companyName: sub.company.name,
    productName: sub.product.name,
    qty: sub.qty,
    endDate: sub.endAt,
    contactEmail: sub.company.contacts[0]?.email,
    contactPhone: sub.company.contacts[0]?.phone
  }))
}

export async function ensurePreQuote(subscriptionId: string): Promise<string> {
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: {
      company: {
        include: {
          contacts: { take: 1 }
        }
      },
      product: true
    }
  })

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  // Check if there's already a draft quote for this renewal
  const existingQuote = await prisma.quote.findFirst({
    where: {
      companyId: subscription.companyId,
      status: 'draft',
      validUntil: { gte: new Date() }
    }
  })

  if (existingQuote) {
    return existingQuote.id
  }

  // Create new quote
  const quote = await prisma.quote.create({
    data: {
      companyId: subscription.companyId,
      contactId: subscription.company.contacts[0]?.id,
      ownerId: subscription.company.ownerId || 'admin',
      status: 'draft',
      currency: subscription.product.currency,
      subtotal: subscription.product.listPrice * subscription.qty,
      discount: 0,
      tax: 0,
      total: subscription.product.listPrice * subscription.qty,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      items: {
        create: {
          productId: subscription.productId,
          description: `Renovación ${subscription.product.name}`,
          qty: subscription.qty,
          unitPrice: subscription.product.listPrice,
          discountPct: 0,
          taxRate: subscription.product.taxRate,
          total: subscription.product.listPrice * subscription.qty
        }
      }
    }
  })

  return quote.id
}

export function buildTemplate(stage: RenewalStage, data: RenewalData): { whatsapp: string; email: string } {
  const daysLeft = Math.ceil((data.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const whatsapp = `🔄 *Renovación de Servicio*

Hola! Te contactamos desde XSystem para recordarte que tu suscripción de *${data.productName}* vence en ${daysLeft} días.

📦 *Producto:* ${data.productName}
📊 *Cantidad:* ${data.qty} licencias
📅 *Fecha de vencimiento:* ${data.endDate.toLocaleDateString('es-CO')}

¿Te gustaría renovar tu suscripción? Podemos enviarte una cotización actualizada.

Responde SÍ para recibir la cotización o NO si no estás interesado.`

  const email = `Renovación de Servicio - ${data.productName}

Estimado/a,

Te contactamos para recordarte que tu suscripción de ${data.productName} vence en ${daysLeft} días.

Detalles:
- Producto: ${data.productName}
- Cantidad: ${data.qty} licencias
- Fecha de vencimiento: ${data.endDate.toLocaleDateString('es-CO')}

¿Te gustaría renovar tu suscripción? Podemos enviarte una cotización actualizada.

Por favor, responde a este email o contacta a nuestro equipo de ventas.

Saludos cordiales,
Equipo XSystem`

  return { whatsapp, email }
}

export async function processRenewalStage(stage: RenewalStage): Promise<void> {
  const stageDays = stage === 'T60' ? 60 : stage === 'T30' ? 30 : 7
  const subscriptions = await findDueSubscriptions(stageDays)
  
  console.log(`🔄 Processing ${stage} renewals for ${subscriptions.length} subscriptions`)

  for (const data of subscriptions) {
    try {
      // Create renewal task
      await prisma.renewalTask.create({
        data: {
          subscriptionId: data.subscriptionId,
          dueAt: new Date(),
          stage,
          status: 'queued'
        }
      })

      // Ensure pre-quote exists
      const quoteId = await ensurePreQuote(data.subscriptionId)

      // Build templates
      const templates = buildTemplate(stage, { ...data, quoteId })

      // Send messages
      if (data.contactPhone) {
        await sendWhatsApp(data.contactPhone, templates.whatsapp)
      }
      
      if (data.contactEmail) {
        await sendEmail(data.contactEmail, `Renovación ${stage} - ${data.productName}`, templates.email)
      }

      // Update task status
      await prisma.renewalTask.updateMany({
        where: {
          subscriptionId: data.subscriptionId,
          stage,
          status: 'queued'
        },
        data: {
          status: 'sent'
        }
      })

      console.log(`✅ Processed renewal for ${data.companyName}`)
    } catch (error) {
      console.error(`❌ Error processing renewal for ${data.companyName}:`, error)
      
      // Mark task as failed
      await prisma.renewalTask.updateMany({
        where: {
          subscriptionId: data.subscriptionId,
          stage,
          status: 'queued'
        },
        data: {
          status: 'failed'
        }
      })
    }
  }
}
