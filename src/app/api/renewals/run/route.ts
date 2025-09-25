import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { processRenewalStage } from '@/lib/renewals'
import { requirePermission } from '@/lib/rbac'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    requirePermission(session.user.role as any, 'renewals:run')

    const { searchParams } = new URL(request.url)
    const stage = searchParams.get('stage') as 'T60' | 'T30' | 'T7'

    if (!stage || !['T60', 'T30', 'T7'].includes(stage)) {
      return NextResponse.json({ error: 'Invalid stage. Must be T60, T30, or T7' }, { status: 400 })
    }

    console.log(`🔄 Running renewal process for stage: ${stage}`)
    
    await processRenewalStage(stage)

    return NextResponse.json({ 
      message: `Renewal process completed for stage ${stage}`,
      stage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error running renewal process:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
