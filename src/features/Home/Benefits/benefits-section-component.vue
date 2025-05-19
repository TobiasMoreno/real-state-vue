<template>
  <section class="benefits-section">
    <div class="benefits-section__container">
      <div class="benefits-section__header">
        <h2 id="properties" class="benefits-section__title">
          Explora nuestras propiedades exclusivas
        </h2>
        <p class="benefits-section__description">
          Las propiedades que buscás, en un solo lugar
        </p>
      </div>

      <div class="benefits-section__carousel">
        <div v-if="loading" class="loading-spinner">Cargando propiedades...</div>
        <div v-else-if="!buildings.length" class="no-results">No se encontraron propiedades con estos criterios</div>
        <CarouselComponent v-else :buildings="buildings" :filterType="'department'" :activeTab="activeTab" />
      </div>

      <div class="benefits-section__content">
        <div class="benefits-section__left">
          <h3 class="benefits-section__subtitle">
            Tu propiedad soñada, a solo un click!
          </h3>
          <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747656912/body-dept_hptnc5.jpg"
            alt="Edificio moderno" class="benefits-section__image" />
        </div>

        <div class="benefits-section__right">
          <div class="circle-decoration" />
          <div class="circle-decoration" />
          <div class="circle-decoration" />
          <div class="circle-decoration" />
          <div class="benefits-section__features">
            <div v-for="feature in features" :key="feature.icon" class="feature">
              <div class="feature__icon">
                <img :src="feature.icon" :alt="feature.title" />
              </div>
              <div class="feature__text">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="benefits-section__investment">
      <h3 class="benefits-section__subtitle">Oportunidades de inversión</h3>
      <p class="benefits-section__description">
        Explora Nuestra Oferta de Complejos Inmobiliarios
      </p>
      <div class="benefits-section__carousel">
        <div v-if="loading" class="loading-spinner">Cargando propiedades...</div>
        <div v-else-if="!buildings.length" class="no-results">No se encontraron propiedades con estos criterios</div>
        <CarouselComponent v-else :buildings="buildings" :filterType="'building'" :activeTab="activeTab" />
      </div>
    </div>
  </section>
</template>

<script setup>
import CarouselComponent from "@/shared/carousel/carousel-component.vue";

defineProps({
  activeTab: {
    type: String,
    default: "rent"
  },
  buildings: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const features = [
  {
    icon: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313318/shield_plzhnk.svg",
    title: "Seguridad y Tranquilidad",
    description: "Tu seguridad y la de tu familia",
  },
  {
    icon: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313025/money-pig_y6tjj4.svg",
    title: "Transparencia Total",
    description: "Procesos claros y transparentes",
  },
  {
    icon: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313127/Handshake_q0okpj.svg",
    title: "Soporte 24/7",
    description: "Estamos para ayudarte siempre",
  },
  {
    icon: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313144/Home_lj0tgs.svg",
    title: "Calidad Garantizada",
    description: "Las mejores propiedades verificadas",
  },
];
</script>

<style scoped src="./benefits-section.scss"></style>
