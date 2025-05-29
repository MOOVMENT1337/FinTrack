<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<script setup lang="ts">
import HeaderComponent from '../../components/headerComponent.vue'
import FooterComponent from '../../components/footerComponent.vue'
</script>
