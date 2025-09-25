import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { requirePermission } from '@/lib/rbac'

const createCompanySchema = z.object({
  name: z.string().min(1),
  nit: z.string().optional(),
  billing_email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const companies = await prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nit: { contains: query, mode: 'insensitive' } },
        ]
      },
      include: {
        owner: { select: { name: true, email: true } },
        _count: {
          select: {
            contacts: true,
            quotes: true,
            subscriptions: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.company.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { nit: { contains: query, mode: 'insensitive' } },
        ]
      }
    })

    return NextResponse.json({
      companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    requirePermission(session.user.role as any, 'companies:write')

    const body = await request.json()
    const data = createCompanySchema.parse(body)

    const company = await prisma.company.create({
      data: {
        ...data,
        ownerId: session.user.id
      },
      include: {
        owner: { select: { name: true, email: true } }
      }
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    
    console.error('Error creating company:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
