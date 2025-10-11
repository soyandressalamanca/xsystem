import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RenewalsPageTemplate } from '@/components/renewals-page-template'

export default async function Renewals90Page() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data - reemplazar con datos reales
  const subscriptions = [
    {
      id: '1',
      product: 'Microsoft 365 E5',
      company: 'Grupo Modelo',
      contact: 'Roberto Sánchez',
      email: 'roberto@grupomodelo.com',
      phone: '+52 55 1234 5678',
      licenses: 500,
      monthlyPrice: '$15,000',
      annualPrice: '$180,000',
      renewalDate: '2025-01-08',
      daysUntilRenewal: 90,
      lastContact: '2024-10-09',
      notificationsSent: 1,
      assignedTo: 'Juan Pérez'
    },
    {
      id: '2',
      product: 'Salesforce Enterprise',
      company: 'FEMSA',
      contact: 'Laura Martínez',
      email: 'laura@femsa.com',
      phone: '+52 811 234 5678',
      licenses: 300,
      monthlyPrice: '$18,000',
      annualPrice: '$216,000',
      renewalDate: '2025-01-10',
      daysUntilRenewal: 92,
      lastContact: '2024-10-08',
      notificationsSent: 2,
      assignedTo: 'María González'
    },
    {
      id: '3',
      product: 'Adobe Creative Cloud',
      company: 'Televisa',
      contact: 'Pedro Ramírez',
      email: 'pedro@televisa.com',
      phone: '+52 55 345 6789',
      licenses: 250,
      monthlyPrice: '$10,500',
      annualPrice: '$126,000',
      renewalDate: '2025-01-05',
      daysUntilRenewal: 87,
      lastContact: '2024-10-05',
      notificationsSent: 0,
      assignedTo: 'Carlos Ruiz'
    },
  ]

  return (
    <RenewalsPageTemplate
      title="Renovaciones - 90 días"
      description="Suscripciones que vencen en los próximos 90 días"
      days={90}
      subscriptions={subscriptions}
      totalCount={14}
      totalValue="$285K"
      colorScheme={{
        bg: 'bg-blue-50 dark:bg-blue-950',
        border: 'border-blue-200 dark:border-blue-900',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-500 hover:bg-blue-600'
      }}
    />
  )
}

