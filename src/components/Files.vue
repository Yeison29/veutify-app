<template>
  <v-data-iterator
    v-model:items-per-page="itemsPerPage"
    :items="serverItems"
    :page="currentpage"
  >
    <template v-slot:default="{ items }">
      <div class="conatiner-card">
        <template v-for="(item, i) in items" :key="i">
          <v-card v-bind="item.raw">
            <v-img
              :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
              :src="purgeCaracterImage(item.raw.images[0])"
              height="150"
              cover
            ></v-img>
            {{ item.raw.description }}
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
}

const currentpage = ref(1);
const serverItems = ref<Dessert[]>([]);
const total = ref(2);
const itemsPerPage = ref(28);

const loadItems = async (page: number) => {
  try {
    const response = await getProducts(page - 1, itemsPerPage.value);
    serverItems.value = [...response];
    console.log(serverItems.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
  }
};

onMounted(() => {
  loadItems(1);
});
</script>

<style lang="scss" scoped src="../styles/files.scss"></style>
