import { PrismaClient } from '@prisma/client';

const MILLIS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - only if you want fresh data each time)
  // Uncomment if you want to reset data on each seed
  // await prisma.payment.deleteMany();
  // await prisma.subscription.deleteMany();
  // await prisma.account.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.plan.deleteMany();

  // Create test plan (1 rupee test plan)
  const testPlan = await prisma.plan.upsert({
    where: { id: '385b8215-d70f-473e-81c9-68a673c0d2fc-test' },
    update: {},
    create: {
      id: '385b8215-d70f-473e-81c9-68a673c0d2fc-test',
      name: 'Test Plan',
      interval: 'yearly',
      price: 100, // 1 rupee in paise
      currency: 'INR',
    },
  });
  console.log('✅ Created test plan:', testPlan.id);

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      firstName: 'Test User',
      authMethod: 'google',
    },
  });
  console.log('✅ Created test user:', testUser.email);

  // Create test user with premium subscription
  const premiumUser = await prisma.user.upsert({
    where: { email: 'premium@example.com' },
    update: {},
    create: {
      email: 'premium@example.com',
      firstName: 'Premium User',
      authMethod: 'github',
    },
  });
  console.log('✅ Created premium user:', premiumUser.email);

  // Create premium subscription for premium user
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      userId: premiumUser.id,
    },
  });

  const premiumSubscription = existingSubscription
    ? await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          planId: testPlan.id,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + MILLIS_PER_YEAR), // 1 year from now
          autoRenew: true,
        },
      })
    : await prisma.subscription.create({
        data: {
          userId: premiumUser.id,
          planId: testPlan.id,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + MILLIS_PER_YEAR), // 1 year from now
          autoRenew: true,
        },
      });
  console.log('✅ Created/updated premium subscription');

  // Create test payment
  const testPayment = await prisma.payment.upsert({
    where: {
      razorpayPaymentId: 'pay_test_123456789',
    },
    update: {},
    create: {
      userId: premiumUser.id,
      subscriptionId: premiumSubscription.id,
      razorpayPaymentId: 'pay_test_123456789',
      razorpayOrderId: 'order_test_123456789',
      amount: 100, // 1 rupee in paise
      currency: 'INR',
      status: 'captured',
    },
  });
  console.log('✅ Created test payment');

  // Create QueryCount if it doesn't exist
  try {
    await prisma.queryCount.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        total_queries: BigInt(2212),
      },
    });
    console.log('✅ Created QueryCount');
  } catch (error) {
    console.log('⚠️  QueryCount already exists or error:', error);
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

