const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Searching for Belal Bahr in recruitment applications...\n');
  
  const applications = await prisma.recruitmentApplication.findMany({
    where: {
      OR: [
        { fullName: { contains: 'Belal', mode: 'insensitive' } },
        { fullName: { contains: 'Bahr', mode: 'insensitive' } },
        { email: { contains: 'belal', mode: 'insensitive' } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
  
  console.log(`Found ${applications.length} matching application(s):\n`);
  applications.forEach(app => {
    console.log('-------------------');
    console.log(`Name: ${app.fullName}`);
    console.log(`Email: ${app.email}`);
    console.log(`Role: ${app.role}`);
    console.log(`Referral Source: ${app.referralSource || 'N/A'}`);
    console.log(`Resume: ${app.resumePath || 'N/A'}`);
    console.log(`Cloud Storage: ${app.cloud_storage_path || 'N/A'}`);
    console.log(`Created: ${app.createdAt}`);
    console.log('-------------------\n');
  });
  
  // Also get total count
  const total = await prisma.recruitmentApplication.count();
  console.log(`\nTotal recruitment applications in database: ${total}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
