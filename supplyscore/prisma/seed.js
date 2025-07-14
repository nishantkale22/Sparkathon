const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create sample suppliers
    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Acme Supplies',
            contactEmail: 'contact@acme.com',
            deliveries: {
                create: [
                    {
                        deliveryDate: new Date('2024-07-01'),
                        expectedDate: new Date('2024-07-01'),
                        qualityScore: 95,
                        isCompliant: true,
                    },
                    {
                        deliveryDate: new Date('2024-07-10'),
                        expectedDate: new Date('2024-07-09'),
                        qualityScore: 80,
                        isCompliant: false,
                    },
                    // More dummy deliveries
                    {
                        deliveryDate: new Date('2024-07-15'),
                        expectedDate: new Date('2024-07-15'),
                        qualityScore: 60,
                        isCompliant: false,
                    },
                    {
                        deliveryDate: new Date('2024-07-20'),
                        expectedDate: new Date('2024-07-19'),
                        qualityScore: 72,
                        isCompliant: false,
                    },
                    {
                        deliveryDate: new Date('2024-07-25'),
                        expectedDate: new Date('2024-07-25'),
                        qualityScore: 99,
                        isCompliant: true,
                    },
                ],
            },
        },
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'Beta Logistics',
            contactEmail: 'info@beta-logistics.com',
            deliveries: {
                create: [
                    {
                        deliveryDate: new Date('2024-07-05'),
                        expectedDate: new Date('2024-07-05'),
                        qualityScore: 100,
                        isCompliant: true,
                    },
                    // More dummy deliveries
                    {
                        deliveryDate: new Date('2024-07-12'),
                        expectedDate: new Date('2024-07-12'),
                        qualityScore: 85,
                        isCompliant: true,
                    },
                    {
                        deliveryDate: new Date('2024-07-18'),
                        expectedDate: new Date('2024-07-17'),
                        qualityScore: 78,
                        isCompliant: false,
                    },
                    {
                        deliveryDate: new Date('2024-07-22'),
                        expectedDate: new Date('2024-07-22'),
                        qualityScore: 92,
                        isCompliant: true,
                    },
                ],
            },
        },
    });

    const supplier3 = await prisma.supplier.create({
        data: {
            name: 'Gamma Traders',
            contactEmail: 'hello@gammatraders.com',
            deliveries: {
                create: [
                    {
                        deliveryDate: new Date('2024-07-12'),
                        expectedDate: new Date('2024-07-12'),
                        qualityScore: 90,
                        isCompliant: true,
                    },
                    // More dummy deliveries
                    {
                        deliveryDate: new Date('2024-07-19'),
                        expectedDate: new Date('2024-07-18'),
                        qualityScore: 65,
                        isCompliant: false,
                    },
                    {
                        deliveryDate: new Date('2024-07-23'),
                        expectedDate: new Date('2024-07-23'),
                        qualityScore: 88,
                        isCompliant: true,
                    },
                ],
            },
        },
    });

    const supplier4 = await prisma.supplier.create({
        data: {
            name: 'Delta Distribution',
            contactEmail: 'contact@deltadistribution.com',
            deliveries: {
                create: [
                    {
                        deliveryDate: new Date('2024-07-15'),
                        expectedDate: new Date('2024-07-14'),
                        qualityScore: 70,
                        isCompliant: false,
                    },
                    {
                        deliveryDate: new Date('2024-07-18'),
                        expectedDate: new Date('2024-07-18'),
                        qualityScore: 85,
                        isCompliant: true,
                    },
                    // More dummy deliveries
                    {
                        deliveryDate: new Date('2024-07-22'),
                        expectedDate: new Date('2024-07-22'),
                        qualityScore: 90,
                        isCompliant: true,
                    },
                    {
                        deliveryDate: new Date('2024-07-28'),
                        expectedDate: new Date('2024-07-27'),
                        qualityScore: 60,
                        isCompliant: false,
                    },
                ],
            },
        },
    });

    const supplier5 = await prisma.supplier.create({
        data: {
            name: 'Epsilon Exports',
            contactEmail: 'sales@epsilonexports.com',
            deliveries: {
                create: [
                    {
                        deliveryDate: new Date('2024-07-20'),
                        expectedDate: new Date('2024-07-20'),
                        qualityScore: 88,
                        isCompliant: true,
                    },
                    // More dummy deliveries
                    {
                        deliveryDate: new Date('2024-07-25'),
                        expectedDate: new Date('2024-07-25'),
                        qualityScore: 95,
                        isCompliant: true,
                    },
                    {
                        deliveryDate: new Date('2024-07-30'),
                        expectedDate: new Date('2024-07-29'),
                        qualityScore: 70,
                        isCompliant: false,
                    },
                ],
            },
        },
    });

    console.log('Seed data created:', { supplier1, supplier2, supplier3, supplier4, supplier5 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 