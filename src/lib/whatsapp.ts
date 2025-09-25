const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID

export async function sendWhatsApp(to: string, message: string): Promise<void> {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log('📱 WhatsApp stub - would send to', to, ':', message)
    return
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''), // Remove non-digits
          type: 'text',
          text: { body: message }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.status}`)
    }

    console.log('✅ WhatsApp message sent to', to)
  } catch (error) {
    console.error('❌ WhatsApp send error:', error)
    throw error
  }
}

export async function sendWhatsAppTemplate(
  to: string, 
  templateName: string, 
  parameters: string[]
): Promise<void> {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log('📱 WhatsApp template stub - would send to', to, 'template:', templateName, 'params:', parameters)
    return
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/\D/g, ''),
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'es' },
            components: [
              {
                type: 'body',
                parameters: parameters.map(param => ({ type: 'text', text: param }))
              }
            ]
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`WhatsApp Template API error: ${response.status}`)
    }

    console.log('✅ WhatsApp template sent to', to)
  } catch (error) {
    console.error('❌ WhatsApp template send error:', error)
    throw error
  }
}
