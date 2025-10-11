import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RenewalsPageTemplate } from '@/components/renewals-page-template'

export default async function Renewals7Page() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const subscriptions = [
    {
      id: '10',
      product: 'GitHub Enterprise',
      company: 'Banorte',
      contact: 'Ricardo López',
      email: 'ricardo@banorte.com',
      phone: '+52 81 012 3456',
      licenses: 120,
      monthlyPrice: '$5,400',
      annualPrice: '$64,800',
      renewalDate: '2024-10-17',
      daysUntilRenewal: 7,
      lastContact: '2024-10-10',
      notificationsSent: 6,
      assignedTo: 'María González'
    },
    {
      id: '11',
      product: 'Atlassian Jira Premium',
      company: 'Santander',
      contact: 'Mónica Vargas',
      email: 'monica@santander.com',
      phone: '+52 55 123 4567',
      licenses: 200,
      monthlyPrice: '$8,200',
      annualPrice: '$98,400',
      renewalDate: '2024-10-15',
      daysUntilRenewal: 5,
      lastContact: '2024-10-09',
      notificationsSent: 8,
      assignedTo: 'Carlos Ruiz'
    },
    {
      id: '12',
      product: 'Tableau Cloud',
      company: 'BBVA',
      contact: 'Fernando Castro',
      email: 'fernando@bbva.com',
      phone: '+52 55 234 5678',
      licenses: 80,
      monthlyPrice: '$7,600',
      annualPrice: '$91,200',
      renewalDate: '2024-10-14',
      daysUntilRenewal: 4,
      lastContact: '2024-10-10',
      notificationsSent: 7,
      assignedTo: 'Ana López'
    },
  ]

  return (
    <RenewalsPageTemplate
      title="Renovaciones - 7 días"
      description="Suscripciones que vencen en 7 días o menos - URGENTE"
      days={7}
      subscriptions={subscriptions}
      totalCount={12}
      totalValue="$195K"
      colorScheme={{
        bg: 'bg-red-50 dark:bg-red-950',
        border: 'border-red-200 dark:border-red-900',
        text: 'text-red-600 dark:text-red-400',
        badge: 'bg-red-500 hover:bg-red-600'
      }}
    />
  )
}

