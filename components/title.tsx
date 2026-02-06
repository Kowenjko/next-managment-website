export default function Title({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500"> {description}</p>
        </div>
      </div>
    </div>
  )
}
