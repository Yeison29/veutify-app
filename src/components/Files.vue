<template>
  <v-data-iterator
    v-model:items-per-page="itemsPerPage"
    :items="serverItems"
    :page="currentpage"
  >
    <template v-slot:default="{ items }">
      <div class="conatiner-card">
        <template v-for="(item, i) in items" :key="i">
          <v-card>
            <v-img
              :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
              :src="purgeCaracterImage(item.raw.images[0])"
              height="250"
              cover
            ></v-img>

            <v-list-item :subtitle="item.raw.title" class="mb-2">
              <template v-slot:title>
                <strong class="text-h6 mb-2">${{ item.raw.price }} USD</strong>
              </template>
            </v-list-item>

            <div class="d-flex justify-space-between px-4 container-info-card">
              <div
                class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1"
              >
                <v-icon icon="mdi-clock" start></v-icon>

                <div class="text-truncate">
                  {{ item.raw.updatedAt.split("T")[0] }}
                </div>
              </div>

              <v-btn class="text-none" size="small" text="Read" border flat>
              </v-btn>
            </div>
          </v-card>
        </template>
      </div>
    </template>
  </v-data-iterator>
  <v-responsive class="align-centerfill-height mx-auto">
    <v-pagination
      v-model:page="currentpage"
      :length="total"
      rounded="circle"
      @update:model-value="loadItems"
      :total-visible="4"
    ></v-pagination>
  </v-responsive>
</template>

<script lang="ts" setup>
import { getProducts } from "../services/apiService";
import { purgeCaracterImage } from "../utils/globalFunccion";

interface Dessert {
  title: string;
  image: [string];
  price: number;
  description: string;
  updatedAt: string;
}

const currentpage = ref(1);
const serverItems = ref<Dessert[]>([]);
const total = ref(2);
const itemsPerPage = ref(20);

const loadItems = async (page: number) => {
  try {
    const response = await getProducts(page - 1, itemsPerPage.value);
    serverItems.value = [...response];
    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  loadItems(1);
});
</script>

<style lang="scss" scoped src="../styles/files.scss"></style>
