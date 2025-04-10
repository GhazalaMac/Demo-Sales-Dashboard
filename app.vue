<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template> -->
<template>
  <div class="app-container">
    <!--Header or Sidebar -->
    <header class="header-main">
      <h1>My Sales Dashboard</h1>
    </header>
    
    <main>
      <!-- This is where Nuxt pages get injected -->
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer-main">
      <p>&copy; 2025 Ghazala Mac</p>
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Styles */
.app-container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-main {
  background-color: #2c3e50;
  color: #fff;
  padding: 15px;
  text-align: center;
}

footer.footer-main {
  background-color: #34495e;
  color: #fff;
  padding: 10px;
  text-align: center;
  margin-top: auto;
}
</style>
