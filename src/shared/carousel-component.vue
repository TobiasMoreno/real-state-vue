<template>
  <div class="carousel__container">
    <div class="carousel__grid" ref="carouselRef">
      <CardComponent v-for="building in visibleBuildings" :key="building.id" :building="building" />
    </div>
    <div class="carousel__pagination">
      <div v-for="(dot, index) in totalPages" :key="index" class="carousel__dot"
        :class="{ 'carousel__dot--active': currentPage === index }" @click="goToPage(index)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import CardComponent from "./card-component.vue";

const props = defineProps({
  buildings: {
    type: Array,
    default: () => [],
  },
  filterType: { type: String, default: "department" },
  activeTab: { type: String, default: "rent" },
});

const currentPage = ref(0);
const itemsPerPage = ref(4);
const carouselRef = ref(null);
const resizeObserver = ref(null);

const filterBuildings = (buildings) => {
  let filtered = props.activeTab === "rent"
    ? buildings.filter(b => !b.sale)
    : buildings.filter(b => b.sale);

  return props.filterType === "department"
    ? filtered.filter(b => b.beds !== null && b.bathrooms !== null)
    : filtered.filter(b => b.floors !== null && b.status !== null);
};

const buildings = computed(() =>
  filterBuildings(props.buildings)
);

const totalPages = computed(() =>
  Array(Math.ceil(buildings.value.length / itemsPerPage.value)).fill(0)
);

const visibleBuildings = computed(() => {
  const start = currentPage.value * itemsPerPage.value;
  return buildings.value.slice(start, start + itemsPerPage.value);
});

const updateItemsPerPage = (width) => {
  if (width <= 600) itemsPerPage.value = 1;
  else if (width <= 900) itemsPerPage.value = 2;
  else if (width <= 1200) itemsPerPage.value = 3;
  else itemsPerPage.value = 4;

  const maxPage = Math.ceil(buildings.value.length / itemsPerPage.value) - 1;
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage;
  }
};

const setupResizeObserver = () => {
  if (carouselRef.value) {
    resizeObserver.value = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateItemsPerPage(entry.contentRect.width);
      }
    });
    resizeObserver.value.observe(carouselRef.value);
  }
};

const goToPage = (index) => {
  if (index >= 0 && index < totalPages.value.length) {
    currentPage.value = index;
  }
};

watchEffect(() => {
  currentPage.value = 0;
});

</script>



<style scoped lang="scss">
@use "./carousel.scss";
</style>
