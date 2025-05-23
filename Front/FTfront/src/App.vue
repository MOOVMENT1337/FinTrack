<script setup lang="ts">
import LoginComponent from './components/LoginRegister/login.vue'
</script>

<template>
  <LoginComponent />
    <router-view />
</template>

<style>
/* Глобальные стили для всего приложения */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #121212;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>