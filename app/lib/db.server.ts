import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg'
const { Pool } = pkg

let prisma: PrismaClient

declare global {
  var __db__: PrismaClient | undefined
  var __pool__: typeof Pool.prototype | undefined
}

function getPool() {
  if (process.env.NODE_ENV === 'production') {
    return new Pool({ connectionString: process.env.DATABASE_URL })
  } else {
    if (!global.__pool__) {
      global.__pool__ = new Pool({ connectionString: process.env.DATABASE_URL })
    }
    return global.__pool__
  }
}

if (process.env.NODE_ENV === 'production') {
  const pool = getPool()
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
} else {
  if (!global.__db__) {
    const pool = getPool()
    const adapter = new PrismaPg(pool)
    global.__db__ = new PrismaClient({ adapter })
  }
  prisma = global.__db__
}

export { prisma }
