import Sidebar from '@/components/sidebar'
import Title from '@/components/title'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* Header */}
        <Title title="Dashboard" description="Welcome back! Here is an overview of your inventory." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">Test</div>
      </main>
    </div>
  )
}
