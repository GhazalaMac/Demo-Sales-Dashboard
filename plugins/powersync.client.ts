// plugins/powersync.client.ts
import { PowerSyncDatabase, Schema, Table, column } from '@powersync/web'
import SQLiteESMFactory from '@journeyapps/wa-sqlite/dist/wa-sqlite.mjs'

export default defineNuxtPlugin(async (nuxtApp) => {
  const sqlite = await SQLiteESMFactory()
  const db = new sqlite.Database()

  // Define your synced tables
  const monthly_sales = new Table({
    product: column.text,
    category: column.text,
    month: column.text,
    sales: column.integer
  })

  const product_sales = new Table({
    product: column.text,
    month: column.text,
    revenue: column.integer
  })

  const schema = new Schema({ monthly_sales, product_sales })

  const powersync = new PowerSyncDatabase({
    schema,
    database: db
  })

  nuxtApp.provide('powersync', powersync)

  console.log('[PowerSync] Initialized v1 client and injected into app')
})
