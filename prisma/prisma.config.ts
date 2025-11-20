import { defineConfig } from '@prisma/client'

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
})
