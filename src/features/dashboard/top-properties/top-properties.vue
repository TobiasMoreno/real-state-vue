<template>
    <div class="top-properties">
        <div class="top-properties__header">
            <h3 class="top-properties__title">Top Properties</h3>
            <a href="#" class="top-properties__action">
                See More
                <span class="top-properties__icon">→</span>
            </a>
        </div>
        <ul class="top-properties__list">
            <li v-for="property in properties" :key="property.id" class="top-properties__item">
                <img :src="property.imageUrl" :alt="property.title" class="top-properties__avatar" />
                <div class="top-properties__info">
                    <span class="top-properties__name">{{ property.title }}</span>
                    <span class="top-properties__location">{{ property.location }}</span>
                </div>
                <span :class="[
                    'top-properties__change',
                    property.change > 0
                        ? 'top-properties__change--up'
                        : 'top-properties__change--down'
                ]">
                    {{ (property.change > 0 ? '↑' : '↓') + Math.abs(property.change) + '%' }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TopProperty } from './top-property';

const properties = ref<TopProperty[]>([
    { id: 1, title: 'House', imageUrl: 'dashboard/house-1.jpg', change: -11, location: 'Baton Rouge, USA' },
    { id: 2, title: 'House', imageUrl: 'dashboard/house-2.jpg', change: 20, location: 'Baton Rouge, USA' },
    { id: 3, title: 'House', imageUrl: 'dashboard/house-3.jpg', change: 24, location: 'Baton Rouge, USA' },
    { id: 4, title: 'House', imageUrl: 'dashboard/house-4.jpg', change: 21, location: 'Baton Rouge, USA' },
    { id: 5, title: 'House', imageUrl: 'dashboard/house-5.jpg', change: 45, location: 'Baton Rouge, USA' },
    { id: 6, title: 'House', imageUrl: 'dashboard/house-5.jpg', change: -45, location: 'Baton Rouge, USA' },
    { id: 7, title: 'House', imageUrl: 'dashboard/house-5.jpg', change: 45, location: 'Baton Rouge, USA' }
])
</script>

<style scoped src="./top-properties.scss" />
