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
            <li v-for="item in sales" :key="item.label" class="sales-data__item">
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
import { ref, computed } from 'vue'

type SaleItem = { label: string; value: number }

// Opciones de periodos
enum Period {
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Yearly = 'Yearly'
}
const periods = Object.values(Period)

// Estado reactivo
const selectedPeriod = ref<Period>(Period.Monthly)

// Datos de ventas por periodo
const salesData: Record<Period, SaleItem[]> = {
    [Period.Monthly]: [
        { label: 'Via Website', value: 50 },
        { label: 'Via Team Member', value: 12 },
        { label: 'Via Agents', value: 6 },
        { label: 'Via Social Media', value: 15 },
        { label: 'Via Digital Marketing', value: 12 },
        { label: 'Via Others', value: 5 }
    ],
    [Period.Weekly]: [
        { label: 'Via Website', value: 60 },
        { label: 'Via Team Member', value: 10 },
        { label: 'Via Agents', value: 8 },
        { label: 'Via Social Media', value: 12 },
        { label: 'Via Digital Marketing', value: 7 },
        { label: 'Via Others', value: 3 }
    ],
    [Period.Yearly]: [
        { label: 'Via Website', value: 45 },
        { label: 'Via Team Member', value: 15 },
        { label: 'Via Agents', value: 10 },
        { label: 'Via Social Media', value: 18 },
        { label: 'Via Digital Marketing', value: 8 },
        { label: 'Via Others', value: 4 }
    ]
}

// Computed para obtener los datos según periodo seleccionado
const sales = computed(() => salesData[selectedPeriod.value])
</script>

<style scoped src="./sales-data.scss"></style>
