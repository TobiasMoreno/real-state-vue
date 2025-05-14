<template>
  <div class="search">
    <div class="search__tabs">
      <button class="search__tab" :class="{ 'search__tab--active': activeTab === 'buy' }" @click="setActiveTab('buy')">
        Comprar
      </button>
      <button class="search__tab" :class="{ 'search__tab--active': activeTab === 'rent' }"
        @click="setActiveTab('rent')">
        Alquilar
      </button>
    </div>

    <div class="search__bar">
      <div class="search__filters">
        <input type="text" placeholder="Buscar por ubicación o palabra clave..." class="search__input"
          v-model="searchTerm" @input="debounceSearch" />

        <AppSelect label="Departamento" :options="departamentos" :selectedOption="selectedDepartamento"
          @selectionChange="onDepartamentoChange" />

        <AppSelect label="Ambientes" :options="ambientes" :selectedOption="selectedAmbientes"
          @selectionChange="onAmbientesChange" />

        <AppSelect label="Precio" :options="precios" :selectedOption="selectedPrecio"
          @selectionChange="onPrecioChange" />

        <button class="search__filter-btn search__filter-btn--icon">
          <img src="@/assets/images/filters.svg" alt="filter" />
        </button>

        <button class="search__submit" @click="triggerSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppSelect from "@/shared/SelectComponent.vue";

const emit = defineEmits(["tabChange", "search"]);

const departamentos = ["Todos", "Casa", "Apartamento", "Oficina", "Local", "Terreno"];
const ambientes = ["Todos", "1", "2", "3", "4", "5+"];
const precios = [
  "Todos",
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $200,000",
  "$200,000+",
];

const activeTab = ref("rent");
const selectedDepartamento = ref("");
const selectedAmbientes = ref("");
const selectedPrecio = ref("");
const searchTerm = ref("");
let searchTimeout = null;

function setActiveTab(tab) {
  activeTab.value = tab;
  emit("tabChange", tab);
  triggerSearch();
}

function onDepartamentoChange(value) {
  selectedDepartamento.value = value;
  triggerSearch();
}

function onAmbientesChange(value) {
  selectedAmbientes.value = value;
  triggerSearch();
}

function onPrecioChange(value) {
  selectedPrecio.value = value;
  triggerSearch();
}

function debounceSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    triggerSearch();
  }, 500);
}

function triggerSearch() {
  if (selectedDepartamento.value === "Todos") {
    selectedDepartamento.value = undefined;
  }
  if (selectedAmbientes.value === "Todos") {
    selectedAmbientes.value = undefined;
  }
  if (selectedPrecio.value === "Todos") {
    selectedPrecio.value = undefined;
  }

  emit('search', {
    sale: activeTab.value === 'buy',
    keyword: searchTerm.value.trim() || undefined,
    typeName: selectedDepartamento.value || undefined,
    ambientes: selectedAmbientes.value || undefined,
    priceRange: selectedPrecio.value || undefined,
  });
}

triggerSearch();
</script>

<style scoped src="./SearchBarComponent.scss"></style>
