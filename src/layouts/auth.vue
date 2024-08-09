<template>
  <v-responsive class="border rounded" height="100%">
    <v-main height="100%">
      <v-container class="container">
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-responsive>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped src="../styles/auth.scss"></style>
