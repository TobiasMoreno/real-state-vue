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
            <template v-if="building.beds">
              <img :src="icons.bed" alt="Dormitorios" class="card__icon" />
              <span>{{ building.beds }}</span>
            </template>
            <template v-else>
              <img :src="icons.floor" alt="Pisos" class="card__icon" />
              <span>{{ building.floors }}</span>
            </template>
          </div>
          <div class="card__detail">
            <img v-if="building.bathrooms" :src="icons.bath" alt="Baños" class="card__icon" />
            <span v-if="building.bathrooms">{{ building.bathrooms }}</span>
            <span v-else class="card__detail--status">{{ building.status }}</span>
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
import { Building } from "@/interfaces/buildingModel.ts";

export default {
  props: {
    building: {
      type: Object,
      required: true,
      validator(value) {
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


<style scoped src="./CardComponent.scss" />
