<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    />
    <v-form @submit.prevent="handleLogin">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>

        <v-text-field
          v-model="state.email"
          density="compact"
          :error-messages="v$.email.$errors.map((e: any) => e.$message)"
          placeholder="Correo"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Contraseña

          <a
            class="text-caption text-decoration-none text-surface-variant"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            >¿Olvidó su contraseña de inicio de sesión?</a
          >
        </div>

        <v-text-field
          v-model="state.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :counter="12"
          density="compact"
          placeholder="Ingrese Contraseña"
          prepend-inner-icon="mdi-lock-outline"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Advertencia: Después de 3 intentos fallidos consecutivos de inicio
            de sesión, su cuenta estar temporalmente cerrado durante tres horas.
            Si debe iniciar sesión ahora, puede También haga clic en "¿Olvidó su
            contraseña de inicio de sesión?" a continuación para restablecer la
            contraseña de inicio de sesión.
          </v-card-text>
        </v-card>

        <v-btn
          block
          class="mb-8"
          color="surface-variant"
          size="large"
          type="submit"
          variant="tonal"
        >
          Iniciar Sesión
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-surface-variant text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Regístrate ahora<v-icon icon="mdi-chevron-right" />
          </a>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { login } from "../services/authService";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

const errorMessage = ref<string | null>(null);
const router = useRouter();
const visible = ref(false);

const initialState = {
  email: "",
  password: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const handleLogin = async () => {
  try {
    const response = await login(state.email, state.password);
    localStorage.setItem("authToken", response.access_token);
    localStorage.setItem("refrestToken", response.refresh_token);
    router.push("/"); // Redirige al dashboard o a la página deseada
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style lang="scss" scoped src="../styles/login.scss"></style>
