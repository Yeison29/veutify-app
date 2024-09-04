<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    location="top center"
    rounded="pill"
    stacked="true"
    :timeout="snackbar.timeout"
    transition="slide-y-transition"
    variant="tonal"
  >
    <div class="d-flex justify-space-between align-center" style="width: 100%">
      <strong>{{ snackbar.message }}</strong>
      <v-icon class="mr-2">{{ snackbar.icon }}</v-icon>
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { detectCurrentTheme, setTheme, theme } from "@/plugins/vuetify";
import { useAppStore } from "@/stores/app";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { App } from "@capacitor/app";
import { Dialog } from "@capacitor/dialog";

const router = useRouter();

onMounted(() => {
  App.addListener("backButton", async () => {
    // Obtiene la ruta actual
    const currentRoute = router.currentRoute.value;

    // Redirige al Dashboard si está en "File", "Share", o "Shement"
    if (["File", "Shared", "Starred"].includes(currentRoute.name)) {
      router.push({ name: "Dasboard" });
    } else if (
      currentRoute.name === "Dasboard" ||
      currentRoute.name === "Login"
    ) {
      const { value } = await Dialog.confirm({
        title: "Cerrar App",
        message: "¿Deseas salir de la aplicación?",
      });

      if (value) {
        App.exitApp();
      }
    } else {
      window.history.back(); // Retrocede si no está en las rutas mencionadas
    }
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    console.log("cambio");
    theme.value = detectCurrentTheme();
    setTheme(theme.value);
  });

const store = useAppStore();

const snackbar = computed(() => store.snackbar);
</script>
