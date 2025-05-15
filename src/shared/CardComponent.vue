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

<script lang="ts">
import type { Building } from "@/features/buildings/type/building.ts";

export default {
  props: {
    building: {
      type: Object as () => Building,
      required: true
    }
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
        bed: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313380/bed_wq4fu7.svg",
        bath: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313437/bathroom_m8znpq.svg",
        size: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313446/building-size_auzbbi.svg",
        floor: "https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313465/floor_uhtgth.svg",
      };
    },
  },
};
</script>


<style scoped src="./CardComponent.scss" />
