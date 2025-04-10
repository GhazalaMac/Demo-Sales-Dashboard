// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-11-01',
//   devtools: { enabled: true },
//   css: [
//     'ag-grid-community/styles/ag-grid.css',
//     'ag-grid-community/styles/ag-theme-alpine.css'
//   ],
//   plugins: [
//     '~/plugins/supabase.js'  // Ensure this path is correct
//   ]
// });
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr:false,
  css: [
    'ag-grid-community/styles/ag-grid.css',
    'ag-grid-community/styles/ag-theme-alpine.css'
  ],
  plugins: [
    
   // '~/plugins/supabase.js', // Ensure this path is correct for server-side
    // '~/plugins/supabase.client.ts', // Client-side Supabase plugin
    // '~/plugins/powersync.client.ts'  // Client-side PowerSync plugin
  ],

  modules: [
   // '@nuxtjs/supabase', // Supabase module
    // You can add more modules here if needed
  ],
  
  build: {
    transpile: [
      '@powersync/web', // Ensure this package is installed
      'vue-echarts' // ECharts package
    ]
  },
  runtimeConfig:{
    public:{
      SUPABASE_URL: process.env.NUXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      POWERSYNC_INSTANCE_URL: process.env.NUXT_PUBLIC_POWERSYNC_INSTANCE_URL,
      POWERSYNC_PROJECT: process.env.NUXT_PUBLIC_POWERSYNC_PROJECT,
    }
  }
});
