<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '../../components/headerComponent.vue'
import FooterComponent from '../../components/footerComponent.vue'
</script>
