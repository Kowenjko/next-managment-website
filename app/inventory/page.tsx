import Sidebar from '@/components/sidebar'
import Title from '@/components/title'

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        {/* Header */}
        <Title title="Inventory" description="Manage your products and track inventory levels." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">Test</div>
      </main>
    </div>
  )
}
