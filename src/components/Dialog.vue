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
            v-if="skeleton"
            class="mx-auto title-skeleton"
            type="table-heading"
          />
          <v-toolbar-title v-if="!skeleton">
            {{ serverItems?.title }}
          </v-toolbar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="actionDialog()" />
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="row">
          <v-col class="col" cols="12" sm="6">
            <v-skeleton-loader
              v-if="skeleton"
              class="mx-auto"
              max-width="700"
              type="table-heading, list-item-two-line, image, table-tfoot"
            />
            <v-card v-if="!skeleton" elevation="12">
              <v-carousel
                class="carousel"
                cycle
                height="400"
                hide-delimiter-background
                show-arrows="hover"
              >
                <v-carousel-item
                  v-for="(image, i) in serverItems?.images"
                  :key="i"
                  cover
                  :src="image"
                />
              </v-carousel>
            </v-card>
          </v-col>
          <v-col class="col" cols="12" sm="6">
            <v-skeleton-loader
              v-if="skeleton"
              class="mx-auto"
              elevation="12"
              max-width="700"
              type="table-heading, list-item-two-line, article, table-tfoot"
            />
            <v-card
              v-if="!skeleton"
              elevation="12"
              height="100%"
              :subtitle="'$' + serverItems?.price + ' USD'"
              :text="serverItems?.description"
              :title="serverItems?.title"
              variant="tonal"
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

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { getProduct } from "@/services/apiService";

interface Dessert {
  title: string;
  images: [string];
  price: number;
  description: string;
  updatedAt: string;
}

const serverItems = ref<Dessert>();
const skeleton = ref(true);

const props = defineProps({
  id: Number,
});

const store = useAppStore();
const { actionDialog } = store;

const dialog = ref({});

onMounted(async () => {
  try {
    if (props.id) {
      const response = await getProduct(props.id);
      serverItems.value = response;
      skeleton.value = false;
      console.log(serverItems.value);
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped src="../styles/dialog.scss"></style>
