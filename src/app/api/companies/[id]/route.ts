import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { requirePermission } from '@/lib/rbac'

const updateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  nit: z.string().optional(),
  billing_email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const company = await prisma.company.findUnique({
      where: { id: params.id },
      include: {
        owner: { select: { name: true, email: true } },
        contacts: true,
        quotes: {
          include: {
            contact: true,
            _count: { select: { items: true } }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        subscriptions: {
          include: {
            product: true
          },
          orderBy: { nextRenewalAt: 'asc' }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 20
        }
      }
    })

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    requirePermission(session.user.role as any, 'companies:write')

    const body = await request.json()
    const data = updateCompanySchema.parse(body)

    const company = await prisma.company.update({
      where: { id: params.id },
      data,
      include: {
        owner: { select: { name: true, email: true } }
      }
    })

    return NextResponse.json(company)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    
    console.error('Error updating company:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    requirePermission(session.user.role as any, 'companies:delete')

    await prisma.company.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Company deleted successfully' })
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
