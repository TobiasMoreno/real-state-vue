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
import { ref, onMounted, computed } from "vue";
import { useBuildingStore } from "@/features/buildings/store/buildingStore";
import BenefitsSectionComponent from "@/features/Home/Benefits/benefits-section-component.vue";
import FooterComponent from "@/features/Home/footer/footer-component.vue";
import SearchBarComponent from "@/features/Home/search-bar/search-bar-component.vue";
import HeaderComponent from "@/features/Home/header/header-component.vue";

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

<style scoped src="./home-view.scss"></style>
