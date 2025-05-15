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

        <AppSelect label="Precio" :options="Object.keys(precios)" :selectedOption="selectedPrecio"
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

<script lang="ts" setup>
import { ref } from "vue";
import AppSelect from "@/shared/select-component.vue";

const emit = defineEmits<{
  (e: 'tabChange', tab: string): void;
  (e: 'search', params: {
    sale: boolean;
    keyword?: string;
    typeName?: string;
    ambientes?: string;
    minPrice?: number;
    maxPrice?: number;
  }): void;
}>();

const departamentos = ["Todos", "Casa", "Apartamento", "Oficina", "Local", "Terreno"];
const ambientes = ["Todos", "1", "2", "3", "4", "5+"];
const precios: Record<string, { minPrice?: number; maxPrice?: number }> = {
  "Todos": {},
  "$0 - $450,000": { maxPrice: 450000 },
  "$450,000 - $900,000": { minPrice: 450001, maxPrice: 900000 },
  "$900,000 - $1,350,000": { minPrice: 900001, maxPrice: 1350000 },
  "$1,350,000 - $1,800,000": { minPrice: 1350001, maxPrice: 1800000 },
  "$1,800,000+": { minPrice: 1800001 },
};

const activeTab = ref<string>("rent");
const selectedDepartamento = ref<string | undefined>("");
const selectedAmbientes = ref<string | undefined>("");
const selectedPrecio = ref<string | undefined>("");
const searchTerm = ref<string>("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

function setActiveTab(tab: string) {
  activeTab.value = tab;
  emit("tabChange", tab);
  triggerSearch();
}

function onDepartamentoChange(value: string) {
  selectedDepartamento.value = value;
  triggerSearch();
}

function onAmbientesChange(value: string) {
  selectedAmbientes.value = value;
  triggerSearch();
}

function onPrecioChange(value: string) {
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
  const departamento = selectedDepartamento.value === "Todos" ? undefined : selectedDepartamento.value;
  const ambientes = selectedAmbientes.value === "Todos" ? undefined : selectedAmbientes.value;
  const priceRange = precios[selectedPrecio.value || "Todos"];

  emit("search", {
    sale: activeTab.value === "buy",
    keyword: searchTerm.value.trim() || undefined,
    typeName: departamento,
    ambientes,
    minPrice: priceRange?.minPrice,
    maxPrice: priceRange?.maxPrice,
  });
}

triggerSearch();
</script>


<style scoped src="./search-bar.scss"></style>
