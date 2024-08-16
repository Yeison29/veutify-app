<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="store.dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar>
          <v-skeleton-loader
            class="mx-auto title-skeleton"
            type="table-heading"
          />

          <v-spacer />

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="actionDialog()" />
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="row">
          <v-col class="col" cols="12" sm="6">
            <v-skeleton-loader
              class="mx-auto"
              elevation="12"
              max-width="700"
              type="table-heading, list-item-two-line, image, table-tfoot"
            />
          </v-col>
          <v-col class="col" cols="12" sm="6">
            <v-skeleton-loader
              class="mx-auto"
              max-width="700"
              type="table-heading, list-item-two-line, article, table-tfoot"
            />
          </v-col>
        </v-row>
        <v-skeleton-loader
          class="mx-auto info-skeleton"
          type="list-item-two-line, article"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";

const props = defineProps({
  id: Number,
});

console.log(props.id);

const store = useAppStore();
const { actionDialog } = store;

const dialog = ref({});
</script>

<style lang="scss" scoped src="../styles/dialog.scss"></style>
