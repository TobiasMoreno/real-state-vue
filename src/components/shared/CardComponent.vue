<template>
  <section>
    <div class="card">
      <div class="card__image">
        <img :src="building.image" :alt="building.name" />
      </div>

      <div class="card__content">
        <div class="card__header">
          <h3 class="card__title">{{ building.type.name }}</h3>
          <p class="card__price">{{ formattedPrice }}</p>
        </div>

        <div class="card__details">
          <div class="card__detail">
            <img
              v-if="building.beds"
              :src="icons.bed"
              alt="Dormitorios"
              class="card__icon"
            />
            <span v-if="building.beds">{{ building.beds }}</span>
            <img v-else :src="icons.floor" alt="Pisos" class="card__icon" />
            <span v-else>{{ building.floors }}</span>
          </div>
          <div class="card__detail">
            <img
              v-if="building.bathrooms"
              :src="icons.bath"
              alt="Baños"
              class="card__icon"
            />
            <span v-if="building.bathrooms">{{ building.bathrooms }}</span>
            <span v-else>{{ building.status }}</span>
          </div>
          <div class="card__detail">
            <img :src="icons.size" alt="Tamaño" class="card__icon" />
            <span>{{ building.size }}m²</span>
          </div>
        </div>

        <p class="card__address">{{ building.direction }}</p>
      </div>
    </div>
  </section>
</template>

<script>
// Importamos el modelo para validación
import { Building } from "../../interfaces/buildingModel.ts";

export default {
  props: {
    building: {
      type: Object,
      required: true,
      validator(value) {
        // Valida si el valor pasado cumple con la estructura del modelo Building
        return Object.keys(Building).every((key) => key in value);
      },
    },
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(this.building.price);
    },
    icons() {
      return {
        bed: "src/assets/images/bed.svg",
        bath: "src/assets/images/bathroom.svg",
        size: "src/assets/images/building-size.svg",
        floor: "src/assets/images/floor.svg",
      };
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
  box-shadow: 0 4.16px 8.32px rgba(106, 100, 166, 0.1),
    0 15.95px 15.95px rgba(106, 100, 166, 0.09),
    0 35.37px 20.8px rgba(106, 100, 166, 0.05),
    0 62.41px 24.97px rgba(106, 100, 166, 0.01),
    0 97.78px 27.74px rgba(106, 100, 166, 0);
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 350px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin: 20px;
  margin-bottom: 50px;
}

.card__image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-bottom-right-radius: 12px;
}

.card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card__content {
  padding: 16px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-black);
  margin: 0;
}

.card__price {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-black);
  margin: 0;
}

.card__details {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.card__detail {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-black);
  background-color: var(--color-gray-light);
  padding: 4px 8px;
  border-radius: var(--border-radius-md);
  font-size: 12px;
  min-width: 70px;
}

.card__icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.card__address {
  color: var(--color-gray-dark);
  font-size: 12px;
  margin: 0;
}
</style>
