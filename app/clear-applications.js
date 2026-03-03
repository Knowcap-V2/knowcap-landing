require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function clearApplications() {
  try {
    const result = await prisma.betaApplication.deleteMany({})
    console.log(`✅ Deleted ${result.count} applications from database`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

clearApplications()
