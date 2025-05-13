<template>
  <div class="search">
    <div class="search__tabs">
      <button
        class="search__tab"
        :class="{ 'search__tab--active': activeTab === 'buy' }"
        @click="setActiveTab('buy')"
      >
        Comprar
      </button>
      <button
        class="search__tab"
        :class="{ 'search__tab--active': activeTab === 'rent' }"
        @click="setActiveTab('rent')"
      >
        Alquilar
      </button>
    </div>

    <div class="search__bar">
      <div class="search__filters">
        <input
          type="text"
          placeholder="Buscar por ubicación o palabra clave..."
          class="search__input"
        />

        <AppSelect
          label="Departamento"
          :options="departamentos"
          :selectedOption="selectedDepartamento"
          @selectionChange="onDepartamentoChange"
        />

        <AppSelect
          label="Ambientes"
          :options="ambientes"
          :selectedOption="selectedAmbientes"
          @selectionChange="onAmbientesChange"
        />

        <AppSelect
          label="Precio"
          :options="precios"
          :selectedOption="selectedPrecio"
          @selectionChange="onPrecioChange"
        />

        <button class="search__filter-btn search__filter-btn--icon">
          <img src="@/assets/images/filters.svg" alt="filter" />
        </button>

        <button class="search__submit" @click="onSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppSelect from "@/shared/SelectComponent.vue";

const emit = defineEmits(["tabChange"]);

const activeTab = ref("rent");

const departamentos = ["Casa", "Apartamento", "Oficina", "Local", "Terreno"];
const ambientes = ["1", "2", "3", "4", "5+"];
const precios = [
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $200,000",
  "$200,000+",
];

const selectedDepartamento = ref("");
const selectedAmbientes = ref("");
const selectedPrecio = ref("");

function setActiveTab(tab) {
  activeTab.value = tab;
  emit("tabChange", tab);
}

function onDepartamentoChange(value) {
  selectedDepartamento.value = value;
  console.log("Departamento seleccionado:", value);
}

function onAmbientesChange(value) {
  selectedAmbientes.value = value;
  console.log("Ambientes seleccionados:", value);
}

function onPrecioChange(value) {
  selectedPrecio.value = value;
  console.log("Precio seleccionado:", value);
}

function onSearch() {
  console.log("Realizando búsqueda...");
}
</script>

<style scoped src="./SearchBarComponent.scss"></style>
