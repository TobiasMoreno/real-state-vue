<template>
    <div class="recent-transactions">
        <div class="recent-transactions__header">
            <h4>Recent Transactions</h4>
            <a href="#" class="btn-link">
                View orders
                <span class="btn-link__icon">→</span>
            </a>
        </div>
        <Table :columns="columns" :data="transactions" id-key="id" />
    </div>
</template>

<script setup lang="ts">
import Table from '@/shared/table/table.vue'
import { ref } from 'vue'

interface Transaction {
    id: number
    imageUrl: string
    date: string
    name: string
    price: number
    type: string
    status: string
}

const transactions = ref<Transaction[]>([
    { id: 1, imageUrl: 'dashboard/house-1.jpg', date: '10th Aug 2023', name: 'Mr. Rocky', price: 12450, type: 'Rent', status: 'Paid' },
    { id: 2, imageUrl: 'dashboard/house-2.jpg', date: '10th Aug 2023', name: 'Mr. Cristino', price: 12450, type: 'Sell', status: 'Unpaid' },
    { id: 3, imageUrl: 'dashboard/house-3.jpg', date: '10th Aug 2023', name: 'Mr. Jack', price: 12450, type: 'Sell', status: 'Paid' },
    { id: 4, imageUrl: 'dashboard/house-4.jpg', date: '10th Aug 2023', name: 'Ms. Cally', price: 12450, type: 'Sell', status: 'Unpaid' },
    { id: 5, imageUrl: 'dashboard/house-5.jpg', date: '10th Aug 2023', name: 'Ms. Cristina', price: 12450, type: 'Rent', status: 'Unpaid' }
])

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