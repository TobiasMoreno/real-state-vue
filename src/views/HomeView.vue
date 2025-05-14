<template>
  <section class="hero">
    <HeaderComponent />
    <div>
      <div class="hero__content">
        <div class="hero__title-container">
          <h2 class="hero__title">
            Encuentra la Propiedad de tus Sueños con Nosotros
          </h2>
        </div>
        <SearchBarComponent @tab-change="setActiveTab" @search="handleSearch" />
      </div>
    </div>
  </section>
  <BenefitsSectionComponent :active-tab="activeTab" :buildings="buildings" :loading="isLoading" />
  <FooterComponent />
</template>

<script setup>
import BenefitsSectionComponent from "@/features/Home/BenefitsSectionComponent.vue";
import FooterComponent from "@/features/Home/FooterComponent.vue";
import HeaderComponent from "@/features/Home/HeaderComponent.vue";
import SearchBarComponent from "@/features/Home/SearchBarComponent.vue";
import { ref, onMounted, computed } from "vue";
import { useBuildingStore } from "@/features/buildings/store/buildingStore";

const buildingStore = useBuildingStore();
const activeTab = ref("rent");
const buildings = ref([]);
const isLoading = computed(() => buildingStore.isLoading);

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const handleSearch = async (filters) => {
  await buildingStore.filterBuildings(filters);
  buildings.value = buildingStore.buildings;
};

onMounted(async () => {
  await buildingStore.filterBuildings({ sale: activeTab.value === "buy" });
  buildings.value = buildingStore.buildings;
});
</script>

<style scoped src="./HomeView.scss"></style>
