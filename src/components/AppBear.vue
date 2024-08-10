<template>
  <v-app-bar
    :elevation="2"
    :scroll-behavior="store.drawer && store.mobile ? '' : 'hide'"
    scroll-threshold="1"
  >
    <template v-if="$vuetify.display.mobile" #prepend>
      <v-app-bar-nav-icon @click.stop="actionDrawerMobile()" />
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>
    <template #append>
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-logout" @click="Logout" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { logout } from "@/services/authService";
import { useRouter } from 'vue-router';

const router = useRouter();

const Logout = async () => {
  try {
    await logout();
    router.push({ name: "Login" });
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const store = useAppStore();
const { actionDrawerMobile } = store;
</script>
