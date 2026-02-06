import Sidebar from '@/components/sidebar'
import Title from '@/components/title'
import { getCurrentUser } from '@/lib/auth'
import { AccountSettings } from '@stackframe/stack'

export default async function SettingsPage() {
  const user = await getCurrentUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/settings" />

      <main className="ml-64 p-8">
        {/* Header */}
        <Title title="Settings" description="Manage your account settings and preferences." />
        <div className="max-w-6xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  )
}
