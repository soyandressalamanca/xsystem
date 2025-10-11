import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RenewalsPageTemplate } from '@/components/renewals-page-template'

export default async function Renewals60Page() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const subscriptions = [
    {
      id: '4',
      product: 'Autodesk AutoCAD',
      company: 'Cemex',
      contact: 'Ana Flores',
      email: 'ana@cemex.com',
      phone: '+52 818 456 7890',
      licenses: 150,
      monthlyPrice: '$12,000',
      annualPrice: '$144,000',
      renewalDate: '2024-12-09',
      daysUntilRenewal: 60,
      lastContact: '2024-10-07',
      notificationsSent: 2,
      assignedTo: 'Ana López'
    },
    {
      id: '5',
      product: 'Oracle Database',
      company: 'Bimbo',
      contact: 'Carlos Mendoza',
      email: 'carlos@bimbo.com',
      phone: '+52 55 567 8901',
      licenses: 200,
      monthlyPrice: '$22,000',
      annualPrice: '$264,000',
      renewalDate: '2024-12-11',
      daysUntilRenewal: 62,
      lastContact: '2024-10-09',
      notificationsSent: 3,
      assignedTo: 'Juan Pérez'
    },
    {
      id: '6',
      product: 'SAP Business One',
      company: 'Liverpool',
      contact: 'María Santos',
      email: 'maria@liverpool.com',
      phone: '+52 33 678 9012',
      licenses: 100,
      monthlyPrice: '$8,500',
      annualPrice: '$102,000',
      renewalDate: '2024-12-08',
      daysUntilRenewal: 59,
      lastContact: '2024-10-06',
      notificationsSent: 1,
      assignedTo: 'María González'
    },
  ]

  return (
    <RenewalsPageTemplate
      title="Renovaciones - 60 días"
      description="Suscripciones que vencen en los próximos 60 días - Seguimiento activo"
      days={60}
      subscriptions={subscriptions}
      totalCount={24}
      totalValue="$420K"
      colorScheme={{
        bg: 'bg-yellow-50 dark:bg-yellow-950',
        border: 'border-yellow-200 dark:border-yellow-900',
        text: 'text-yellow-600 dark:text-yellow-400',
        badge: 'bg-yellow-500 hover:bg-yellow-600'
      }}
    />
  )
}

