// plugins/supabase.js

import { createClient } from '@supabase/supabase-js';

// Supabase URL and key
const supabaseUrl = 'https://zunhtytidfigjjkzzzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1bmh0eXRpZGZpZ2pqa3p6enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTI2MjcsImV4cCI6MjA1OTc4ODYyN30.qPl8JhtEJCROvJtfqmfyuzt8iox3TEyzojF24fNCWKM';  // Replace with your actual key

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the instance of supabase
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('supabase', supabase); // Inject supabase into your app
});

