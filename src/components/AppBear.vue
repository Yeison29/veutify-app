<template>
  <v-app-bar
    :elevation="2"
    :scroll-behavior="scrollbehavior()"
    scroll-threshold="1"
  >
    <template v-if="$vuetify.display.mobile" #prepend>
      <v-app-bar-nav-icon @click.stop="actionDrawerMobile()" />
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>
    <template #append>
      <v-btn
        :icon="theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="toggleTheme"
      />
      <v-btn icon="mdi-logout" @click="Logout" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { logout } from "@/services/authService";
import { useRouter } from "vue-router";
import { setTheme, theme } from "@/plugins/vuetify";

const router = useRouter();

const Logout = async () => {
  try {
    await logout();
    router.push({ name: "Login" });
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const scrollbehavior = () => {
  validateDispleyMobile();
  if (store.drawer && store.mobile) {
    return "";
  }
  return "hide";
};

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  setTheme(theme.value);
};
const store = useAppStore();
const { actionDrawerMobile, validateDispleyMobile } = store;
</script>
