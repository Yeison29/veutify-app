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
            <v-btn
              v-tooltip="'Close'"
              icon="mdi-close"
              @click="actionDialog()"
            />
          </v-toolbar-items>
        </v-toolbar>
        <div class="row">
          <div class="col">
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
                hide-delimiter-background
                show-arrows="hover"
              >
                <v-carousel-item
                  v-for="(image, i) in serverItems?.images"
                  :key="i"
                  cover
                  rounded
                  :src="image"
                />
              </v-carousel>
            </v-card>
          </div>
          <div class="col">
            <v-skeleton-loader
              v-if="skeleton"
              class="mx-auto"
              max-width="700"
              type="table-heading, list-item-two-line, article, table-tfoot"
            />
            <v-card v-if="!skeleton" variant="text">
              <v-card-item>
                <v-card-title> {{ serverItems?.title }} </v-card-title>

                <v-card-subtitle>
                  {{ "$" + serverItems?.price + " USD" }}
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                {{ serverItems?.description }}
              </v-card-text>
              <v-img
                class="align-end text-white"
                cover
                height="200"
                :src="serverItems?.category.image"
              >
                <v-card-title>{{ serverItems?.category.name }}</v-card-title>
              </v-img>
            </v-card>
          </div>
        </div>
        <v-divider />
        <v-skeleton-loader
          v-if="skeleton"
          class="mx-auto info-skeleton"
          type="list-item-two-line, article"
        />
        <div v-if="!skeleton" class="comments">
          <strong class="text-h6 mb-2">COMMENTS</strong>
          <v-card class="comment" subtitle="User" title="John">
            <template #prepend>
              <v-avatar color="blue-darken-2">
                <v-icon icon="mdi-comment" />
              </v-avatar>
            </template>
            <template #append>
              <v-avatar size="50">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.png"
                />
              </v-avatar>
            </template>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </v-card-text>
          </v-card>
          <v-card class="comment comment-ringt" subtitle="You" title="Pepe">
            <template #prepend>
              <v-avatar color="teal">
                <v-icon icon="mdi-comment" />
              </v-avatar>
            </template>
            <template #append>
              <v-avatar size="50">
                <v-img
                  alt="You"
                  src="https://cdn.vuetifyjs.com/images/john.png"
                />
              </v-avatar>
            </template>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </v-card-text>
          </v-card>
        </div>
        <div class="comment-send">
          <v-textarea
            class="mx-2"
            label="Comment"
            prepend-inner-icon="mdi-comment"
            rows="1"
          />
          <v-btn v-tooltip="'Send'" color="teal" icon="mdi-send" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { getProduct } from "@/services/apiService";

interface category {
  name: string;
  image: string;
  updatedAt: string;
}

interface Dessert {
  title: string;
  images: [string];
  price: number;
  description: string;
  updatedAt: string;
  category: category;
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
