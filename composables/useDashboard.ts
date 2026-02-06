import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export const useDashboard = async () => {
  const user = await getCurrentUser()
  const userId = user.id

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ])

  const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)

  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length
  const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1).length
  const outOfStockCount = allProducts.filter((p) => Number(p.quantity) === 0).length

  const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0
  const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0
  const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0

  const now = new Date()
  const weeklyProductsData = []

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - i * 7)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    weekStart.setHours(23, 59, 59, 999)

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(weekStart.getDate() + 1).padStart(2, '0')}`

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt)
      return productDate >= weekStart && productDate <= weekEnd
    })

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    })
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return {
    totalProducts,
    lowStock,
    allProducts,
    totalValue,
    inStockPercentage,
    lowStockPercentage,
    outOfStockPercentage,
    weeklyProductsData,
    recent,
  }
}
