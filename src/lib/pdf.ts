import PDFDocument from 'pdfkit'
import { prisma } from './db'

export async function generateQuotePDF(quoteId: string): Promise<Buffer> {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: {
      company: true,
      contact: true,
      items: {
        include: {
          product: true
        }
      }
    }
  })

  if (!quote) {
    throw new Error('Quote not found')
  }

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
    const buffers: Buffer[] = []

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

    // Header
    doc.fontSize(20).text('COTIZACIÓN', { align: 'center' })
    doc.fontSize(12).text(`#${quote.id}`, { align: 'center' })
    doc.moveDown()

    // Company info
    doc.fontSize(14).text('Información del Cliente', { underline: true })
    doc.fontSize(12)
    doc.text(`Empresa: ${quote.company.name}`)
    if (quote.company.nit) {
      doc.text(`NIT: ${quote.company.nit}`)
    }
    if (quote.contact) {
      doc.text(`Contacto: ${quote.contact.name}`)
      if (quote.contact.email) {
        doc.text(`Email: ${quote.contact.email}`)
      }
    }
    doc.moveDown()

    // Quote details
    doc.text(`Fecha: ${quote.createdAt.toLocaleDateString('es-CO')}`)
    doc.text(`Válida hasta: ${quote.validUntil.toLocaleDateString('es-CO')}`)
    doc.text(`Moneda: ${quote.currency}`)
    doc.moveDown()

    // Items table
    doc.fontSize(14).text('Detalle de Productos/Servicios', { underline: true })
    doc.moveDown()

    // Table header
    const tableTop = doc.y
    const itemCodeX = 50
    const descriptionX = 120
    const qtyX = 350
    const unitPriceX = 400
    const totalX = 500

    doc.fontSize(10)
    doc.text('Código', itemCodeX, tableTop)
    doc.text('Descripción', descriptionX, tableTop)
    doc.text('Cant.', qtyX, tableTop)
    doc.text('Precio Unit.', unitPriceX, tableTop)
    doc.text('Total', totalX, tableTop)

    // Table line
    doc.moveTo(50, tableTop + 15)
    doc.lineTo(550, tableTop + 15)
    doc.stroke()

    let currentY = tableTop + 25

    // Items
    quote.items.forEach((item, index) => {
      doc.text(item.product.sku, itemCodeX, currentY)
      doc.text(item.description || item.product.name, descriptionX, currentY)
      doc.text(item.qty.toString(), qtyX, currentY)
      doc.text(`$${item.unitPrice.toLocaleString('es-CO')}`, unitPriceX, currentY)
      doc.text(`$${item.total.toLocaleString('es-CO')}`, totalX, currentY)
      
      currentY += 20
    })

    // Totals
    currentY += 10
    doc.moveTo(400, currentY)
    doc.lineTo(550, currentY)
    doc.stroke()

    doc.text('Subtotal:', 400, currentY + 10)
    doc.text(`$${quote.subtotal.toLocaleString('es-CO')}`, totalX, currentY + 10)

    if (quote.discount > 0) {
      doc.text('Descuento:', 400, currentY + 30)
      doc.text(`-$${quote.discount.toLocaleString('es-CO')}`, totalX, currentY + 30)
    }

    doc.text('IVA:', 400, currentY + 50)
    doc.text(`$${quote.tax.toLocaleString('es-CO')}`, totalX, currentY + 50)

    doc.fontSize(12)
    doc.text('TOTAL:', 400, currentY + 80)
    doc.text(`$${quote.total.toLocaleString('es-CO')}`, totalX, currentY + 80)

    // Footer
    doc.fontSize(10)
    doc.text('Esta cotización es válida por 30 días a partir de la fecha de emisión.', 50, doc.page.height - 100)
    doc.text('Para más información, contacta a nuestro equipo de ventas.', 50, doc.page.height - 80)

    doc.end()
  })
}
