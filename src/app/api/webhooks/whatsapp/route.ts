import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ WhatsApp webhook verified')
    return new NextResponse(challenge)
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle incoming messages
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'messages') {
            for (const message of change.value.messages || []) {
              await handleIncomingMessage(message)
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleIncomingMessage(message: any) {
  try {
    const phoneNumber = message.from
    const messageText = message.text?.body || ''
    const messageId = message.id

    console.log(`📱 Incoming WhatsApp from ${phoneNumber}: ${messageText}`)

    // Find company by phone number
    const company = await prisma.company.findFirst({
      where: {
        OR: [
          { phone: { contains: phoneNumber } },
          { contacts: { some: { phone: { contains: phoneNumber } } } }
        ]
      }
    })

    if (!company) {
      console.log(`❌ No company found for phone ${phoneNumber}`)
      return
    }

    // Save message to database
    await prisma.message.create({
      data: {
        companyId: company.id,
        channel: 'whatsapp',
        direction: 'in',
        body: messageText,
        meta: {
          messageId,
          phoneNumber,
          timestamp: new Date().toISOString()
        }
      }
    })

    // Simple response logic
    const response = generateResponse(messageText)
    
    if (response) {
      // TODO: Implement WhatsApp sending logic
      console.log(`📤 Would send WhatsApp response to ${phoneNumber}: ${response}`)
    }

  } catch (error) {
    console.error('Error handling incoming message:', error)
  }
}

function generateResponse(messageText: string): string | null {
  const text = messageText.toLowerCase().trim()
  
  if (text.includes('sí') || text.includes('si') || text.includes('yes')) {
    return '¡Perfecto! Te enviaremos una cotización actualizada en los próximos minutos. ¿Podrías confirmarnos tu email para enviarte la cotización?'
  }
  
  if (text.includes('no') || text.includes('not interested')) {
    return 'Entendido. Si cambias de opinión en el futuro, no dudes en contactarnos. ¡Gracias por tu tiempo!'
  }
  
  if (text.includes('precio') || text.includes('costo') || text.includes('cotización')) {
    return 'Te enviaremos una cotización detallada con los precios actualizados. ¿Podrías confirmarnos tu email?'
  }
  
  if (text.includes('email') || text.includes('correo')) {
    return 'Perfecto, hemos registrado tu email. Te enviaremos la cotización en breve.'
  }
  
  return 'Gracias por tu mensaje. Nuestro equipo de ventas se pondrá en contacto contigo pronto.'
}
