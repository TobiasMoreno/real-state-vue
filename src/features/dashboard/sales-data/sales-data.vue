<template>
    <div class="sales-data">
        <div class="sales-data__header">
            <h3 class="sales-data__title">Sales Data</h3>
            <select v-model="selectedPeriod" class="sales-data__select" aria-label="Select period">
                <option v-for="period in periods" :key="period" :value="period">
                    {{ period }}
                </option>
            </select>
        </div>

        <ul class="sales-data__list">
            <li v-for="item in salesData" :key="item.label" class="sales-data__item">
                <div class="sales-data__item-top">
                    <div class="sales-data__label">{{ item.label }}</div>
                    <div class="sales-data__value">{{ item.value }}%</div>
                </div>
                <div class="sales-data__bar-container">
                    <div class="sales-data__bar" :style="{ width: item.value + '%' }"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { api } from '@/plugins/axios';
import { ref, watchEffect } from 'vue'
import { SaleItem } from './sale-item';

enum Period {
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Yearly = 'Yearly'
}
const periods = Object.values(Period)

const selectedPeriod = ref<Period>(Period.Monthly)

const salesData = ref<SaleItem[]>([])

async function loadSalesData(): Promise<SaleItem[]> {
    try {
        const response = await api.get<SaleItem[]>(`/sales/${selectedPeriod.value.toLowerCase()}`)
        return response.data
    } catch (error) {
        console.error('Error loading sales data:', error)
        return []
    }
}

watchEffect(async () => {
    salesData.value = await loadSalesData()
})
</script>

<style scoped src="./sales-data.scss"></style>
