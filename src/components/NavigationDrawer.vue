<template>
  <v-navigation-drawer
    v-model="store.drawer"
    :elevation="2"
    :expand-on-hover="$vuetify.display.mobile ? false : true"
    :location="$vuetify.display.mobile ? 'top' : undefined"
    rail
  >
    <v-list>
      <v-list-item
        :prepend-avatar="dataUser.avatar"
        :subtitle="dataUser.email"
        :title="dataUser.name"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-ripple
        prepend-icon="mdi-home"
        title="Dasboard"
        :to="{ name: 'Dasboard' }"
        value="dasboard"
      />
      <v-list-item
        v-ripple
        prepend-icon="mdi-folder"
        title="My Files"
        :to="{ name: 'Files' }"
        value="myfiles"
      />
      <v-list-item
        v-ripple
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        :to="{ name: 'Shared' }"
        value="shared"
      />
      <v-list-item
        v-ripple
        prepend-icon="mdi-star"
        title="Starred"
        :to="{ name: 'Starred' }"
        value="starred"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { getDataUser } from "../services/apiService";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useAppStore();

const dataUser: any = ref("");

const { actionDrawer, validateDispleyMobile } = store;

const actionMenu: any = ref({
  group: null,
});

onMounted(async () => {
  try {
    const response = await getDataUser();
    dataUser.value = response;
  } catch (error) {
    const e = error + "";
    const are = e.split(" ");
    if (are[are.length - 1] === "401") {
      router.push({ name: "Login" });
    }
  }
});

onBeforeMount(() => {
  validateDispleyMobile();
  if (store.mobile) {
    actionDrawer();
  }
});

watch(
  () => actionMenu.value.group,
  () => {
    validateDispleyMobile();
  }
);
</script>

<style lang="scss" scoped src="../styles/drawer.scss"></style>
