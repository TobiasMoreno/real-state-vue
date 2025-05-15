<template>
    <div class="area-map">
      <div class="area-map__header">
        <h4>Area Map</h4>
        <span class="area-map__last-update">Last update 5 days ago</span>
      </div>
      <Map />
    </div>
  </template>
  
  <script setup lang="ts">
  import Map from './map/Map.vue';
  </script>
  
  <style scoped lang="scss">
  .area-map {
    background-color: #fff;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-md);
  
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #eaeaea;
    }
  
    h4 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--color-black);
    }
  
    &__last-update {
      color: var(--color-text-secondary);
      font-size: 14px;
    }
  }
  </style>
  