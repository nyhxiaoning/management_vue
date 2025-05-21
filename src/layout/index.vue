<template>
  <div v-if="isAuthenticated" class="flex">
    <div class="h-screen">
      <sidebar />
    </div>
    <div class="flex-1 overflow-auto">
      <navbar />
      <appmain />
    </div>
  </div>
  <router-view v-else />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Storage } from "@/utils/storage";
import sidebar from "./components/sidebar.vue";
import navbar from "./components/navbar.vue";
import appmain from "./components/appmain.vue";

/**
 * States
 */
const isAuthenticated = computed(() => {
  return !!Storage.get("token");
});
</script>
