import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_FROM = process.env.EMAIL_FROM || 'notificaciones@xsystem.com'

export async function sendEmail(
  to: string, 
  subject: string, 
  html: string,
  text?: string
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('📧 Email stub - would send to', to, 'subject:', subject)
    console.log('Content:', html)
    return
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    })

    if (error) {
      throw new Error(`Resend error: ${error.message}`)
    }

    console.log('✅ Email sent to', to, 'ID:', data?.id)
  } catch (error) {
    console.error('❌ Email send error:', error)
    throw error
  }
}

export async function sendRenewalEmail(
  to: string,
  companyName: string,
  productName: string,
  endDate: Date,
  quoteId?: string
): Promise<void> {
  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  const subject = `Renovación de Servicio - ${productName}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Renovación de Servicio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { padding: 20px; }
        .button { 
          display: inline-block; 
          background: #007bff; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 10px 0;
        }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔄 Renovación de Servicio</h1>
        </div>
        
        <div class="content">
          <p>Estimado/a,</p>
          
          <p>Te contactamos desde <strong>XSystem</strong> para recordarte que tu suscripción de <strong>${productName}</strong> vence en <strong>${daysLeft} días</strong>.</p>
          
          <h3>Detalles de la Suscripción:</h3>
          <ul>
            <li><strong>Empresa:</strong> ${companyName}</li>
            <li><strong>Producto:</strong> ${productName}</li>
            <li><strong>Fecha de vencimiento:</strong> ${endDate.toLocaleDateString('es-CO')}</li>
          </ul>
          
          <p>¿Te gustaría renovar tu suscripción? Podemos enviarte una cotización actualizada con las mejores condiciones.</p>
          
          ${quoteId ? `
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/quotes/${quoteId}" class="button">
              Ver Cotización
            </a>
          ` : `
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" class="button">
              Solicitar Cotización
            </a>
          `}
          
          <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
        </div>
        
        <div class="footer">
          <p>Saludos cordiales,<br>
          <strong>Equipo XSystem</strong></p>
          <p>Este es un mensaje automático. Por favor, no respondas a este email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  await sendEmail(to, subject, html)
}
