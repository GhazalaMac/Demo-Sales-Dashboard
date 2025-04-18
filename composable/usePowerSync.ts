// composables/usePowerSyncClient.ts

export const usePowerSyncClient = async () => {
  const client = inject('powersync')
  if (!client) {
    throw new Error('[PowerSync] Client not available — did you register the plugin?')
  }
  return client
}
