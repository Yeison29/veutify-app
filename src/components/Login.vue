<template>
  <div>
    <v-btn
      v-tooltip="
        'Change to ' + (theme === 'dark' ? 'light' : 'darck') + ' theme'
      "
      class="btn-theme"
      :icon="theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
      @click="toggleTheme"
    />
    <v-img class="mx-auto my-6" max-width="100" src="@/assets/logo.svg" />
    <v-form @submit.prevent="handleLogin">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="state.email"
          density="compact"
          :error-messages="v$.email.$errors.map((e: any) => e.$message)"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        />

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
          <a
            class="text-caption text-decoration-none text-surface-variant"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot your login password?</a
          >
        </div>

        <v-text-field
          v-model="state.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :counter="12"
          density="compact"
          placeholder="Password"
          prepend-inner-icon="mdi-lock-outline"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed startup attempts session, your
            account will be temporarily closed for three hours. If you need to
            log in now, you can also click "Forgot your password." login
            password?" below to reset the login password.
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
          Login
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-surface-variant text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Register now<v-icon icon="mdi-chevron-right" />
          </a>
        </v-card-text>
      </v-card>
    </v-form>
    <v-snackbar
      v-model="snackbar.snackbar"
      :close-on-back="true"
      location="top center"
      rounded="pill"
      stacked="true"
      :timeout="snackbar.timeout"
      transition="slide-y-transition"
      variant="tonal"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="red"
          icon="mdi-close-circle"
          variant="text"
          @click="snackbar.snackbar = false"
        />
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { login } from "../services/authService";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { setTheme, theme } from "@/plugins/vuetify";

const router = useRouter();
const visible = ref(false);

const snackbar = ref({
  snackbar: false,
  text: "Invalid Credential",
  timeout: 1000,
});

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
    snackbar.value.snackbar = true;
  }
};

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  setTheme(theme.value);
};
</script>

<style lang="scss" scoped src="../styles/login.scss"></style>
