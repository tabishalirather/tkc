import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AccountSidebar from '@/components/account/AccountSidebar'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <AccountSidebar user={session.user} />
          </aside>

          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}