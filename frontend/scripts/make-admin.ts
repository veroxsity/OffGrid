// Admin utility script to promote a user to admin role
// Run this script: npm run ts-node scripts/make-admin.ts your-email@example.com

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeUserAdmin(email: string) {
  try {
    console.log(`Looking for user with email: ${email}`);
    
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User with email ${email} not found.`);
      console.log('Available users:');
      const allUsers = await prisma.user.findMany({
        select: { email: true, role: true, name: true },
      });
      allUsers.forEach((u: { email: string; name: string | null; role: string }) => {
        console.log(`  - ${u.email} (${u.name || 'No name'}) - Role: ${u.role}`);
      });
      return;
    }

    if (user.role === 'ADMIN') {
      console.log(`✅ User ${email} is already an admin.`);
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });

    console.log(`✅ Successfully promoted ${email} to admin role!`);
    console.log(`User details:`, {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error('❌ Error promoting user to admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address:');
  console.log('Usage: npm run ts-node scripts/make-admin.ts your-email@example.com');
  process.exit(1);
}

makeUserAdmin(email);
