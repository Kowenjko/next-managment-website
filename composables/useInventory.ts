import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export const useInventory = async ({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) => {
  const user = await getCurrentUser()
  const userId = user.id

  const params = await searchParams
  const q = (params.q ?? '').trim()
  const page = Math.max(1, Number(params.page ?? 1))
  const pageSize = 10

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
  }

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return { totalPages, page, items, q, pageSize }
}
