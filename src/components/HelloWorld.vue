<template>
  <v-pull-to-refresh :pull-down-threshold="pullDownThreshold" @load="load">
    <v-data-iterator
      v-model:items-per-page="itemsPerPage"
      :items="skeletonLoader ? skeletoitems : serverItems"
      max-width="1800"
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
                  <strong class="text-h6 mb-2">
                    ${{ item.raw.price }} USD
                  </strong>
                </template>
              </v-list-item>

              <div
                class="d-flex justify-space-between px-4 container-info-card"
              >
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
                  :to="{ name: 'Product', params: { id: item.raw.id } }"
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
    </v-responsive>
  </v-pull-to-refresh>
</template>

<script lang="ts" setup>
import { getProducts } from "../services/apiService";
import { purgeCaracterImage } from "../utils/globalFunccion";
import { useAppStore } from "@/stores/app";
import { VPullToRefresh } from "vuetify/labs/VPullToRefresh";

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

const store = useAppStore();
const { actionDialog } = store;
const pullDownThreshold = ref(64);

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

const load = async ({ done }) => {
  try {
    console.log("loading");
    await loadItems(1);
    console.log("loading close");
    done("ok");
  } catch (error) {
    done("error");
  }
};
</script>

<style lang="scss" scoped src="../styles/dasboard.scss"></style>
