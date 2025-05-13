<template>
  <div class="carousel__container">
    <div class="carousel__grid" ref="carouselRef">
      <CardComponent
        v-for="building in visibleBuildings"
        :key="building.id"
        :building="building"
      />
    </div>
    <div class="carousel__pagination">
      <div
        v-for="(dot, index) in totalPages"
        :key="index"
        class="carousel__dot"
        :class="{ 'carousel__dot--active': currentPage === index }"
        @click="goToPage(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from "vue";
import CardComponent from "./CardComponent.vue";
import mockData from "@/assets/mock.json";

const props = defineProps({
  filterType: {
    type: String,
    default: "department",
  },
  activeTab: {
    type: String,
    default: "rent",
  },
});

const currentPage = ref(0);
const itemsPerPage = ref(4);
const allBuildings = ref([]);
const buildings = ref([]);
const resizeObserver = ref(null);
const carouselRef = ref(null);

const loadAndFilterBuildings = async () => {
  try {
    allBuildings.value = mockData;
    buildings.value = filterBuildings(allBuildings.value);
    currentPage.value = 0;
  } catch (error) {
    console.error("Error loading buildings:", error);
  }
};

const filterBuildings = (buildings) => {
  let filteredBuildings = buildings;

  if (props.activeTab === "rent") {
    filteredBuildings = buildings.filter((building) => !building.sale);
  } else {
    filteredBuildings = buildings.filter((building) => building.sale);
  }

  if (props.filterType === "department") {
    return filteredBuildings.filter(
      (building) => building.beds !== null && building.bathrooms !== null
    );
  } else {
    return filteredBuildings.filter(
      (building) => building.floors !== null && building.status !== null
    );
  }
};

const updateItemsPerPage = (width) => {
  if (width <= 600) {
    itemsPerPage.value = 1;
  } else if (width <= 900) {
    itemsPerPage.value = 2;
  } else if (width <= 1200) {
    itemsPerPage.value = 3;
  } else {
    itemsPerPage.value = 4;
  }

  const maxPage = Math.ceil(buildings.value.length / itemsPerPage.value) - 1;
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage;
  }
};

const setupResizeObserver = () => {
  if (carouselRef.value) {
    resizeObserver.value = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        updateItemsPerPage(width);
      }
    });
    resizeObserver.value.observe(carouselRef.value);
  }
};

const goToPage = (pageIndex) => {
  if (pageIndex >= 0 && pageIndex < totalPages.length) {
    currentPage.value = pageIndex;
  }
};

const totalPages = computed(() => {
  return Array(Math.ceil(buildings.value.length / itemsPerPage.value)).fill(0);
});

const visibleBuildings = computed(() => {
  const start = currentPage.value * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return buildings.value.slice(start, end);
});

watchEffect(() => {
  loadAndFilterBuildings();
});

onMounted(() => {
  loadAndFilterBuildings();
  setupResizeObserver();
});

onBeforeUnmount(() => {
  if (resizeObserver.value && carouselRef.value) {
    resizeObserver.value.disconnect();
  }
});
</script>

<style scoped lang="scss">
@use "./Carousel.scss";
</style>
