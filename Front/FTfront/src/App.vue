<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'

onMounted(() => {
  const store = useUserStore()
  store.initializeFromLocalStorage()
})
</script>

<template>
  <router-view />
</template>

<style>
/* Глобальные стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #000000;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
