<template>
  <section class="hero">
    <HeaderComponent />
    <div class="hero__content">
      <div class="hero__title-container">
        <h2 class="hero__title">
          Tu Hogar Ideal: Encuentra la Propiedad de tus Sueños con Nosotros
        </h2>
      </div>
      <SearchBarComponent @tab-change="setActiveTab" />
    </div>
  </section>
  <BenefitsSectionComponent :active-tab="activeTab" />
  <FooterComponent />
</template>

<script setup>
import BenefitsSectionComponent from "@/components/Home/BenefitsSectionComponent.vue";
import FooterComponent from "@/components/Home/FooterComponent.vue";
import HeaderComponent from "@/components/Home/HeaderComponent.vue";
import SearchBarComponent from "@/components/Home/SearchBarComponent.vue";
import { ref } from "vue";

const activeTab = ref("rent");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped src="./HomeView.scss"></style>
