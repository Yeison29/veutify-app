<template>
  <v-navigation-drawer
    v-model="store.drawerNotify"
    location="right"
    temporary
    :width="500"
  >
    <v-list-item prepend-icon="mdi-bell" title="Notifications">
      <template #title>
        <strong class="text-h6 mb-2">Notifications</strong>
      </template>
    </v-list-item>
    <v-btn
      v-tooltip="'Close'"
      class="btn-close"
      icon="mdi-close"
      variant="text"
      @click.stop="actionDrawerNotify()"
    />
    <v-divider />

    <v-list density="compact" nav>
      <v-list-item>
        <v-banner
          color="warning"
          icon="mdi-wifi-strength-alert-outline"
          lines="one"
        >
          <template v-slot:text> No Internet connection </template>

          <template v-slot:actions>
            <v-btn> Dismiss </v-btn>

            <v-btn> Retry </v-btn>
          </template>
        </v-banner>
      </v-list-item>
      <v-list-item>
        <v-banner color="pink-darken-1" icon="mdi-account-box" lines="two">
          <template #prepend>
            <v-avatar />
          </template>

          <v-banner-text>
            Banner with two lines of text. If the text is too long to fit on two
            lines then an ellipsis will be used to hide the remaining content.
            So this next line will be hidden.
          </v-banner-text>

          <v-banner-actions>
            <v-btn>Action Button</v-btn>
          </v-banner-actions>
        </v-banner>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";

const store = useAppStore();
const { actionDrawerNotify } = store;

watch(
  () => store.drawerNotify,
  () => {
    const html = document.querySelector("html");
    console.log(html);
    if (store.drawerNotify) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }
  }
);
</script>

<style lang="scss" scoped src="../styles/notify.scss"></style>
