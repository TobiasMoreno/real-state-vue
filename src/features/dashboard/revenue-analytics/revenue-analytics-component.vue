<template>
    <div class="revenue-analytics">
        <div class="revenue-analytics__header">
            <h3 class="revenue-analytics__title">Revenue Analytics</h3>
            <select class="revenue-analytics__select" v-model="viewType">
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>
        </div>

        <div class="revenue-analytics__body">
            <canvas ref="chartRef" class="revenue-analytics__chart" height="360"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'
import crosshairPlugin from 'chartjs-plugin-crosshair'

Chart.register(crosshairPlugin)

const chartRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const viewType = ref<'Monthly' | 'Yearly'>('Monthly')

const monthlySales = [20, 100, 50, 120, 80, 140, 60, 130, 70, 160, 90, 110]
const monthlyRevenue = [50, 140, 70, 180, 100, 230, 130, 250, 120, 280, 160, 220]
const yearlySales = [0, 45, 10, 75, 35, 94, 30, 115, 30, 105, 65, 110]
const yearlyRevenue = [0, 100, 40, 110, 60, 140, 55, 130, 65, 180, 75, 115]

const chartData = computed(() => {
    const labels = viewType.value === 'Yearly'
        ? ['2019', '2020', '2021', '2022', '2023']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const sales = viewType.value === 'Yearly' ? yearlySales : monthlySales
    const revenue = viewType.value === 'Yearly' ? yearlyRevenue : monthlyRevenue

    return {
        labels,
        datasets: [
            {
                label: 'No. of Sales',
                data: sales,
                borderColor: '#6B7480',
                backgroundColor: 'transparent',
                pointBackgroundColor: '#6B7480',
                borderWidth: 1.5,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: false
            },
            {
                label: 'Revenue',
                data: revenue,
                borderColor: '#10B981',
                backgroundColor: (ctx: any) => {
                    const chart = ctx.chart
                    const { ctx: c, chartArea } = chart
                    if (!chartArea) return 'rgba(16,185,129,0.1)'
                    const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    grad.addColorStop(0, 'rgba(20, 226, 158, 0.2)')
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0.05)')
                    return grad
                },
                borderDash: [8, 4],
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointBackgroundColor: '#10B981',
                tension: 0.4,
                fill: true
            }
        ]
    }
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeInOutQuad' },
    interaction: { mode: 'index', intersect: false },
    scales: {
        x: {
            type: 'category',
            ticks: { color: '#000000' },
            grid: { display: false }
        },
        y: {
            ticks: { color: '#000000' },
            grid: { color: '#f0f0f0' }
        }
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 12,
                padding: 16,
                color: '#000000',
                font: { weight: 'bold' }
            }
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y}`
            }
        },
        title: {
            display: true,
            text: '',
            font: { size: 18 },
            padding: { bottom: 20 }
        },
        crosshair: {
            line: { color: '#94a3b8', width: 1 },
            sync: { enabled: false },
            zoom: { enabled: false },
            snap: { enabled: true }
        }
    }
}

onMounted(() => {
    if (!chartRef.value) return
    chartInstance = new Chart(chartRef.value.getContext('2d')!, {
        type: 'line',
        data: chartData.value,
        options: chartOptions as any
    })
})

watch(chartData, (newData) => {
    if (!chartInstance) return
    chartInstance.data = newData as any
    chartInstance.update()
})

onBeforeUnmount(() => {
    chartInstance?.destroy()
})
</script>
<style lang="scss" scoped>
@use './revenue-analytics.scss';
</style>