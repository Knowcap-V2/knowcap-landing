require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Checking Beta Applications...');
    const betaApps = await prisma.betaApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('Total Beta Applications:', betaApps.length);
    console.log('Beta Applications:', JSON.stringify(betaApps, null, 2));
    
    console.log('\n\nChecking Contact Submissions...');
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('Total Contact Submissions:', contacts.length);
    
    console.log('\n\nChecking Recruitment Applications...');
    const recruitments = await prisma.recruitmentApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    console.log('Total Recruitment Applications:', recruitments.length);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
