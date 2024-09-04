<template>
  <v-responsive class="border rounded">
    <v-main class="v-main">
      <AppBear />
      <NavigationDrawer />
      <Notify />
      <v-container>
        <v-pull-to-refresh
          :pull-down-threshold="pullDownThreshold"
          @load="load"
        >
          <router-view />
        </v-pull-to-refresh>
      </v-container>
    </v-main>
    <AppFooter />
  </v-responsive>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { VPullToRefresh } from "vuetify/labs/VPullToRefresh";

const pullDownThreshold = ref(64);

const load = async (done: (status: string) => void) => {
  try {
    console.log("loading");
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    console.log("loading close");
    done("ok");
  } catch (error) {}
};
</script>

<style lang="scss" scoped src="../styles/default.scss"></style>
