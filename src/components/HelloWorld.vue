<template>
  <v-data-iterator
    v-model:items-per-page="itemsPerPage"
    :items="skeletonLoader ? skeletoitems : serverItems"
    :page="currentpage"
  >
    <template #default="{ items }">
      <div v-if="skeletonLoader" class="conatiner-card">
        <template v-for="i in itemsPerPage" :key="i">
          <v-skeleton-loader class="mx-auto border" type="card" />
        </template>
      </div>
      <div v-if="!skeletonLoader" class="conatiner-card">
        <template v-for="(item, i) in items" :key="i">
          <v-card>
            <v-img
              cover
              :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
              height="250"
              :src="purgeCaracterImage(item.raw.images[0])"
            />
            <v-list-item class="mb-2" :subtitle="item.raw.title">
              <template #title>
                <strong class="text-h6 mb-2">${{ item.raw.price }} USD</strong>
              </template>
            </v-list-item>

            <div class="d-flex justify-space-between px-4 container-info-card">
              <div
                class="d-flex align-center text-caption text-medium-emphasis me-1 mb-1"
              >
                <v-icon icon="mdi-clock" start />

                <div class="text-truncate">
                  {{ item.raw.updatedAt.split("T")[0] }}
                </div>
              </div>
              <v-btn
                border
                class="text-none"
                flat
                size="small"
                text="Read"
                @click="dialog(item.raw.id)"
              />
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
      :total-visible="4"
      @update:model-value="loadItems"
    />
    <Dialog v-if="store.dialog" :id="idProduct" />
  </v-responsive>
</template>

<script lang="ts" setup>
import { getProducts } from "../services/apiService";
import { purgeCaracterImage } from "../utils/globalFunccion";
import Dialog from "./Dialog.vue";
import { useAppStore } from "@/stores/app";

interface Dessert {
  title: string;
  images: [string];
  price: number;
  description: string;
  updatedAt: string;
  id: number;
}

const skeleto = {
  title: "",
  title: "",
  images: [""],
  price: "",
  description: "",
  updatedAt: "",
  id: 0,
};

const skeletoitems = [
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
  skeleto,
];

const currentpage = ref(1);
const serverItems = ref<Dessert[]>([]);
const total = ref(2);
const itemsPerPage = ref(20);
const skeletonLoader = ref(true);
const idProduct = ref(0);

const store = useAppStore();
const { actionDialog } = store;

const loadItems = async (page: number) => {
  try {
    skeletonLoader.value = true;
    window.scrollTo(0, 0);
    const response = await getProducts(page - 1, itemsPerPage.value);
    serverItems.value = [...response];
    skeletonLoader.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  loadItems(1);
  if (store.dialog) {
    actionDialog();
  }
});

const dialog = (id: number) => {
  console.log(id);
  idProduct.value = id;
  actionDialog();
};
</script>

<style lang="scss" scoped src="../styles/files.scss"></style>
