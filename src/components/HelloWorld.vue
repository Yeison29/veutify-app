<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    item-value="name"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    @update:options="loadItems"
  >
    <template v-slot:item.image="{ item }">
      <v-img
        :src="purgeCaracterImage(item.images[0])"
        height="100"
        width="100"
        compant
        class="my-2"
      />
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { getProducts } from "../services/apiService";
import { purgeCaracterImage } from "../utils/globalFunccion";

interface Dessert {
  title: string;
  image: [string];
  price: number;
  description: string;
}

interface SortOption {
  key: keyof Dessert;
  order: "asc" | "desc";
}

interface FetchParams {
  page: number;
  itemsPerPage: number;
  sortBy: SortOption[];
}

const itemsPerPage = ref(10);
const search = ref("");
const serverItems = ref<Dessert[]>([]);
const loading = ref(true);
const totalItems = ref(0);

async function loadItems({
  page,
  itemsPerPage,
  sortBy,
}: {
  page: number;
  itemsPerPage: number;
  sortBy: SortOption[];
}) {
  loading.value = true;

  try {
    const response = await getProducts(page - 1, itemsPerPage);

    serverItems.value = [...response];
    console.log(serverItems.value);
    totalItems.value = 52;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
}

const headers = reactive([
  {
    title: "Producto",
    align: "start",
    sortable: false,
    key: "title",
  },
  { title: "Image", key: "image", align: "center", sortable: false },
  { title: "Precio", key: "price", align: "end" },
  { title: "Descripción", key: "description", align: "start" },
]);
</script>
