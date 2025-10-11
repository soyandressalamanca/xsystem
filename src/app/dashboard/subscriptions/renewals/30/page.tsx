import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { RenewalsPageTemplate } from '@/components/renewals-page-template'

export default async function Renewals30Page() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Mock data
  const subscriptions = [
    {
      id: '7',
      product: 'Zoom Business Plus',
      company: 'Soriana',
      contact: 'Luis Torres',
      email: 'luis@soriana.com',
      phone: '+52 81 789 0123',
      licenses: 400,
      monthlyPrice: '$6,800',
      annualPrice: '$81,600',
      renewalDate: '2024-11-09',
      daysUntilRenewal: 30,
      lastContact: '2024-10-08',
      notificationsSent: 4,
      assignedTo: 'Carlos Ruiz'
    },
    {
      id: '8',
      product: 'Dropbox Business Advanced',
      company: 'Coppel',
      contact: 'Patricia Ruiz',
      email: 'patricia@coppel.com',
      phone: '+52 667 890 1234',
      licenses: 180,
      monthlyPrice: '$4,500',
      annualPrice: '$54,000',
      renewalDate: '2024-11-11',
      daysUntilRenewal: 32,
      lastContact: '2024-10-10',
      notificationsSent: 3,
      assignedTo: 'Ana López'
    },
    {
      id: '9',
      product: 'Slack Enterprise',
      company: 'Telmex',
      contact: 'Jorge Hernández',
      email: 'jorge@telmex.com',
      phone: '+52 55 901 2345',
      licenses: 550,
      monthlyPrice: '$9,900',
      annualPrice: '$118,800',
      renewalDate: '2024-11-07',
      daysUntilRenewal: 28,
      lastContact: '2024-10-09',
      notificationsSent: 5,
      assignedTo: 'Juan Pérez'
    },
  ]

  return (
    <RenewalsPageTemplate
      title="Renovaciones - 30 días"
      description="Suscripciones que vencen en los próximos 30 días - ALTA PRIORIDAD"
      days={30}
      subscriptions={subscriptions}
      totalCount={18}
      totalValue="$315K"
      colorScheme={{
        bg: 'bg-orange-50 dark:bg-orange-950',
        border: 'border-orange-200 dark:border-orange-900',
        text: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-500 hover:bg-orange-600'
      }}
    />
  )
}

