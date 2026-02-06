import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
	const demoUserId = 'f70f6bb4-8122-45b3-8ccc-eb086737803c'

	// Create sample products
	await prisma.product.createMany({
		data: Array.from({ length: 25 }).map((_, i) => ({
			userId: demoUserId,
			name: `Product ${i + 1}`,
			price: (Math.random() * 90 + 10).toFixed(2),
			quantity: Math.floor(Math.random() * 20),
			lowStockAt: 5,
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
		})),
	})

	console.log('Seed data created successfully!')
	console.log(`Created 25 products for user ID: ${demoUserId}`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
