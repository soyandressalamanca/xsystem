import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

const WOMPI_EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-signature')

    // Verify signature
    if (WOMPI_EVENTS_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', WOMPI_EVENTS_SECRET)
        .update(JSON.stringify(body))
        .digest('hex')

      if (signature !== expectedSignature) {
        console.error('❌ Invalid Wompi signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
      }
    }

    console.log('💰 Wompi webhook received:', body)

    // Handle different event types
    switch (body.event) {
      case 'transaction.updated':
        await handleTransactionUpdate(body.data)
        break
      case 'transaction.created':
        await handleTransactionCreated(body.data)
        break
      default:
        console.log(`ℹ️ Unhandled Wompi event: ${body.event}`)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Wompi webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleTransactionUpdate(transaction: any) {
  try {
    const { id, status, reference } = transaction

    console.log(`🔄 Processing transaction update: ${id} - ${status}`)

    // Find payment by external reference
    const payment = await prisma.payment.findFirst({
      where: { externalRef: reference },
      include: { quote: true }
    })

    if (!payment) {
      console.log(`❌ Payment not found for reference: ${reference}`)
      return
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status }
    })

    // Handle successful payment
    if (status === 'APPROVED') {
      await handleSuccessfulPayment(payment)
    }

    console.log(`✅ Payment ${payment.id} updated to status: ${status}`)
  } catch (error) {
    console.error('Error handling transaction update:', error)
  }
}

async function handleTransactionCreated(transaction: any) {
  try {
    const { id, reference, amount, currency } = transaction

    console.log(`💰 New transaction created: ${id} for ${amount} ${currency}`)

    // Find quote by reference
    const quote = await prisma.quote.findFirst({
      where: { id: reference }
    })

    if (!quote) {
      console.log(`❌ Quote not found for reference: ${reference}`)
      return
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        quoteId: quote.id,
        provider: 'wompi',
        amount: parseFloat(amount),
        currency,
        status: 'PENDING',
        externalRef: id
      }
    })

    console.log(`✅ Payment record created for quote ${quote.id}`)
  } catch (error) {
    console.error('Error handling transaction created:', error)
  }
}

async function handleSuccessfulPayment(payment: any) {
  try {
    // Update quote status
    await prisma.quote.update({
      where: { id: payment.quoteId },
      data: { status: 'paid' }
    })

    // Find related subscription and update renewal date
    const subscription = await prisma.subscription.findFirst({
      where: {
        companyId: payment.quote.companyId,
        status: 'active'
      }
    })

    if (subscription) {
      // Extend subscription by 12 months
      const newEndDate = new Date(subscription.endAt)
      newEndDate.setFullYear(newEndDate.getFullYear() + 1)
      
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          endAt: newEndDate,
          nextRenewalAt: newEndDate
        }
      })

      console.log(`✅ Subscription ${subscription.id} extended until ${newEndDate}`)
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        entity: 'Payment',
        entityId: payment.id,
        action: 'PAYMENT_APPROVED',
        diff: {
          status: 'APPROVED',
          amount: payment.amount,
          currency: payment.currency
        }
      }
    })

    console.log(`✅ Successful payment processed for quote ${payment.quoteId}`)
  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}
