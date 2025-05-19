<template>
    <div class="recent-transactions">
        <div class="recent-transactions__header">
            <h4>Recent Transactions</h4>
            <a href="#" class="btn-link">
                View orders
                <span class="btn-link__icon">→</span>
            </a>
        </div>
        <div class="recent-transactions__loading" v-if="isLoading">Cargando transacciones...</div>
        <Table v-show="!isLoading" :columns="columns" :data="transactions" id-key="id" />
    </div>
</template>

<script setup lang="ts">
import Table from '@/shared/table/table.vue'
import { onMounted, ref } from 'vue'
import { ResponseTransactionDto } from './response-transaction-dto'
import { api } from '@/plugins/axios'


const transactions = ref<ResponseTransactionDto[]>([])
const isLoading = ref(false)

async function getTransactions() {
    isLoading.value = true
    const response = await api.get<ResponseTransactionDto[]>('transactions')
    transactions.value = response.data.map(transaction => ({
        ...transaction,
        date: formatDate(transaction.date),
        price: formatPrice(Number(transaction.price))
    }))
    isLoading.value = false
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = date.getDate()
    const daySuffix = (n: number) => {
        if (n >= 11 && n <= 13) return 'th'
        switch (n % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }

    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${day}${daySuffix(day)} ${month} ${year}`
}

function formatPrice(price: number): string {
    return `$${price.toLocaleString()}`
}

onMounted(() => {
    getTransactions()
})

const columns = [
    { key: 'imageUrl', label: '' },
    { key: 'date', label: 'Date' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' }
]
</script>
<style src="./recent-transaction.scss" />