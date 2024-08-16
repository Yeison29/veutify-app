<template>
  <v-responsive class="border rounded">
    <v-main class="v-main">
      <AppBear />
      <NavigationDrawer />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-responsive>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped src="../styles/default.scss"></style>
